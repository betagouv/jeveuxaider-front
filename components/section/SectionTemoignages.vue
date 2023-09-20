<template>
  <div class="relative bg-[#6A6AF4] overflow-hidden">
    <div class="container py-12 xl:pt-24 xl:pb-16">
      <div class="lg:flex lg:justify-between lg:items-center lg:gap-6 xl:gap-8">
        <div class="">
          <DsfrHeading as="h2" size="alt-sm" class="mb-6 md:mb-2" color="text-white">
            Ils ont été bénévoles chez nous
          </DsfrHeading>
          <p id="label-slideshow-temoignages" class="text-white text-xl xl:text-2xl">
            Découvrez les témoignages des bénévoles de la communauté JeVeuxAider.gouv.fr
          </p>
        </div>
        <div class="hidden lg:block flex-none">
          <div id="slideshowTemoignagesArrows" />
        </div>
      </div>
      <div v-if="testimonials.length" class="mt-12">
        <BaseSlideshow
          :key="slideshowTemoignagesKey"
          navigation-id="slideshowTemoignagesArrows"
          navigation-variant="white"
          navigation-button-class="hover:bg-[#6666EA]"
          aria-labelledby="label-slideshow-temoignages"
          dots-variant="light"
        >
          <swiper-slide v-for="(testimony, i) in testimonials" :key="i">
            <CardTestimony :testimony="testimony" />
          </swiper-slide>
        </BaseSlideshow>
      </div>
    </div>

    <div class="flex justify-center">
      <img
        aria-hidden="true"
        srcset="
          /images/home/temoignages.webp,
          /images/home/temoignages@2x.webp 2x,
          /images/home/temoignages.png,
          /images/home/temoignages@2x.png  2x
        "
        src="/images/home/temoignages.png"
        alt=""
        width="1754"
        height="238"
        class="h-[110px] w-[818px] md:h-[119px] md:w-[877px] lg:h-[132px] lg:w-[976px] xl:h-[238px] xl:w-[1754px] mx-auto object-cover object-top pointer-events-none select-none"
      />
    </div>
  </div>
</template>

<script>
import CardTestimony from '@/components/card/CardTestimony.vue'

export default defineNuxtComponent({
  components: {
    CardTestimony,
  },
  props: {
    testimonials: {
      type: Array,
      default: () => [],
    },
    logo: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isSlideshowAdaptativeHeight: true,
      slideshowTemoignagesKey: 0,
    }
  },
  mounted() {
    // @todo
    this.slideshowTemoignagesKey++
  },
})
</script>

<style lang="postcss" scoped>
:deep(swiper-slide) {
  width: 100%;
  flex: none;
  max-width: 708px !important;
}

blockquote {
  &::before {
    content: '\00AB ';
  }
  &::after {
    content: ' \00BB';
  }
}
</style>
