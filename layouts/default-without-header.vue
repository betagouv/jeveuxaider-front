<template>
  <div>
    <HeaderBanner />
    <main id="contenuprincipal" role="main">
      <Nuxt />
    </main>
    <Footer />
    <client-only>
      <portal-target name="body-end" multiple />
    </client-only>
  </div>
</template>

<script>
import Footer from '@/components/layout/Footer.vue'
import HeaderBanner from '@/components/layout/HeaderBanner.vue'
import MixinPlausible from '@/mixins/plausible.js'

export default {
  components: {
    HeaderBanner,
    Footer
  },
  mixins: [MixinPlausible]
}
</script>

<style scoped>

</style>
