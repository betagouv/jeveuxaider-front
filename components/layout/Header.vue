<template>
  <header id="header" ref="header" role="banner">
    <a
      class="absolute translate-x-[-150%] focus:translate-x-0 p-2 m-2 sm:p-4 sm:m-4 bg-white shadow-xl z-50"
      href="#contenuprincipal"
      >Aller au contenu</a
    >
    <HeaderBanner />
    <div id="teleport-header-top"></div>

    <div class="relative bg-white shadow-lg z-50">
      <HeaderMobile class="block lg:hidden" :full-width="fullWidth" />
      <HeaderDesktop class="hidden lg:block" :full-width="fullWidth" />
    </div>

    <ClientOnly>
      <Teleport to="#teleport-body-end">
        <TransitionGroup name="fade">
          <LazyMissionShareOverlay
            key="mission-share-overlay"
            v-if="$stores.missionShare.showOverlay"
          />
          <LazySoftGateOverlay key="soft-gate-overlay" v-if="$stores.softGate.showOverlay" />
        </TransitionGroup>
      </Teleport>
    </ClientOnly>
  </header>
</template>

<script>
import HeaderBanner from '@/components/layout/HeaderBanner.vue'
import HeaderMobile from '@/components/section/header/HeaderMobile.vue'
import HeaderDesktop from '@/components/section/header/HeaderDesktop.vue'
import LazySoftGateOverlay from '@/components/section/SoftGateOverlay.vue'
import LazyMissionShareOverlay from '@/components/section/MissionShareOverlay.vue'

export default defineNuxtComponent({
  components: {
    HeaderBanner,
    HeaderMobile,
    HeaderDesktop,
    LazySoftGateOverlay,
    LazyMissionShareOverlay,
  },
  props: {
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
