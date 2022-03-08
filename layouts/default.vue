<template>
  <div class="h-full">
    <HeaderBanner />
    <portal-target name="header-top" multiple />
    <Header />
    <Nuxt />
    <portal-target name="drawer" class="relative z-20" multiple />
    <Footer />
    <portal-target name="body-end" multiple />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import HeaderBanner from '@/components/layout/HeaderBanner.vue'

export default {
  components: {
    Header,
    Footer,
    HeaderBanner
  }
}
</script>
