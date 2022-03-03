<template>
  <div>
    <HeaderBanner v-if="!$store.state.settings.general.maintenance_mode_active" />
    <Nuxt />
    <client-only>
      <portal-target name="body-end" multiple />
    </client-only>
  </div>
</template>

<script>
import HeaderBanner from '@/components/layout/HeaderBanner.vue'

export default {
  components: {
    HeaderBanner
  }
}
</script>

<style scoped>

</style>
