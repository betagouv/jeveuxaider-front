<template>
  <div id="header-banner">
    <Banner v-if="$store.state.auth.isImpersonate" icon="RiProfileLine" type="warning">
      Attention ! Vous vous faites passer pour <span class="font-bold">{{ $store.getters.profile?.full_name }}</span>
      <template #action>
        <Link
          icon="RiArrowRightLine"
          @click.native="$store.dispatch('auth/stopImpersonate')"
        >
          Reprendre ma place
        </Link>
      </template>
    </Banner>

    <!-- <div v-if="isBenevoleOrNotLogged" class="relative z-30 bg-[#F75C5D] text-white cursor-pointer" @click="onClick">
      <div class="container py-3">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-full flex-1 flex items-center">
            <SpeakerphoneIcon
              class="hidden sm:block h-5 w-5 flex-none"
            />
            <p class="ml-3">
              <strong>Décembre ensemble :</strong> donnons du temps contre l’isolement
            </p>
          </div>
          <div class="flex-shrink-0 ml-4">
            <Link
              icon="RiArrowRightLine"
              class="hidden sm:block"
            >
              Trouver une mission
            </Link>
            <ArrowRightIcon
              class="sm:hidden h-5 w-5 flex-none"
            />
          </div>
        </div>
      </div>
    </div> -->

    <Banner v-if="$store.state.settings.general.maintenance_mode_active" icon="RiSettings4Line">
      Le site est en mode maintenance, seuls les admins peuvent y accéder !
      <template #action>
        <Link
          icon="RiArrowRightLine"
          to="/admin/settings/general"
        >
          Gérer
        </Link>
      </template>
    </Banner>

    <Banner v-if="isResponsable && totalPendingParticipationsActions > 0" type="error">
      Vous avez {{ $options.filters.pluralize(totalPendingParticipationsActions, 'participation', 'participations') }} en cours de modération. Merci de mettre à jour le statut des candidatures reçues.
      <template #action>
        <Link
          icon="RiArrowRightLine"
          :to="`/admin/participations?filter[is_state_pending]=true&filter[ofResponsable]=${$store.getters.profile.id}`"
        >
          Traiter les participations
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
    totalPendingParticipationsActions () {
      return this.nbWaitingParticipations + this.nbInProgressParticipations
    },
    nbWaitingParticipations () {
      return this.userActions?.find(action => action.type === 'participations_waiting_validation')?.value ?? 0
    },
    nbInProgressParticipations () {
      return this.userActions?.find(action => action.type === 'participations_in_progress')?.value ?? 0
    },
    isBenevoleOrNotLogged () {
      if (!this.$store.getters.isLogged) {
        return true
      }

      if (this.$store.getters.isLogged && this.$store.getters.contextRole === 'volontaire') {
        return true
      }

      return false
    }
  },
  watch: {
    '$store.state.auth.user.id' () {
      this.$fetch()
    }
  },
  methods: {
    onClick () {
      console.log('onClick')
      window.plausible &&
        window.plausible('Click CTA - Decembre Ensemble - Bandeau', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      window.location = '/missions-benevolat?tags=Décembre%20ensemble&utm_medium=JVA_CLIC_BANDEAU'
    }
  }
}
</script>

<style lang="postcss" scoped>
:deep(.dsfr-link) {
  @apply active:!bg-transparent;
}
</style>
