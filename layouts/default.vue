<template>
  <div class="h-full">
    <Header />
    <portal-target name="mobile-filters" class="relative z-30" multiple />
    <main role="main">
      <Nuxt />
    </main>
    <portal-target name="drawer" class="relative z-20" multiple />
    <Footer />
    <portal-target name="body-end" multiple />
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
