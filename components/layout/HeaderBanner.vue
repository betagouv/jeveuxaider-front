<template>
  <div id="header-banner">
    <Banner v-if="$store.state.auth.isImpersonate" icon="IdentificationIcon" class="!bg-jva-orange-500">
      Attention ! Vous vous faites passer pour <span class="font-bold underline">{{ $store.getters.profile.full_name }}</span>
      <template #action>
        <Button variant="white" @click.native="$store.dispatch('auth/stopImpersonate')">
          Reprendre ma place
        </Button>
      </template>
    </Banner>
    <Banner v-if="$store.state.settings.general.maintenance_mode_active" icon="SpeakerphoneIcon">
      Le site est en mode maintenance, seuls les admins peuvent y accéder !
      <template #action>
        <nuxt-link to="/admin/settings/general">
          <Button variant="white">
            Gérer
          </Button>
        </nuxt-link>
      </template>
    </Banner>

    <Banner v-if="isResponsable && nbWaitingParticipations > 0" icon="ExclamationIcon" class="!bg-red-600">
      Vous avez {{ $options.filters.pluralize(nbWaitingParticipations, 'participation', 'participations') }} en cours de modération. Merci de mettre à jour le statut des candidatures reçues.
      <template #action>
        <nuxt-link :to="`/admin/participations?filter[state]=En attente de validation&filter[ofResponsable]=${$store.getters.profile.id}`">
          <Button variant="white">
            Modérer les participations
          </Button>
        </nuxt-link>
      </template>
    </Banner>

    <Banner v-if="isPreprod" icon="ExclamationIcon" class="!bg-jva-orange-500">
      Vous êtes actuellement sur la version test de JeVeuxAider.gouv.fr Les actions que vous réalisez ne seront pas prises en compte sur la plateforme.
    </Banner>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userActions: null
    }
  },
  async fetch () {
    if (this.isResponsable) {
      const { data: actions } = await this.$axios.get(
        '/user/actions'
      )
      this.userActions = actions
    }
  },
  computed: {
    isPreprod () {
      console.log(this.$config)
      return this.$config.apiUrl == 'https://jeveuxaider-preprod-back.osc-secnum-fr1.scalingo.io'
    },
    isImpersonate () {
      return this.$cookies.get('access-token-impersonate')
    },
    isResponsable () {
      return this.$store.getters.currentRole?.key === 'responsable'
    },
    nbWaitingParticipations () {
      return this.userActions?.find(action => action.type === 'participations_waiting_validation')?.value ?? 0
    }
  },
  watch: {
    '$store.state.auth.user.id' () {
      this.$fetch()
    }
  }
}
</script>
