<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
    <client-only>
      <transition name="fade">
        <portal-target name="body-end">
          <LazySearchOverlay v-if="$store.state.showSearchOverlay" />
        </portal-target>
      </transition>
    </client-only>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import LazySearchOverlay from '@/components/section/SearchOverlay'

export default {
  components: {
    Header,
    Footer,
    LazySearchOverlay
  }
}
</script>

<style>
  body, #__nuxt,  #__layout {
    @apply h-full
  }
</style>
