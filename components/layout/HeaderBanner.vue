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
  </div>
</template>

<script>
export default {
  computed: {
    isImpersonate () {
      return this.$cookies.get('access-token-impersonate')
    }
  }
}
</script>
