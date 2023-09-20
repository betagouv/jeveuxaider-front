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
        >
        <div class="flex flex-col w-full h-full px-4">
          <button
            class="p-4 -mr-4 lg:m-0 lg:p-8 cursor-pointer ml-auto lg:absolute lg:right-0"
            @click="onClose"
          >
            <RiCloseFill class="text-white h-10 w-10 fill-current" />
          </button>

          <div
            v-scroll-lock="true"
            class="overflow-y-auto flex-1 flex flex-col lg:justify-center lg:items-center"
          >
            <div class="pb-32 lg:pb-0">
              <div class="text-center text-white text-lg">#ChacunPourTous</div>
              <div class="text-center text-white font-bold mb-4 text-4xl tracking-tight">
                {{ title }}
              </div>
              <div class="bg-gray-100 max-w-full lg:max-w-xl mx-auto px-2 py-6 sm:p-6 lg:p-10">
                <slot />
              </div>
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default defineNuxtComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
  },
})
</script>
