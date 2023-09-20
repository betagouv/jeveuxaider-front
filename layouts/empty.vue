<template>
  <div class="flex flex-col min-h-screen">
    <HeaderBanner v-if="!$stores.settings.general.maintenance_mode_active" />
    <main id="contenuprincipal" role="main">
      <NuxtPage />
    </main>
    <div id="teleport-drawer" class="relative z-20"></div>
    <div id="teleport-body-end"></div>
  </div>
</template>

<script>
import HeaderBanner from '@/components/layout/HeaderBanner.vue'
import MixinPlausible from '@/mixins/plausible.js'

export default {
  components: {
    HeaderBanner,
  },
  mixins: [MixinPlausible],
}
</script>
