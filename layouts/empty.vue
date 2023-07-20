<template>
  <div class="flex flex-col min-h-screen">
    <HeaderBanner v-if="!$store.state.settings.general.maintenance_mode_active" />
    <Nuxt class="flex-1" />
    <client-only>
      <portal-target name="body-end" multiple />
    </client-only>
  </div>
</template>

<script>
import HeaderBanner from '@/components/layout/HeaderBanner.vue'
import MixinPlausible from '@/mixins/plausible.js'

export default {
  components: {
    HeaderBanner
  },
  mixins: [MixinPlausible]
}
</script>

<style scoped>

</style>
