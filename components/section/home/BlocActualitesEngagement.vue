<template>
  <div class="bg-white py-12 xl:py-24 overflow-hidden">
    <div class="container">
      <div class="">
        <div>
          <DsfrHeading id="label-slideshow-articles" as="h2" size="alt-sm" class="mb-6 md:mb-2">
            Les actualités de l’engagement
          </DsfrHeading>
          <p class="text-[#4D4D4D] text-xl xl:text-2xl">
            Restez informé de l'actualité de tous ceux qui font vivre l'engagement en France
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:divide-x mt-8 lg:mt-14">
        <a
          href="https://www.jeveuxaider.gouv.fr/engagement/mesure-dimpact/"
          target="_blank"
          @click="onClickMesureImpact"
          class="card--article"
        >
          <div class="thumbnail--wrapper">
            <img
              srcset="
                /images/home/mesure-impact-2023.jpg,
                /images/home/mesure-impact-2023@2x.jpg 2x
              "
              src="/images/home/mesure-impact-2023.jpg"
              alt="Mesure d'impact 2023"
              class="flex-none w-full h-auto"
            />
          </div>

          <DsfrHeading as="h3" size="md" class="mt-8" title="Mesure d’impact 2023">
            Mesure d’impact 2023 : Tout ce que vous avez toujours voulu savoir sur nous, sur vous,
            sur le bénévolat, rassemblé dans un livret aux petits oignons.
          </DsfrHeading>
          <DsfrLink icon="RiArrowRightSLine" class="text-jva-blue-500 mt-6"
            >En savoir plus</DsfrLink
          >
        </a>
        <GridActualitesBlog class="mt-8 lg:mt-0 lg:pl-8" />
      </div>
    </div>
  </div>
</template>

<script>
import GridActualitesBlog from '@/components/section/home/GridActualitesBlog.vue'

export default defineNuxtComponent({
  components: {
    GridActualitesBlog,
  },
  setup() {},
  data() {
    return {}
  },
  created() {},
  methods: {
    onClickMesureImpact() {
      this.$plausible.trackEvent('Homepage - Clique - Mesure d’impact', {
        props: {
          year: 2023,
          isLogged: this.$stores.auth.isLogged,
        },
      })
    },
  },
})
</script>

<style lang="postcss" scoped>
.card--article {
  /* box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.1); */
  @apply transition;
  @screen sm {
    &:hover {
      .thumbnail--wrapper img {
        transform: scale(1.05);
      }
    }
  }
}

.thumbnail--wrapper {
  @screen lg {
    height: 550px;
    @apply bg-gray-200 overflow-hidden;
    img {
      transition: all 0.25s;
    }
  }
}

.custom-gradient {
  background: linear-gradient(183.3deg, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.7) 100%);
}
</style>
