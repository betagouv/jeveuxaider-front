<template>
  <section class="py-16 bg-gray-50 overflow-hidden">
    <div class="container mx-auto px-4 relative ">
      <div class="mx-auto max-w-6xl">
        <Heading as="h2" size="2xl" class="mb-12">
          Engagez-vous près de chez vous
        </Heading>

        <div
          class="max-w-3xl lg:max-w-[500px] mx-auto lg:ml-0 flex flex-wrap gap-4 items-center justify-center lg:justify-start"
        >
          <nuxt-link
            v-for="(city, index) in cities"
            :key="index"
            :to="city.url"
            class="rounded-full"
          >
            <Tag
              context="clickable"
              size="md"
              :icon="index === cities.length - 1 ? 'RiAddLine' : null"
              :icon-only="index === cities.length - 1 ? true : false"
            >
              {{ city.name }}
            </Tag>
          </nuxt-link>
        </div>
      </div>

      <div
        class="bg-white mt-16 text-center md:text-left overflow-hidden lg:max-w-[660px] xl:ml-[56px] border border-[#E5E5E5]"
      >
        <div class="flex flex-col items-center md:flex-row md:items-end">
          <div class="px-6 pt-8 md:pt-0 md:pb-12 md:pl-12 md:pr-0 z-10">
            <Heading as="h2" size="2xl">
              Ou à distance
            </Heading>

            <div class="mt-4 text-xl text-[#696974]">
              Plus de 1 000 missions de bénévolat sont réalisables en
              autonomie
            </div>

            <Button size="lg" class="mt-8" @click="$router.push('/missions-benevolat?type=Mission à distance')">
              Découvrir le télébénévolat
            </Button>
          </div>

          <img
            src="/images/homepage/telebenevolat.svg"
            alt="Télébénévolat"
            class="-mt-16 md:mt-0 md:mr-[-97px] z-0"
            width="379"
            height="292"
            data-not-lazy
          >
        </div>
      </div>

      <img
        src="/images/homepage/map_france_2.svg"
        alt="Carte de la France"
        class="hidden lg:block absolute top-0 right-0 mr-[-180px] xl:-mr-0 pr-4 h-full"
        width="607"
        height="624"
        style="filter: drop-shadow(8px 20px 16px rgba(0, 0, 0, 0.1))"
      >
    </div>
  </section>
</template>

<script>
import Tag from '@/components/dsfr/Tag.vue'
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Tag,
    Heading,
    Button
  },
  data () {
    return {
      cities: [
        {
          name: 'Paris',
          url: '/villes/paris'
        },
        {
          name: 'Toulouse',
          url: '/villes/toulouse'
        },
        {
          name: 'Lyon',
          url: '/villes/lyon'
        },
        {
          name: 'Marseille',
          url: '/villes/marseille'
        },
        {
          name: 'Bordeaux',
          url: '/villes/bordeaux'
        },
        {
          name: 'Lille',
          url: '/villes/lille'
        },
        {
          name: 'Rennes',
          url: '/villes/rennes'
        },
        {
          name: 'Montpellier',
          url: '/villes/montpellier'
        },
        {
          name: 'Strasbourg',
          url: '/villes/strasbourg'
        },
        {
          name: 'Nice',
          url: '/villes/nice'
        },
        {
          name: 'Rouen',
          url: '/villes/rouen'
        },
        {
          name: 'Angers',
          url: '/villes/angers'
        },
        {
          name: '+',
          url: '/territoires'
        }
      ]
    }
  }
}
</script>

<style>

</style>
