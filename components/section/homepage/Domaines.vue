<template>
  <section class="py-16 bg-white overflow-hidden">
    <div class="container mx-auto px-8 sm:px-4 xl:max-w-[1412px]">
      <div class="mx-auto max-w-[1170px]">
        <div class="flex justify-between items-baseline mb-6">
          <h2
            class="text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight text-center md:text-left"
          >
            Trouvez votre
            <strong class="font-extrabold">domaine d'action</strong>
          </h2>
          <span
            class="hidden md:block ml-4 text-[32px] xl:text-[40px] text-[#A7A7B0] font-light"
          >
            #jeveuxaider
          </span>
        </div>

        <Slideshow :slides-are-links="true" :slides-count="domaines.length">
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
import Slideshow from '@/components/advanced/Slideshow'
import CardDomaine from '@/components/card/Domaine'

export default {
  components: {
    Slideshow,
    CardDomaine
  },
  data () {
    return {
      domaines: [
        {
          id: 2,
          name: 'Éducation pour tous',
          slug: 'education-pour-tous',
          description: 'Mobilisez-vous pour l\'éducation',
          image:
            '/images/domaines/card_domaine_education.webp, /images/domaines/card_domaine_education@2x.webp 2x, /images/domaines/card_domaine_education.jpg, /images/domaines/card_domaine_education@2x.jpg 2x',
          bottom: true
        },
        {
          id: 3,
          name: 'Santé pour tous',
          slug: 'sante-pour-tous',
          description:
            'Venez en aide aux malades, à leurs proches ou aux soignants',
          image:
            '/images/domaines/card_domaine_sante.webp, /images/domaines/card_domaine_sante@2x.webp 2x, /images/domaines/card_domaine_sante.jpg, /images/domaines/card_domaine_sante@2x.jpg 2x',
          bottom: true
        },
        {
          id: 4,
          name: 'Protection de la nature',
          slug: 'protection-de-la-nature',
          description:
            'Aidez les associations locales à protéger l’environnement',
          image:
            '/images/domaines/card_domaine_nature.webp, /images/domaines/card_domaine_nature@2x.webp 2x, /images/domaines/card_domaine_nature.jpg, /images/domaines/card_domaine_nature@2x.jpg 2x',
          bottom: true
        },
        {
          id: 6,
          name: 'Solidarité et insertion',
          slug: 'solidarite-et-insertion',
          description:
            'Venez en aide aux plus démunis et aux personnes isolées',
          image:
            '/images/domaines/card_domaine_solidarite.webp, /images/domaines/card_domaine_solidarite@2x.webp 2x, /images/domaines/card_domaine_solidarite.jpg, /images/domaines/card_domaine_solidarite@2x.jpg 2x',
          bottom: true
        },
        {
          id: 7,
          name: 'Sport pour tous',
          slug: 'sport-pour-tous',
          description: 'Mobilisez-vous pour le sport',
          image:
            '/images/domaines/card_domaine_sport.webp, /images/domaines/card_domaine_sport@2x.webp 2x, /images/domaines/card_domaine_sport.jpg, /images/domaines/card_domaine_sport@2x.jpg 2x',
          bottom: true
        },
        {
          id: 8,
          name: 'Prévention et protection',
          slug: 'prevention-et-protection',
          description: 'Mobilisez-vous pour la prévention et la protection civile',
          image:
            '/images/domaines/card_domaine_prevention.webp, /images/domaines/card_domaine_prevention@2x.webp 2x, /images/domaines/card_domaine_prevention.jpg, /images/domaines/card_domaine_prevention@2x.jpg 2x',
          bottom: true
        },
        {
          id: 9,
          name: 'Mémoire et citoyenneté',
          slug: 'memoire-et-citoyennete',
          description: 'Mobilisez-vous pour la mémoire et la citoyenneté',
          image:
            '/images/domaines/card_domaine_memoire.webp, /images/domaines/card_domaine_memoire@2x.webp 2x, /images/domaines/card_domaine_memoire.jpg, /images/domaines/card_domaine_memoire@2x.jpg 2x',
          bottom: true
        },
        {
          id: 10,
          name: 'Coopération internationale',
          slug: 'cooperation-internationale',
          description: 'Mobilisez-vous pour la coopération internationale',
          image:
            '/images/domaines/card_domaine_cooperation.webp, /images/domaines/card_domaine_cooperation@2x.webp 2x, /images/domaines/card_domaine_cooperation.jpg, /images/domaines/card_domaine_cooperation@2x.jpg 2x',
          bottom: true
        },
        {
          id: 11,
          name: 'Art & Culture pour tous',
          slug: 'art-culture-pour-tous',
          description: 'Mobilisez-vous pour l\'art et la culture',
          image:
            '/images/domaines/card_domaine_art.webp, /images/domaines/card_domaine_art@2x.webp 2x, /images/domaines/card_domaine_art.jpg, /images/domaines/card_domaine_art@2x.jpg 2x',
          bottom: true
        },
        {
          id: 1,
          name: 'Mobilisation Covid-19',
          slug: 'mobilisation-covid-19',
          description: 'Mobilisez-vous pour la lutte contre la Covid-19',
          image:
            '/images/domaines/card_domaine_covid19.webp, /images/domaines/card_domaine_covid19@2x.webp 2x, /images/domaines/card_domaine_covid19.jpg, /images/domaines/card_domaine_covid19@2x.jpg 2x',
          bottom: true
        }
      ]
    }
  }
}
</script>

<style>

</style>
