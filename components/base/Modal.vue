<template>
  <transition name="fade">
    <div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-black bg-opacity-40 transition-opacity" aria-hidden="true" />

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div v-click-outside="onClickOutside" class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white pl-4 pt-5 pb-4 sm:pl-6 sm:pb-4">
            <div class="pr-6 sm:pr-12">
              <!-- Title -->
              <h3 class="text-lg leading-6 font-medium text-gray-900 sm:mt-[-4px]" v-html="title" />

              <!-- Close -->
              <div class="hidden sm:block absolute top-0 right-0 p-5">
                <button
                  type="button"
                  class="bg-white rounded-md text-gray-400 hover:text-jva-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jva-blue-500 transition-all"
                  @click.prevent.stop="$emit('close')"
                >
                  <span class="sr-only">Close</span>
                  <XIcon />
                </button>
              </div>
            </div>

            <div class="pr-6 sm:flex sm:items-start mt-6">
              <!-- Icon -->
              <div
                v-if="icon"
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
                :class="[
                  { 'bg-red-100': icon == 'warning'},
                  { 'bg-green-100': icon == 'success'},
                ]"
              >
                <component
                  :is="icon == 'warning' ? 'ExclamationIcon' : 'CheckIcon'"
                  :class="[
                    {'text-red-600': icon == 'warning'},
                    {'text-green-600': icon == 'success'}
                  ]"
                />
              </div>

              <div v-scroll-lock="true" class="w-full" :class="[{'mt-3 sm:mt-0 sm:ml-4': icon}]">
                <!-- Content -->
                <div class="text-sm text-gray-500">
                  <slot />
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex space-x-4 justify-end">
            <slot name="footer">
              <Button @click.native.prevent.stop="$emit('close')">
                Fermer
              </Button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String, /* warning || success */
      default: null
    }
  },
  methods: {
    onClickOutside () {
      this.$emit('close')
    }
  }
}
</script>
