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
      <div v-if="isOpen" class="w-full h-full bg-black/75">
        <FocusLoop :is-visible="true">
          <div v-scroll-lock="true" class="p-[40px] h-full w-full overflow-y-auto">
            <div class="bg-white">
              <div class="p-8 flex justify-between">
                <div class="text-lg font-bold">{{ title }}</div>
                <slot name="header" />
                <button class="flex space-x-2" @click="onClose">
                  <RiCloseFill class="h-6 w-6 fill-current relative top-[1px] right-[0px]" />
                </button>
              </div>
              <div v-scroll-lock="true" class="bg-gray-100">
                <slot />
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
