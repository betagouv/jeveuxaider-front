<template>
  <div class="h-full">
    <HeaderBanner />
    <Header />
    <Nuxt />
    <Footer />
    <client-only>
      <portal-target name="body-end" multiple />
    </client-only>
  </div>
</template>

<script>
import HeaderBanner from '@/components/layout/HeaderBanner.vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  name: 'Dashboard',
  components: {
    HeaderBanner,
    Header,
    Footer
  },
  middleware: 'authenticated'
}
</script>

<style scoped>

</style>
