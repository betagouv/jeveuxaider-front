<template>
  <div class="h-full">
    <HeaderBanner />
    <Header />
    <Nuxt />
    <Footer />
    <client-only>
      <portal-target name="body-end" />
    </client-only>
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
