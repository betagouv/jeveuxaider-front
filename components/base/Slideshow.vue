<template>
  <ClientOnly>
    <Teleport v-if="navigationId" :to="`#${navigationId}`">
      <BaseSlideshowArrows
        :variant="navigationVariant"
        :button-class="navigationButtonClass"
        :current-slide="currentSlideIndex"
        :nb-slides="nbSlides"
        @previous="previous"
        @next="next"
      />
    </Teleport>
  </ClientOnly>

  <swiper-container
    ref="slideshowRef"
    :slides-per-view="'auto'"
    :auto-height="autoHeight"
    :space-between="spaceBetween"
    :breakpoints="breakpoints"
    :autoplay="autoplay"
    :pagination="dots"
    :loop="loop"
    :aria-labelledby="ariaLabelledby"
    :aria-label="ariaLabel"
    :class="['swiper-component', { bleed: bleed }, `dots-${dotsVariant}`]"
    @activeindexchange="onActiveIndexChange"
    @fromedge="onFromEdge"
    @reachend="onReachEnd"
    v-bind="$attrs"
  >
    <slot />
  </swiper-container>
</template>

<script>
import { register } from 'swiper/element/bundle'

export default defineNuxtComponent({
  components: {},
  setup() {
    register()
  },
  props: {
    bleed: {
      type: Boolean,
      default: true,
    },
    autoHeight: {
      type: Boolean,
      default: false,
    },
    spaceBetween: {
      type: Number,
      default: 16,
    },
    breakpoints: {
      type: Object,
      default: () => {
        return {
          // sm
          640: {
            spaceBetween: 24,
          },
          // xl
          1348: {
            spaceBetween: 32,
          },
        }
      },
    },
    autoplay: {
      type: [Object, Boolean],
      default: undefined,
    },
    loop: { type: Boolean, default: false },
    dots: {
      type: Boolean,
      default: true,
    },
    dotsVariant: {
      type: String,
      default: 'dark',
      validator: (v) => ['dark', 'light'].includes(v),
    },
    ariaLabelledby: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
    navigationId: {
      type: String,
      default: null,
    },
    navigationButtonClass: { type: String, default: '' },
    navigationVariant: { type: String, default: undefined },
    containerPaddingBottom: {
      type: String,
      default: '3.5rem',
    },
    paginationWidth: {
      type: String,
      default: 'initial',
    },
    // speed: {
    //   type: Number,
    //   default: 500,
    // },
    // infinite: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      swiperInstance: null,
      currentSlideIndex: 0,
      nbSlides: 0,
    }
  },
  methods: {
    previous() {
      this.swiperInstance.slidePrev()
    },
    next() {
      this.swiperInstance.slideNext()
    },
    onActiveIndexChange() {
      this.currentSlideIndex = this.swiperInstance?.activeIndex
    },
    onFromEdge() {
      const nbSlides = this.swiperInstance?.slides.length
      if (this.currentSlideIndex === nbSlides - 1) {
        this.currentSlideIndex = this.currentSlideIndex - 1
      }
    },
    async onReachEnd() {
      await nextTick()
      this.currentSlideIndex = this.swiperInstance?.slides.length - 1
    },
  },
  async mounted() {
    this.swiperInstance = this.$refs.slideshowRef.swiper
    await nextTick()
    if (!this.swiperInstance || this.swiperInstance.destroyed) {
      return
    }
    this.$emit('init', this.swiperInstance)
    this.nbSlides = this.swiperInstance.slides.length
    // breakpoints are not carried over with SSR
    this.swiperInstance.params.breakpoints = this.breakpoints
    this.swiperInstance.update()
  },
})
</script>

<style lang="postcss" scoped>
.swiper-component {
  &::part(container) {
    padding-bottom: v-bind(containerPaddingBottom);
  }
  &.bleed::part(container) {
    overflow: visible;
  }

  &::part(pagination) {
    width: v-bind(paginationWidth);
    bottom: 0;
  }

  &.dots-dark {
    &::part(bullet) {
      @apply bg-[#DEDEDE] opacity-100;
    }

    &::part(bullet-active) {
      @apply bg-[#696974] opacity-100;
    }
  }

  &.dots-light {
    &::part(bullet) {
      @apply bg-white opacity-30;
    }

    &::part(bullet-active) {
      @apply bg-white opacity-100;
    }
  }

  :slotted(swiper-slide) {
    height: auto;
  }
}
</style>
