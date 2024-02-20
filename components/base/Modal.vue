<template>
  <div v-scroll-lock="isScrollLocked">
    <transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      @enter="isScrollLocked = true"
      @after-leave="isScrollLocked = false"
    >
      <div
        v-if="isOpen"
        class="fixed z-50 inset-0 overflow-y-auto overscroll-contain"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <FocusLoop :is-visible="isOpen" @keydown.native.esc="$emit('close')">
          <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 sm:text-center sm:block sm:p-0"
          >
            <div
              class="fixed inset-0 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              :class="[backgroundOverlay]"
            />
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
              >&#8203;</span
            >
            <transition
              enter-active-class="ease-out duration-300"
              enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to-class="opacity-100 translate-y-0 sm:scale-100"
              leave-active-class="tease-in duration-200"
              leave-from-class="opacity-100 translate-y-0 sm:scale-100"
              leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                v-click-outside="handleClickOutside"
                :class="[{ 'overflow-hidden': overflowHidden }, widthClass]"
                class="inline-block align-bottom bg-white text-left shadow-xl transform transition-all sm:my-8 sm:align-middle w-full"
              >
                <div class="">
                  <!-- MODAL HEADER -->
                  <div class="p-4 px-8 flex justify-end">
                    <button
                      type="button"
                      class="flex items-center text-jva-blue-500 text-sm hover:bg-[#F6F6F6] px-3 py-1"
                      @click="$emit('close')"
                    >
                      <span class="font-medium">Fermer</span>
                      <RiCloseFill class="h-4 w-4 fill-current cursor-pointer" />
                    </button>
                  </div>

                  <!-- MODAL CONTENT -->
                  <div class="px-8">
                    <!-- TITLE -->
                    <div class="flex items-center mb-4">
                      <div
                        v-if="icon"
                        class="mx-auto flex-shrink-0 flex items-center justify-stretch h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                      >
                        <component
                          :is="icon"
                          v-if="icon"
                          :class="['h-8 w-8 fill-current', iconClass]"
                        />
                      </div>
                      <div :class="['min-w-0 w-full']">
                        <h3
                          v-if="title"
                          id="modal-title"
                          :class="['text-2xl leading-8 font-bold text-gray-900']"
                        >
                          {{ title }}
                        </h3>
                      </div>
                    </div>
                    <slot />
                  </div>
                  <!-- MODAL FOOTER -->
                  <div class="flex justify-end gap-4 p-8" v-if="$slots.footer">
                    <slot name="footer" />
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </FocusLoop>
      </div>
    </transition>
  </div>
</template>

<script>
import { FocusLoop } from '@vue-a11y/focus-loop'

export default defineNuxtComponent({
  emits: ['close'],
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
      default: '',
    },
    icon: {
      type: String,
      default: null,
    },
    iconClass: {
      type: String,
      default: null,
    },
    preventClickOutside: {
      type: Boolean,
      default: false,
    },
    overflowHidden: {
      type: Boolean,
      default: true,
    },
    backgroundOverlay: {
      type: String,
      default: 'bg-gray-500',
    },
    widthClass: {
      type: String,
      default: 'max-w-3xl',
    },
    // hideFooter: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      isScrollLocked: this.isOpen,
    }
  },
  methods: {
    handleClickOutside() {
      if (!this.preventClickOutside) {
        this.$emit('close')
      }
    },
  },
})
</script>

<style lang="postcss" scoped>
.min-h-screen {
  min-height: 100dvh;
}
</style>
