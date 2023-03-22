<template>
  <header id="header" ref="header" role="banner">
    <a class="absolute translate-x-[-150%] focus:translate-x-0 p-2 m-2 sm:p-4 sm:m-4 bg-white shadow-xl z-50" href="#contenuprincipal">Aller au contenu</a>
    <HeaderBanner />
    <portal-target name="header-top" multiple />
    <div class="relative bg-white shadow-lg z-30">
      <HeaderMobile class="block lg:hidden" :full-width="fullWidth" />
      <HeaderDesktop class="hidden lg:block" :full-width="fullWidth" />
    </div>
  </header>
</template>

<script>
import HeaderBanner from '@/components/layout/HeaderBanner.vue'
import HeaderMobile from '@/components/section/header/HeaderMobile.vue'
import HeaderDesktop from '@/components/section/header/HeaderDesktop.vue'

export default {
  components: {
    HeaderBanner,
    HeaderMobile,
    HeaderDesktop
  },
  props: {
    fullWidth: {
      type: Boolean,
      default: false
    }
  }
}
</script>
