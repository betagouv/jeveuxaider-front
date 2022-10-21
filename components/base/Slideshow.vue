<template>
  <div>
    <VueSlickCarousel
      ref="vueSlickCarousel"
      v-bind="settings"
      @beforeChange="onBeforeChange"
      @afterChange="onAfterChange"
    >
      <slot />

      <template #prevArrow="arrowOption">
        <transition name="fade">
          <div
            v-show="settings.infinite || arrowOption.currentSlide"
            class="rounded-full !bg-white transition flex justify-center items-center !p-6 relative z-10"
          >
            <img
              src="/images/icons/slideshow_chevron_left.svg"
              alt="Précédent"
              class="absolute inset-0 m-auto"
              data-not-lazy
            >
          </div>
        </transition>
      </template>

      <template #nextArrow="arrowOption">
        <transition name="fade">
          <div
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
          </div>
        </transition>
      </template>

      <template #customPaging>
        <div class="text-sm text-[#DEDEDE]">
          <div>●</div>
        </div>
      </template>
    </VueSlickCarousel>

    <Link v-if="moreLink" ref="moreLink" :to="moreLink.link" class="text-[#696974]">
      {{ moreLink.label }}
    </Link>
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
          variableWidth: true
        }
      }
    }
  },
  mounted () {
    if (this.slidesAreLinks) {
      this.handleSlidesAccessibility()
    }
    if (this.addDotsWrapper) {
      this.handleDotsWrapper()
    }
  },
  methods: {
    handleSlidesAccessibility () {
      const slides = this.$refs.vueSlickCarousel.$el.getElementsByClassName(
        'slick-slide'
      )
      slides.forEach((slide) => {
        slide.removeAttribute('tabindex')
        slide.getElementsByTagName('a').item(0).removeAttribute('tabindex')
      })
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
    }

    :deep(.slick-dots) {
      position: inherit;
      @apply text-center sm:text-left bottom-0 w-auto flex-none sm:mr-8;
      > li {
        @apply w-auto h-auto my-0 mx-2;
        > div {
          @apply transition;
        }
        &.slick-active > div {
          color: #696974;
        }
      }
      @screen xl {
        display: none !important;
      }
    }

}
</style>
