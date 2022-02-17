<template>
  <div class="h-full">
    <HeaderBanner />
    <Header />
    <Nuxt />
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
