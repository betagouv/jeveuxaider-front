<template>
  <div class="">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
  body, #__nuxt,  #__layout {
    @apply h-full
  }
</style>
