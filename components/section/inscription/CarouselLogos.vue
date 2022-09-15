<template>
  <client-only>
    <Slideshow :slides-count="logos.length" class="mt-12" :settings="settings" :add-dots-wrapper="false">
      <div
        v-for="logo,index in logos"
        :key="index"
        class="px-8 m-auto !flex h-full"
      >
        <img
          :src="logo.src"
          :srcset="logo.srcset"
          :alt="logo.alt"
          class="flex-none max-w-[150px] max-h-[60px] object-contain"
          data-not-lazy
        >
      </div>
    </Slideshow>
  </client-only>
</template>

<script>
export default {
  data () {
    return {
      settings: {
        arrows: false,
        dots: true,
        speed: 750,
        edgeFriction: 0,
        touchThreshold: 100,
        swipeToSlide: true,
        infinite: true,
        variableWidth: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        centerMode: false,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToScroll: 1,
              slidesToShow: 1
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToScroll: 1,
              slidesToShow: 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToScroll: 1,
              slidesToShow: 1,
              speed: 750
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToScroll: 1,
              slidesToShow: 1,
              dots: false,
              speed: 750
            }
          }
        ]
      },
      logos: [
        {
          alt: 'Article1',
          src: '/images/inscription/logo_article1.png'
        },
        {
          alt: 'APHP',
          src: '/images/inscription/logo_aphp.png'
        },
        {
          alt: 'Emmaus',
          src: '/images/inscription/logo_emmaus.png'
        },
        {
          alt: 'Banque Alimentaire',
          src: '/images/inscription/logo_banquealimentaire.png'
        },
        {
          alt: "J'agis pour la nature",
          src: '/images/inscription/logo-fnh.png',
          srcset: '/images/inscription/logo-fnh.png, /images/inscription/logo-fnh@2x.png 2x'
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
::v-deep {
  .slick-slider {
    .slick-track {
      @apply !space-x-0 justify-center;
    }

    .slick-dots {
      @apply !text-center mr-0 mt-4 space-x-0;
      > * {
        @apply !mx-2;
      }
      @screen xl {
        display: block !important;
      }
    }
  }

}
</style>
