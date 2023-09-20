<template>
  <ClientOnly>
    <Teleport to="#teleport-drawer">
      <transition
        enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div
          v-if="isOpen"
          role="dialog"
          aria-modal="true"
          class="fixed inset-y-0 right-0"
          :style="drawerStyle"
        >
          <div
            aria-hidden="true"
            class="w-screen h-full"
            :class="[
              { 'max-w-md': width === 'md' },
              { 'max-w-lg': width === 'lg' },
              { 'max-w-xl': width === 'xl' },
              { 'max-w-2xl': width === '2xl' },
              { 'max-w-3xl': width === '3xl' },
              { 'max-w-4xl': width === '4xl' },
            ]"
          >
            <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
              <div class="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll overscroll-contain">
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <slot name="title" />
                    <div class="ml-3 h-7 flex items-center">
                      <button
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
                <div class="relative flex-1 px-4 sm:px-6">
                  <div class="absolute inset-0 px-4 sm:px-6">
                    <slot />
                    <!-- Hack pour avoir un padding bottom quand on scroll en bas -->
                    <div class="h-8" />
                  </div>
                </div>
              </div>
              <div v-if="formId" class="flex-shrink-0 px-4 py-4 flex justify-end space-x-3">
                <BaseButton variant="white" @click.native="$emit('close')"> Annuler </BaseButton>
                <BaseButton type="submit" :form="formId" @click.native="$emit('submit')">
                  {{ submitLabel }}
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </ClientOnly>
</template>

<script>
export default defineNuxtComponent({
  emits: ['close', 'submit'],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    formId: {
      type: String,
      default: null,
    },
    submitLabel: {
      type: String,
      default: 'Enregister',
    },
    width: {
      type: String,
      default: 'md',
    },
  },
  data() {
    return {
      drawerStyle: '',
    }
  },
  mounted() {
    this.handleDrawerStyle()
    window.addEventListener('scroll', this.handleDrawerStyle)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleDrawerStyle)
  },
  methods: {
    handleDrawerStyle(event) {
      const headerheight = document.getElementById('header')?.offsetHeight ?? 0
      const offset = headerheight >= window.scrollY ? headerheight - window.scrollY : 0
      this.drawerStyle = `height: calc(100vh - ${offset}px); top: ${offset}px`
    },
  },
})
</script>
