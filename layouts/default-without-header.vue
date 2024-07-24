<template>
  <div>
    <main id="contenuprincipal" role="main">
      <NuxtPage />
    </main>
    <Footer />
    <div id="teleport-body-end"></div>
  </div>
</template>

<script>
import Footer from '@/components/layout/Footer.vue'
import MixinPlausible from '@/mixins/plausible.js'
import MixinHotjar from '@/mixins/hotjar.client.js'

export default {
  components: {
    Footer,
  },
  mixins: [MixinPlausible, MixinHotjar],
}
</script>

<style scoped></style>
