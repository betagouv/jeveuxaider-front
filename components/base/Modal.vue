<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="isOpen" class="fixed z-50 inset-0 overflow-y-auto overscroll-contain" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
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
          <div v-if="isOpen" v-click-outside="handleClickOutside" class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white p-4 sm:p-6">
              <div class="hidden sm:block absolute top-0 right-0 p-4 sm:p-6">
                <button type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cool-gray-500" @click="$emit('close')">
                  <span class="sr-only">Close</span>
                  <XIcon />
                </button>
              </div>
              <div class="sm:flex sm:items-start">
                <div
                  v-if="icon || theme"
                  class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                  :class="[
                    {'bg-green-100': theme == 'success'},
                    {'bg-orange-100': theme == 'warning'},
                    {'bg-red-100': theme == 'danger'},
                    {'bg-gray-100': !theme},
                  ]"
                >
                  <component
                    :is="icon"
                    v-if="icon"
                    :class="[
                      'h-6 w-6 ',
                      {'text-jva-green-500': theme == 'success'},
                      {'text-jva-orange-500': theme == 'warning'},
                      {'text-jva-red-500': theme == 'danger'},
                    ]"
                  />
                  <CheckIcon v-else-if="theme == 'success'" class="h-6 w-6 text-jva-green-500" />
                  <ExclamationIcon v-else-if="theme == 'warning'" class="h-6 w-6 text-jva-orange-500" />
                  <ExclamationIcon v-else-if="theme == 'danger'" class="h-6 w-6 text-jva-red-500" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:text-left min-w-0" :class="{'sm:ml-4': theme || icon}">
                  <h3 id="modal-title" class="text-lg leading-6 font-medium text-gray-900" v-html="title" />

                  <div class="mt-4">
                    <slot />
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-center lg:justify-end">
              <slot name="footer">
                <Button variant="white" @click.native="$emit('close')">
                  Fermer
                </Button>
              </slot>
            </div>
          </div>
        </transition>
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
    title: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      default: '' // success, warning, danger
    },
    icon: {
      type: String,
      default: null
    },
    preventClickOutside: {
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
