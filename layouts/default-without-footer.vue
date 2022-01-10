<template>
  <div>
    <Header />
    <Nuxt />
    <client-only>
      <portal-target name="body-end" />
    </client-only>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style scoped>
  body, #__nuxt,  #__layout {
    @apply h-full
  }
</style>
