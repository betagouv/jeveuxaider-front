<template>
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
</template>

<script>
export default {

}
</script>

<style>

</style>
