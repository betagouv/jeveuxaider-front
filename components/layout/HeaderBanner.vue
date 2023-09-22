<template>
  <div id="header-banner">
    <BaseBanner v-if="$stores.auth.isImpersonate" icon="RiProfileLine" type="warning">
      Attention ! Vous vous faites passer pour
      <span class="font-bold">{{ $stores.auth.profile?.full_name }}</span>
      <template #action>
        <DsfrLink icon="RiArrowRightLine" @click.native="$stores.auth.stopImpersonate()">
          Reprendre ma place
        </DsfrLink>
      </template>
    </BaseBanner>

    <BaseBanner v-if="$stores.settings.general?.maintenance_mode_active" icon="RiSettings4Line">
      Le site est en mode maintenance, seuls les admins peuvent y accéder !
      <template #action>
        <DsfrLink icon="RiArrowRightLine" to="/admin/settings/general"> Gérer </DsfrLink>
      </template>
    </BaseBanner>

    <BaseBanner v-if="showBannerResponsablePendingParticipations" type="error">
      Vous avez
      {{ $filters.pluralize(totalPendingParticipationsActions, 'participation', 'participations') }}
      en cours de modération. Merci de mettre à jour le statut des candidatures reçues.
      <template #action>
        <DsfrLink
          icon="RiArrowRightLine"
          :to="`/admin/participations?filter[is_state_pending]=true&filter[ofResponsable]=${$stores.auth.profile.id}`"
        >
          Traiter les participations
        </DsfrLink>
      </template>
    </BaseBanner>

    <BaseBanner v-if="isPreprod" type="warning">
      Vous êtes actuellement sur la version test de JeVeuxAider.gouv.fr Les actions que vous
      réalisez ne seront pas prises en compte sur la plateforme.
    </BaseBanner>
  </div>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {
      userActions: null,
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    isPreprod() {
      const runtimeConfig = useRuntimeConfig()
      return (
        runtimeConfig.public.apiUrl == 'https://jeveuxaider-preprod-back.osc-secnum-fr1.scalingo.io'
      )
    },
    showBannerResponsablePendingParticipations() {
      if (['messages', 'messages-id'].includes(this.$route.name)) {
        return false
      }
      return this.isResponsable && this.totalPendingParticipationsActions > 0
    },
    isResponsable() {
      return this.$stores.auth.currentRole?.key === 'responsable'
    },
    totalPendingParticipationsActions() {
      return this.nbWaitingParticipations + this.nbInProgressParticipations
    },
    nbWaitingParticipations() {
      return (
        this.userActions?.find((action) => action.type === 'participations_waiting_validation')
          ?.value ?? 0
      )
    },
    nbInProgressParticipations() {
      return (
        this.userActions?.find((action) => action.type === 'participations_in_progress')?.value ?? 0
      )
    },
    isBenevoleOrNotLogged() {
      if (!this.$stores.auth.isLogged) {
        return true
      }

      if (this.$stores.auth.isLogged && this.$stores.auth.contextRole === 'volontaire') {
        return true
      }

      return false
    },
  },
  watch: {
    '$stores.auth.user.id'() {
      this.fetch()
    },
  },
  methods: {
    async fetch() {
      if (this.isResponsable) {
        const actions = await apiFetch('/user/actions')
        this.userActions = actions
      }
    },
  },
})
</script>

<style lang="postcss" scoped>
:deep(.dsfr-link) {
  @apply active:!bg-transparent;
}
</style>
