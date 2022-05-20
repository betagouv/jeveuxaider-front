<template>
  <portal to="mobile-filters">
    <transition
      enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      enter-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      leave-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div v-if="isOpen" role="dialog" aria-modal="true" class="fixed inset-y-0 left-0" :style="drawerStyle">
        <div aria-hidden="true" class="w-screen h-full">
          <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
            <div class="p-4">
              <div class="flex items-start justify-between">
                <slot name="title" />
                <div class="ml-3 h-7 flex items-center">
                  <button
                    type="button"
                    class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jva-blue-500"
                    @click="$emit('close')"
                  >
                    <span class="sr-only">Close panel</span>
                    <XIcon class="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
            <div
              v-scroll-lock="isOpen"
              class="flex-1 overflow-y-auto overscroll-contain p-4"
            >
              <div class="space-y-4">
                <slot />
              </div>
            </div>
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    formId: {
      type: String,
      default: null
    },
    submitLabel: {
      type: String,
      default: 'Voir les résultats'
    }
  },
  data () {
    return {
      drawerStyle: ''
    }
  }
  // mounted () {
  //   this.handleDrawerStyle()
  //   window.addEventListener('scroll', this.handleDrawerStyle)
  // },
  // destroyed () {
  //   window.removeEventListener('scroll', this.handleDrawerStyle)
  // },
  // methods: {
  //   handleDrawerStyle (event) {
  //     const headerheight = document.getElementById('header')?.offsetHeight ?? 0
  //     const headerBannerheight = document.getElementById('header-banner')?.offsetHeight ?? 0
  //     const offset = (headerheight + headerBannerheight) >= window.scrollY ? headerheight + headerBannerheight - window.scrollY : 0
  //     this.drawerStyle = `height: calc(100vh - ${offset}px); top: ${offset}px`
  //   }
  // }
}
</script>
