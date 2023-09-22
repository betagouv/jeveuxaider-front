<template>
  <div class="h-full">
    <Header />
    <div id="teleport-mobile-filters" class="relative z-50"></div>
    <main id="contenuprincipal" role="main">
      <NuxtPage />
    </main>
    <div id="teleport-drawer" class="relative z-20"></div>
    <Footer />
    <div id="teleport-body-end"></div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import MixinPlausible from '@/mixins/plausible.js'

export default {
  components: {
    Header,
    Footer,
  },
  mixins: [MixinPlausible],
}
</script>
