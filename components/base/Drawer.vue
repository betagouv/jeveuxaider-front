<template>
  <transition
    enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
    enter-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
    leave-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div v-if="isOpen" class="fixed z-30 inset-y-0 right-0 pl-10 flex" role="dialog" aria-modal="true">
      <div aria-hidden="true" class="w-screen max-w-md">
        <div :style="{ paddingTop: paddingTop + 'px' }" class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
          <div class="px-4 sm:px-6">
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
          <div class="relative flex-1 px-4 sm:px-6">
            <div class="absolute inset-0 px-4 sm:px-6">
              <slot />
              <!-- Hack pour avoir un padding bottom quand on scroll en bas -->
              <div class="h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    setOpen: {
      type: Function,
      default: () => null
    }
  },
  data () {
    return {
      headerheight: 180,
      paddingTop: 180
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll (event) {
      this.paddingTop = this.headerheight - window.scrollY < 24 ? 24 : this.headerheight - window.scrollY
    }
  }
}
</script>
