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
      <div v-show="isOpen" role="dialog" aria-modal="true" class="fixed inset-y-0 left-0">
        <FocusLoop :is-visible="isOpen" @keydown.native.esc="$emit('close')">
          <div :aria-hidden="isOpen ? 'false' : 'true'" class="w-screen h-full">
            <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
              <div class="p-4">
                <div class="flex items-start justify-between">
                  <div class="self-center">
                    <slot name="title" />
                  </div>
                  <div class="ml-3 h-7 flex items-center">
                    <button
                      ref="closeButton"
                      type="button"
                      class="bg-white text-gray-400 hover:text-gray-500"
                      @click="$emit('close')"
                    >
                      <span class="sr-only">Close panel</span>
                      <RiCloseFill class="h-6 w-6 fill-current cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-scroll-lock="isOpen"
                class="flex-1 overflow-y-auto overscroll-contain p-4"
              >
                <div class="space-y-8">
                  <slot />
                </div>
              </div>
              <slot name="footer" />
            </div>
          </div>
        </FocusLoop>
      </div>
    </transition>
  </portal>
</template>

<script>
import { FocusLoop } from '@vue-a11y/focus-loop'

export default {
  components: {
    FocusLoop
  },
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
  }
}
</script>
