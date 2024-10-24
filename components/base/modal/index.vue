<template>
  <div>
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
        :class="[
          'fixed z-[70] inset-0',
          {
            'overflow-y-auto overflow-x-hidden overscroll-contain': !stickyHeader && !stickyFooter,
          },
        ]"
        :aria-labelledby="title ? `modal-title-${uuid}` : undefined"
        role="dialog"
        aria-modal="true"
        v-scroll-lock="!stickyHeader && !stickyFooter ? isScrollLocked : undefined"
      >
        <FocusLoop :is-visible="isOpen" @keydown.native.esc="$emit('close')">
          <div class="flex items-end justify-center min-h-screen sm:text-center sm:block sm:px-4">
            <slot name="overlay">
              <div
                aria-hidden="true"
                :class="['fixed inset-0 initial:bg-gray-500/75', overlayClass]"
              />
            </slot>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
              >&#8203;</span
            >
            <transition
              enter-active-class="ease-out duration-300"
              enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to-class="opacity-100 translate-y-0 sm:scale-100"
              leave-active-class="ease-in duration-200"
              leave-from-class="opacity-100 translate-y-0 sm:scale-100"
              leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                v-click-outside="handleClickOutside"
                :class="[
                  '@container',
                  'initial:overflow-hidden inline-block align-bottom bg-white text-left shadow-xl transform transition-all sm:my-8 sm:align-middle w-full initial:max-w-3xl pointer-events-auto',
                  {
                    'initial:max-h-[100svh] initial:sm:max-h-[calc(100svh_-_4rem)]':
                      stickyHeader || stickyFooter,
                  },
                  containerClass,
                ]"
              >
                <div class="flex flex-col max-h-[inherit]">
                  <!-- MODAL HEADER - STICKY -->
                  <BaseModalHeader
                    v-if="stickyHeader"
                    :sticky="true"
                    :header-class="headerClass"
                    @close="$emit('close')"
                  >
                    <slot name="header" />
                  </BaseModalHeader>

                  <div
                    ref="scrollContainer"
                    :class="[
                      'flex flex-col',
                      {
                        'overflow-y-auto overflow-x-hidden overscroll-contain custom-scrollbar-gray initial:max-h-[inherit] initial:mr-1':
                          stickyFooter || stickyHeader,
                      },
                      scrollContainerClass,
                    ]"
                    v-scroll-lock="stickyFooter || stickyHeader ? isScrollLocked : undefined"
                  >
                    <!-- MODAL HEADER -->
                    <BaseModalHeader
                      v-if="!stickyHeader"
                      :sticky="false"
                      :header-class="headerClass"
                      @close="$emit('close')"
                    >
                      <slot name="header" />
                    </BaseModalHeader>

                    <div :class="['initial:py-4 initial:px-6 initial:sm:px-8', contentClass]">
                      <!-- TITLE -->
                      <div v-if="title" class="flex items-center mb-4">
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
                            :id="`modal-title-${uuid}`"
                            :class="['text-2xl leading-8 font-bold text-gray-900']"
                          >
                            {{ title }}
                          </h3>
                        </div>
                      </div>

                      <!-- MODAL CONTENT -->
                      <slot />
                    </div>

                    <!-- MODAL FOOTER -->
                    <BaseModalFooter
                      v-if="!stickyFooter && $slots.footer"
                      :sticky="false"
                      :footer-class="footerClass"
                    >
                      <slot name="footer" />
                    </BaseModalFooter>
                  </div>

                  <!-- MODAL FOOTER - STICKY -->
                  <BaseModalFooter
                    v-if="stickyFooter && $slots.footer"
                    :sticky="true"
                    :footer-class="footerClass"
                  >
                    <slot name="footer" />
                  </BaseModalFooter>
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
  emits: ['open', 'close'],
  components: {
    FocusLoop,
  },
  props: {
    isOpen: { type: Boolean, default: false },
    title: { type: String, default: '' },
    icon: { type: String, default: null },
    iconClass: { type: String, default: null },
    preventClickOutside: { type: Boolean, default: false },

    stickyHeader: { type: Boolean, default: false },
    stickyFooter: { type: Boolean, default: false },

    overlayClass: { type: [String, Array], default: null },
    containerClass: { type: [String, Array], default: null },
    scrollContainerClass: { type: [String, Array], default: null },
    headerClass: { type: [String, Array], default: null },
    contentClass: { type: [String, Array], default: null },
    footerClass: { type: [String, Array], default: null },
  },
  setup() {
    return {
      uuid: useId(),
    }
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
  watch: {
    async isOpen(newVal) {
      if (newVal) {
        await this.$nextTick()
        this.$emit('open', { scrollContainer: this.$refs.scrollContainer })
      }
    },
  },
})
</script>

<style lang="postcss" scoped>
.min-h-screen {
  min-height: 100dvh;
}

.custom-scrollbar-gray::-webkit-scrollbar-track {
  @apply my-3;
}
</style>
