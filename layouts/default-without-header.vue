<template>
  <div>
    <Nuxt />
    <Footer />
    <client-only>
      <portal-target name="body-end" />
    </client-only>
  </div>
</template>

<script>
import Footer from '@/components/layout/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>

<style scoped>
  body, #__nuxt,  #__layout {
    @apply h-full
  }
</style>
