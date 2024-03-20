<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="isOpen" class="fixed inset-0 w-full h-full z-50">
      <div
        v-if="isOpen"
        class="w-full h-full flex flex-col items-center justify-center bg-jva-blue-500/95"
      >
        <FocusLoop :is-visible="true" @keydown.native.esc="onClose">
          <div class="flex flex-col w-full h-full px-4">
            <button
              class="flex items-center cursor-pointer p-4 ml-auto lg:absolute lg:right-8 lg:top-8 lg:px-2 lg:py-1 lg:hover:bg-jva-blue-300/50"
              @click="onClose"
            >
              <span class="text-white mr-1">Fermer</span>
              <RiCloseFill class="text-white h-6 w-6 fill-current relative top-[1px]" />
            </button>

            <div
              v-scroll-lock="true"
              class="overflow-y-auto flex-1 flex flex-col lg:justify-center lg:items-center"
            >
              <div class="pb-32 lg:pb-0">
                <div class="text-center text-white text-lg">#ChacunPourTous</div>
                <div
                  v-if="title"
                  class="text-center text-white font-bold mb-4 text-4xl tracking-tight"
                >
                  {{ title }}
                </div>
                <div
                  class="bg-[#F6F6F6] mt-8 max-w-full lg:w-[588px] mx-auto px-2 py-6 sm:p-6 lg:px-14 lg:py-12"
                >
                  <slot />
                </div>
                <slot name="footer" />
              </div>
            </div>
          </div>
        </FocusLoop>
      </div>
    </div>
  </transition>
</template>

<script>
import { FocusLoop } from '@vue-a11y/focus-loop'

export default defineNuxtComponent({
  components: {
    FocusLoop,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
  },
})
</script>
