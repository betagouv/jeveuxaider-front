<template>
  <div>
    <VueSlickCarousel
      ref="vueSlickCarousel"
      v-bind="settings"
      :class="[{ 'is-swipping': isSwiping }]"
      @beforeChange="onBeforeChange"
      @afterChange="onAfterChange"
      @swipe="isSwiping = true"
      @mouseup.native="isSwiping = false"
      @touchend.native="isSwiping = false"
    >
      <slot />

      <template #prevArrow="arrowOption">
        <transition name="fade">
          <button
            v-show="settings.infinite || arrowOption.currentSlide"
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
            v-show="
              settings.infinite || arrowOption.currentSlide < slidesCount - 3
            "
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
      </template>

      <template #customPaging="page">
        <button
          :aria-label="`slide ${page+1}`"
          class="!text-sm !leading-none !p-0 !rounded-full !text-[#DEDEDE]"
        >
          ●
        </button>
      </template>
    </VueSlickCarousel>

    <template v-if="moreLink">
      <template v-if="moreLink.isExternal">
        <Link ref="moreLink" :to="moreLink.link" :is-external="true" class="text-[#696974]">
          {{ moreLink.label }}
        </Link>
      </template>
      <template v-else>
        <Link ref="moreLink" :to="moreLink.link" class="text-[#696974]">
          {{ moreLink.label }}
        </Link>
      </template>
    </template>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import Link from '@/components/dsfr/Link.vue'

export default {
  components: { VueSlickCarousel, Link },
  props: {
    slidesAreLinks: {
      type: Boolean,
      default: false
    },
    moreLink: {
      type: [Object, Boolean],
      default: false
    },
    slidesCount: {
      type: Number,
      required: true
    },
    addDotsWrapper: {
      type: Boolean,
      default: true
    },
    settings: {
      type: Object,
      default () {
        return {
          arrows: true,
          dots: true,
          speed: 500,
          edgeFriction: 0,
          touchThreshold: 100,
          swipeToSlide: true,
          infinite: false,
          variableWidth: true,
          accessibility: true,
          pauseOnFocus: true
        }
      }
    },
    ariaLabelledby: { type: String, default: null },
    ariaLabel: { type: String, default: null }
  },
  data () {
    return {
      isSwiping: false
    }
  },
  mounted () {
    this.handleAccessibilityInit()
    // if (this.slidesAreLinks) {
    //   this.handleLinksAccessibility()
    // }
    if (this.addDotsWrapper) {
      this.handleDotsWrapper()
    }
  },
  methods: {
    handleAccessibilityInit () {
      const slickTrack = this.$refs.vueSlickCarousel.$el.getElementsByClassName(
        'slick-track'
      )?.[0]
      slickTrack.setAttribute('role', 'group')
      slickTrack.setAttribute('aria-roledescription', 'carousel')
      if (this.ariaLabelledby) {
        slickTrack.setAttribute('aria-labelledby', this.ariaLabelledby)
      } else if (this.ariaLabel) {
        slickTrack.setAttribute('aria-label', this.ariaLabel)
      }

      const slides = this.$refs.vueSlickCarousel.$el.getElementsByClassName(
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
      const slides = this.$refs.vueSlickCarousel.$el.getElementsByClassName(
        'slick-slide'
      )
      slides.forEach((slide) => {
        slide.removeAttribute('aria-hidden')
        const el = this.slidesAreLinks ? slide.getElementsByTagName('a').item(0) : slide
        if (slide.classList.contains('slick-current')) {
          slide.setAttribute('aria-selected', 'true')
          el.setAttribute('tabindex', 0)
          if (!isInit && this.$refs.vueSlickCarousel.$el.contains(document.activeElement) && document.activeElement.nodeName !== 'BUTTON') {
            el.focus()
          }
        } else {
          slide.setAttribute('aria-selected', 'false')
          el.setAttribute('tabindex', -1)
        }
      })

      const dots = this.$refs?.vueSlickCarousel?.$el
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
    handleDotsWrapper () {
      const dotsWrapper = this.$refs?.vueSlickCarousel?.$el
        ?.getElementsByClassName('slick-dots')
        ?.item(0)
      const moreLinkEl = this.$refs?.moreLink?.$el || this.$refs?.moreLink

      if (dotsWrapper || moreLinkEl) {
        // Add wrapper.
        const wrapper = document.createElement('div')
        wrapper.className =
          'wrapper--slick-dots mt-6 flex flex-col sm:flex-row items-center sm:justify-start space-y-4 sm:space-y-0'
        if (dotsWrapper) {
          dotsWrapper.parentNode.insertBefore(wrapper, dotsWrapper)
        } else {
          moreLinkEl.parentNode.insertBefore(wrapper, moreLinkEl)
        }

        // Add elements to the wrapper.
        if (dotsWrapper) {
          wrapper.appendChild(dotsWrapper)
        }
        if (moreLinkEl) {
          wrapper.appendChild(moreLinkEl)
        }
      }
    },
    onBeforeChange (event, slick, currentSlide, nextSlide) {
      if (this.$refs.vueSlickCarousel.autoplay) {
        this.$refs.vueSlickCarousel.pause()
      }
    },
    onAfterChange () {
      this.handleAccessibility()

      if (this.$refs.vueSlickCarousel.autoplay) {
        this.$refs.vueSlickCarousel.play()
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.slick-slider {
  :deep(.slick-slide) {
    height: auto !important;
  }

  :deep(.slick-list) {
    overflow: visible;
  }

  :deep(.slick-track) {
    @apply space-x-[16px] sm:space-x-[30px] flex items-stretch;
    > div > div {
      height: 100%;
    }
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
    @apply text-center sm:text-left bottom-0 w-auto flex-none sm:mr-8;
    > li {
      @apply w-auto h-auto my-0 mx-2;
      > button {
        @apply transition;
        width: 14px;
        height: 14px;
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
      &.slick-active > button {
        color: #696974 !important;
      }
    }
    @screen xl {
      display: none !important;
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
</style>
