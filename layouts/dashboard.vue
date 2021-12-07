<template>
  <div>
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

export default {
  name: 'Dashboard',
  components: {
    Header,
    Footer
  },
  middleware: 'authenticated'
}
</script>

<style>
  body, #__nuxt,  #__layout {
    @apply h-full
  }
</style>
