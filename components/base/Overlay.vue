<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="isOpen" class="fixed inset-0 w-full h-full z-[60]">
      <div
        v-if="isOpen"
        class="w-full h-full flex flex-col items-center justify-center bg-jva-blue-500/95 overflow-y-auto py-4 lg:py-12"
      >
        <FocusLoop :is-visible="true" class="w-full">
          <div class="flex flex-col w-full h-full px-4">
            <button
              class="flex items-center cursor-pointer p-4 ml-auto lg:absolute lg:right-8 lg:top-8 lg:pl-2 lg:pr-1 lg:py-1 lg:hover:bg-jva-blue-300/50"
              @click="onClose"
            >
              <span class="text-white mr-1">Fermer</span>
              <RiCloseFill class="text-white h-6 w-6 fill-current relative top-[1px] right-[0px]" />
            </button>

            <div
              v-scroll-lock="true"
              class="flex-1 flex flex-col lg:justify-center lg:items-center"
            >
              <div class="w-full pb-32 lg:pb-12">
                <div class="text-center text-white text-lg">#ChacunPourTous</div>
                <div
                  v-if="title"
                  class="text-center text-white font-bold mb-4 text-4xl tracking-tight"
                >
                  {{ title }}
                </div>
                <div
                  class="bg-[#F6F6F6] mt-8 max-w-[588px] w-full mx-auto px-4 py-6 sm:p-6 lg:px-14 lg:py-12"
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
