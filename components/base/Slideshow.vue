<template>
  <div>
    <VueSlickCarousel
      ref="slideshowRef"
      :accessibility="true"
      :edge-friction="0"
      :swipe-to-slide="true"
      :pause-on-focus="true"
      :touch-threshold="100"
      :adaptive-height="adaptiveHeight"
      :arrows="arrows"
      :dots="dots"
      :speed="speed"
      :variable-width="variableWidth"
      :infinite="infinite"
      :class="[{ 'is-swipping': isSwiping }, { 'is-adaptive-height': adaptiveHeight}]"
      @beforeChange="onBeforeChange"
      @afterChange="onAfterChange"
      @swipe="isSwiping = true"
      @mouseup.native="isSwiping = false"
      @touchend.native="isSwiping = false"
    >
      <slot />

      <!-- <template #prevArrow="arrowOption">
        <transition name="fade">
          <button
            v-show="infinite || arrowOption.currentSlide"
            class="rounded-full !bg-white transition flex justify-center items-center !p-6 relative z-10"
          >
            <img
              src="/images/icons/slideshow_chevron_left.svg"
              alt="Précédent"
              class="absolute inset-0 m-auto"
              data-not-lazy
            >
          </button>
        </transition>
      </template>

      <template #nextArrow="arrowOption">
        <transition name="fade">
          <button
            v-show="infinite || arrowOption.currentSlide < arrowOption.slideCount - 1"
            class="rounded-full !bg-white transition flex justify-center items-center !p-6 relative z-10"
          >
            <img
              src="/images/icons/slideshow_chevron_right.svg"
              alt="Suivant"
              class="absolute inset-0 m-auto"
              data-not-lazy
            >
          </button>
        </transition>
      </template> -->

      <template #customPaging="page">
        <button
          :aria-label="`slide ${page+1}`"
          :class="[
            '!text-xs !leading-none !p-0 !rounded-full',
            {'!text-[#DEDEDE]': dotsVariant === 'dark' && currentSlideIndex !== page},
            {'!text-[#696974]': dotsVariant === 'dark' && currentSlideIndex === page},
            {'!text-white !opacity-30': dotsVariant === 'light' && currentSlideIndex !== page},
            {'!text-white': dotsVariant === 'light' && currentSlideIndex === page},
          ]"
        >
          ●
        </button>
      </template>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: { VueSlickCarousel },
  props: {
    slideshowRef: {
      type: String,
      default: 'slideshow'
    },
    slidesAreLinks: {
      type: Boolean,
      default: false
    },
    adaptiveHeight: {
      type: Boolean,
      default: false
    },
    arrows: {
      type: Boolean,
      default: false
    },
    dots: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: 500
    },
    infinite: {
      type: Boolean,
      default: false
    },
    variableWidth: {
      type: Boolean,
      default: true
    },
    ariaLabelledby: { type: String, default: null },
    ariaLabel: { type: String, default: null },
    dotsVariant: {
      type: String,
      default: 'dark',
      validator: v => ['dark', 'light'].includes(v)
    }
  },
  data () {
    return {
      isSwiping: false,
      currentSlideIndex: 0
    }
  },
  mounted () {
    this.handleAccessibilityInit()
  },
  methods: {
    previous () {
      this.$refs.slideshowRef.prev()
    },
    next () {
      this.$refs.slideshowRef.next()
    },
    handleAccessibilityInit () {
      const slickTrack = this.$refs.slideshowRef.$el.getElementsByClassName(
        'slick-track'
      )?.[0]
      slickTrack.setAttribute('role', 'group')
      slickTrack.setAttribute('aria-roledescription', 'carousel')
      if (this.ariaLabelledby) {
        slickTrack.setAttribute('aria-labelledby', this.ariaLabelledby)
      } else if (this.ariaLabel) {
        slickTrack.setAttribute('aria-label', this.ariaLabel)
      }

      const slides = this.$refs.slideshowRef.$el.getElementsByClassName(
        'slick-slide'
      )
      slides.forEach((slide) => {
        if (this.slidesAreLinks) {
          slide.removeAttribute('tabindex')
        }
      })

      this.handleAccessibility(true)
    },
    handleAccessibility (isInit) {
      const slides = this.$refs.slideshowRef.$el.getElementsByClassName(
        'slick-slide'
      )
      slides.forEach((slide) => {
        slide.removeAttribute('aria-hidden')
        const el = this.slidesAreLinks ? slide.getElementsByTagName('a').item(0) : slide
        if (slide.classList.contains('slick-current')) {
          slide.setAttribute('aria-selected', 'true')
          el.setAttribute('tabindex', 0)
          if (!isInit && this.$refs.slideshowRef.$el.contains(document.activeElement) && document.activeElement.nodeName !== 'BUTTON') {
            el.focus()
          }
        } else {
          slide.setAttribute('aria-selected', 'false')
          el.setAttribute('tabindex', -1)
        }
      })

      const dots = this.$refs?.slideshowRef?.$el
        ?.getElementsByClassName('slick-dots')
        ?.item(0)?.querySelectorAll(':scope > li')
      if (dots) {
        dots.forEach((dot) => {
          if (dot.classList.contains('slick-active')) {
            dot.firstChild.setAttribute('aria-selected', 'true')
          } else {
            dot.firstChild.setAttribute('aria-selected', 'false')
          }
        })
      }
    },
    onBeforeChange (oldSlide, newSlide) {
      if (this.$refs.slideshowRef.autoplay) {
        this.$refs.slideshowRef.pause()
      }
      this.currentSlideIndex = newSlide
    },
    onAfterChange () {
      this.handleAccessibility()

      if (this.$refs.slideshowRef.autoplay) {
        this.$refs.slideshowRef.play()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.slick-slider {
  :deep(.slick-list) {
    overflow: visible;
  }

  :deep(.slick-track) {
    @apply gap-4 sm:gap-6 xl:gap-8 flex items-stretch;
  }

  :deep(.slick-arrow) {
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
    display: none;
    @screen sm {
      display: block;
    }
    @apply transform hover:scale-125;
    &.slick-prev {
      @apply left-0;
      top: calc(50% - 24px);
      @apply -translate-y-1/2;
    }
    &.slick-next {
      @apply right-0;
      top: calc(50% - 24px);
      @apply -translate-y-1/2;
    }
    &:focus-visible {
      outline-style: solid;
      outline-color: #0a76f6;
      outline-width: 2px;
      outline-offset: 2px;
    }
  }

  :deep(.slick-dots) {
    position: inherit;
    @apply text-center sm:text-left sm:-mx-1 bottom-0 w-auto flex-none sm:mr-8 mt-6;
    > li {
      @apply w-auto h-auto mx-1;
      > button {
        @apply transition;
        width: 10px;
        height: 10px;
        &:before {
          opacity : 0 !important;
          pointer-events: none !important;
        }
        &:focus-visible {
          outline-style: solid;
          outline-color: #0a76f6;
          outline-width: 2px;
          outline-offset: 2px;
        }
      }
    }
  }
}

.is-swipping {
  :deep(a) {
    @apply pointer-events-none;
  }
}

:deep(.slick-slide:focus-visible) {
  outline-style: solid !important;
  outline-color: #0a76f6 !important;
  outline-width: 2px !important;
  outline-offset: 2px !important;
}

.slick-slider:not(.is-adaptive-height) {
  :deep(.slick-slide) {
    height: auto !important;
  }
  :deep(.slick-track) {
    > div > div {
      height: 100%;
    }
  }
}
</style>
