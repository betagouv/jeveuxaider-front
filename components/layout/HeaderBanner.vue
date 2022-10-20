<template>
  <div id="header-banner">
    <Banner v-if="$store.state.auth.isImpersonate" icon="RiProfileLine" type="warning">
      Attention ! Vous vous faites passer pour <span class="font-bold">{{ $store.getters.profile.full_name }}</span>
      <template #action>
        <Link
          icon="RiArrowRightLine"
          icon-position="right"
          @click.native="$store.dispatch('auth/stopImpersonate')"
        >
          Reprendre ma place
        </Link>
      </template>
    </Banner>

    <Banner v-if="$store.state.settings.general.maintenance_mode_active" icon="RiSettings4Line">
      Le site est en mode maintenance, seuls les admins peuvent y accéder !
      <template #action>
        <Link
          icon="RiArrowRightLine"
          icon-position="right"
          to="/admin/settings/general"
        >
          Gérer
        </Link>
      </template>
    </Banner>

    <Banner v-if="isResponsable && nbWaitingParticipations > 0" type="error">
      Vous avez {{ $options.filters.pluralize(nbWaitingParticipations, 'participation', 'participations') }} en cours de modération. Merci de mettre à jour le statut des candidatures reçues.
      <template #action>
        <Link
          icon="RiArrowRightLine"
          icon-position="right"
          :to="`/admin/participations?filter[state]=En attente de validation&filter[ofResponsable]=${$store.getters.profile.id}`"
        >
          Modérer les participations
        </Link>
      </template>
    </Banner>

    <Banner v-if="isPreprod" type="warning">
      Vous êtes actuellement sur la version test de JeVeuxAider.gouv.fr Les actions que vous réalisez ne seront pas prises en compte sur la plateforme.
    </Banner>
  </div>
</template>

<script>
import Link from '@/components/dsfr/Link.vue'

export default {
  components: {
    Link
  },
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
