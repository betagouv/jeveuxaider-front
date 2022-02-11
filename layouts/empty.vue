<template>
  <div>
    <HeaderBanner v-if="!$store.state.settings.general.maintenance_mode_active" />
    <Nuxt />
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
