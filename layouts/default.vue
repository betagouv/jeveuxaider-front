<template>
  <div class="bg-">
    <Header />
    <Nuxt />
    <div>Footer</div>
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

<style>
  body, #__nuxt,  #__layout {
    @apply h-full
  }
</style>
