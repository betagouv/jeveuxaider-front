<template>
  <div>
    <HeaderBanner />
    <Header />
    <Nuxt />
    <client-only>
      <portal-target name="body-end" />
    </client-only>
  </div>
</template>

<script>
import HeaderBanner from '@/components/layout/HeaderBanner.vue'
import Header from '@/components/layout/Header.vue'

export default {
  components: {
    HeaderBanner,
    Header
  }
}
</script>

<style scoped>

</style>
