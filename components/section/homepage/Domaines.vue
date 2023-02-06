<template>
  <section class="py-16 bg-white overflow-hidden">
    <div class="container mx-auto px-8 sm:px-4 ">
      <div class="mx-auto max-w-6xl">
        <div class="flex justify-between items-baseline mb-12">
          <Heading :id="`label-domaines-action-${_uid}`" as="h2" size="2xl" class="text-center md:text-left">
            Trouvez votre domaine d'action
          </Heading>
          <p class="hidden md:block ml-4 text-[32px] xl:text-[40px] text-[#A7A7B0]">
            #jeveuxaider
          </p>
        </div>

        <Slideshow
          :slides-are-links="true"
          :slides-count="domaines.length"
          :aria-labelledby="`label-domaines-action-${_uid}`"
        >
          <nuxt-link
            v-for="domaine in domaines"
            :key="domaine.id"
            class="card--domaine--wrapper"
            :to="`/domaines-action/${domaine.slug}`"
          >
            <CardDomaine :domaine="domaine" class="!h-full" />
          </nuxt-link>
        </Slideshow>
      </div>
    </div>
  </section>
</template>

<script>
import CardDomaine from '@/components/card/CardDomaine'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    CardDomaine,
    Heading
  },
  data () {
    return {
      domaines: [
        {
          id: 9,
          name: 'Éducation pour tous',
          slug: 'education-pour-tous',
          description: 'Faites du savoir une chance pour tous',
          image:
            '/images/domaines/card_domaine_education.webp, /images/domaines/card_domaine_education@2x.webp 2x, /images/domaines/card_domaine_education.jpg, /images/domaines/card_domaine_education@2x.jpg 2x',
          bottom: true
        },
        {
          id: 1,
          name: 'Santé pour tous',
          slug: 'sante-pour-tous',
          description:
            'Soutenez les personnes malades et leurs proches',
          image:
            '/images/domaines/card_domaine_sante.webp, /images/domaines/card_domaine_sante@2x.webp 2x, /images/domaines/card_domaine_sante.jpg, /images/domaines/card_domaine_sante@2x.jpg 2x',
          bottom: true
        },
        {
          id: 10,
          name: 'Protection de la nature',
          slug: 'protection-de-la-nature',
          description:
            'Contribuez à la préservation de l’environnement',
          image:
            '/images/domaines/card_domaine_nature.webp, /images/domaines/card_domaine_nature@2x.webp 2x, /images/domaines/card_domaine_nature.jpg, /images/domaines/card_domaine_nature@2x.jpg 2x',
          bottom: true
        },
        {
          id: 7,
          name: 'Solidarité et insertion',
          slug: 'solidarite-et-insertion',
          description:
            'Venez en aide aux personnes exclues, fragiles et isolées',
          image:
            '/images/domaines/card_domaine_solidarite.webp, /images/domaines/card_domaine_solidarite@2x.webp 2x, /images/domaines/card_domaine_solidarite.jpg, /images/domaines/card_domaine_solidarite@2x.jpg 2x',
          bottom: true
        },
        {
          id: 4,
          name: 'Sport pour tous',
          slug: 'sport-pour-tous',
          description: 'Contribuez à rendre la pratique sportive accessible à tous',
          image:
            '/images/domaines/card_domaine_sport.webp, /images/domaines/card_domaine_sport@2x.webp 2x, /images/domaines/card_domaine_sport.jpg, /images/domaines/card_domaine_sport@2x.jpg 2x',
          bottom: true
        },
        {
          id: 2,
          name: 'Prévention et protection',
          slug: 'prevention-et-protection',
          description: 'Engagez-vous pour secourir, protéger et sensibiliser',
          image:
            '/images/domaines/card_domaine_prevention.webp, /images/domaines/card_domaine_prevention@2x.webp 2x, /images/domaines/card_domaine_prevention.jpg, /images/domaines/card_domaine_prevention@2x.jpg 2x',
          bottom: true
        },
        {
          id: 8,
          name: 'Mémoire et citoyenneté',
          slug: 'memoire-et-citoyennete',
          description: 'Participez à l’effort de mémoire et aux initiatives citoyennes',
          image:
            '/images/domaines/card_domaine_memoire.webp, /images/domaines/card_domaine_memoire@2x.webp 2x, /images/domaines/card_domaine_memoire.jpg, /images/domaines/card_domaine_memoire@2x.jpg 2x',
          bottom: true
        },
        {
          id: 6,
          name: 'Coopération internationale',
          slug: 'cooperation-internationale',
          description: 'Mobilisez-vous pour la coopération internationale',
          image:
            '/images/domaines/card_domaine_cooperation.webp, /images/domaines/card_domaine_cooperation@2x.webp 2x, /images/domaines/card_domaine_cooperation.jpg, /images/domaines/card_domaine_cooperation@2x.jpg 2x',
          bottom: true
        },
        {
          id: 3,
          name: 'Art & Culture pour tous',
          slug: 'art-et-culture-pour-tous',
          description: 'Faites vivre les initiatives culturelles près de chez vous',
          image:
            '/images/domaines/card_domaine_art.webp, /images/domaines/card_domaine_art@2x.webp 2x, /images/domaines/card_domaine_art.jpg, /images/domaines/card_domaine_art@2x.jpg 2x',
          bottom: true
        },
        {
          id: 11,
          name: 'Bénévolat de compétences',
          slug: 'benevolat-de-competences',
          description: 'Mettez vos savoir-faire au service des autres',
          image:
            '/images/domaines/card_domaine_benevolat_competences.webp, /images/domaines/card_domaine_benevolat_competences@2x.webp 2x, /images/domaines/card_domaine_benevolat_competences.jpg, /images/domaines/card_domaine_benevolat_competences@2x.jpg 2x',
          bottom: true
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.card--domaine--wrapper {
  width: calc(100vw - 64px)!important;
  max-width: 360px;
}

:deep(.slick-slider) {
  .slick-arrow {
    &.slick-prev {
      @apply translate-x-[-104px];
    }
    &.slick-next {
      @apply translate-x-[104px];
    }
  }
}
</style>
