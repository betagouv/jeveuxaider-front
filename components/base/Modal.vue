<template>
  <!-- @todo: refactoring portal body-end -->
  <transition
    enter-active-class="ease-out duration-300"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed z-50 inset-0 overflow-y-auto overscroll-contain" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <FocusLoop :is-visible="isOpen" @keydown.native.esc="$emit('close')">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 sm:text-center sm:block sm:p-0">
          <div
            class="fixed inset-0 bg-opacity-75 transition-opacity"
            aria-hidden="true"
            :class="[backgroundOverlay]"
          />
          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <transition
            enter-active-class="ease-out duration-300"
            enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="tease-in duration-200"
            leave-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              v-click-outside="handleClickOutside"
              :class="[
                {'overflow-hidden' : overflowHidden},
                widthClass
              ]"
              class="inline-block align-bottom bg-white text-left shadow-xl transform transition-all sm:my-8 sm:align-middle w-full"
            >
              <div class="bg-white p-8 sm:p-12">
                <div class="mb-6" :style="!hideClose ? 'width:calc(100% - 40px)' : null">
                  <div class="hidden sm:block absolute top-0 right-0 p-8 sm:p-12">
                    <button v-if="!hideClose" type="button" class="bg-white text-gray-400 hover:text-gray-700" @click="$emit('close')">
                      <span class="sr-only">Close</span>
                      <RiCloseFill class="h-6 w-6 fill-current cursor-pointer" />
                    </button>
                  </div>
                  <div class="flex items-center">
                    <div
                      v-if="icon || theme"
                      class="mx-auto flex-shrink-0 flex items-center justify-stretch h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                    >
                      <component
                        :is="icon"
                        v-if="icon"
                        :class="[
                          'h-8 w-8 fill-current',
                          {'text-jva-green-500': theme == 'success'},
                          {'text-jva-orange-500': theme == 'warning'},
                          {'text-jva-red-500': theme == 'danger'},
                          {'text-jva-blue-500': theme == 'message'},
                          iconClass
                        ]"
                      />
                      <CheckIcon v-else-if="theme == 'success'" class="h-8 w-8 text-jva-green-500" />
                      <ExclamationIcon v-else-if="theme == 'warning'" class="h-8 w-8 text-jva-orange-500" />
                      <ExclamationIcon v-else-if="theme == 'danger'" class="h-8 w-8 text-jva-red-500" />
                      <ChatAltIcon v-else-if="theme == 'message'" class="h-8 w-8 text-jva-blue-500" />
                    </div>
                    <div
                      :class="[
                        {'sm:ml-2': theme || icon},
                        'min-w-0 w-full'
                      ]"
                    >
                      <h3
                        v-if="title"
                        id="modal-title"
                        :class="[
                          'text-2xl leading-8 font-bold text-gray-900',
                        ]"
                        v-html="title"
                      />
                    </div>
                  </div>
                </div>
                <slot />
              </div>
              <div v-if="!hideFooter" class="bg-gray-50 px-8 py-6 sm:px-12 flex items-center justify-end">
                <slot name="footer">
                  <Button variant="white" @click.native="$emit('close')">
                    Fermer
                  </Button>
                </slot>
              </div>
            </div>
          </transition>
        </div>
      </FocusLoop>
    </div>
  </transition>
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
    title: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: '' // success, warning, danger, info
    },
    icon: {
      type: String,
      default: null
    },
    iconClass: {
      type: String,
      default: null
    },
    preventClickOutside: {
      type: Boolean,
      default: false
    },
    overflowHidden: {
      type: Boolean,
      default: true
    },
    backgroundOverlay: {
      type: String,
      default: 'bg-gray-500'
    },
    widthClass: {
      type: String,
      default: 'max-w-3xl'
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    hideClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickOutside () {
      if (!this.preventClickOutside) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.min-h-screen {
  min-height: 100dvh;
}
</style>
