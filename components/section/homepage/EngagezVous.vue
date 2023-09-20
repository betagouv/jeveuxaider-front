<template>
  <section class="py-16 bg-gray-50 overflow-hidden">
    <div class="container mx-auto px-4 relative">
      <div class="mx-auto max-w-6xl">
        <DsfrHeading as="h2" size="2xl" class="mb-12"> Engagez-vous près de chez vous </DsfrHeading>

        <div
          class="max-w-3xl lg:max-w-[500px] mx-auto lg:ml-0 flex flex-wrap gap-4 items-center justify-center lg:justify-start"
        >
          <nuxt-link
            v-for="(city, index) in cities"
            :key="index"
            :to="city.url"
            :title="city.title || undefined"
            :target="city.target || undefined"
            class="rounded-full"
          >
            <DsfrTag
              context="clickable"
              size="md"
              :icon="index === cities.length - 1 ? 'RiAddLine' : null"
              :icon-only="index === cities.length - 1 ? true : false"
            >
              {{ city.name }}
            </DsfrTag>
          </nuxt-link>
        </div>
      </div>

      <div
        class="bg-white mt-16 text-center md:text-left overflow-hidden lg:max-w-[660px] xl:ml-[56px] border border-[#E5E5E5]"
      >
        <div class="flex flex-col items-center md:flex-row md:items-end">
          <div class="px-6 pt-8 md:pb-12 md:pl-12 md:pr-0 z-10">
            <DsfrHeading as="h2" size="2xl"> Ou à distance </DsfrHeading>

            <div class="mt-4 text-lg sm:text-xl text-[#696974]">
              Plus de 1 000 missions de bénévolat
              <br class="hidden sm:block md:hidden" />
              sont réalisables en autonomie
            </div>

            <DsfrButton
              size="lg"
              class="mt-8"
              @click="$router.push('/missions-benevolat?type=Mission à distance')"
            >
              Découvrir le télébénévolat
            </DsfrButton>
          </div>

          <img
            src="/images/homepage/telebenevolat.svg"
            alt=""
            class="-mt-16 md:mt-0 md:mr-[-97px] z-0"
            width="379"
            height="292"
            data-not-lazy
          />
        </div>
      </div>

      <img
        src="/images/homepage/map_france_2.svg"
        alt=""
        class="hidden lg:block absolute top-0 right-0 mr-[-180px] xl:-mr-0 pr-4 h-full"
        width="607"
        height="624"
        style="filter: drop-shadow(8px 20px 16px rgba(0, 0, 0, 0.1))"
      />
    </div>
  </section>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {
      cities: [
        {
          name: 'Paris',
          url: '/villes/paris',
        },
        {
          name: 'Toulouse',
          url: '/villes/toulouse',
        },
        {
          name: 'Lyon',
          url: '/villes/lyon',
        },
        {
          name: 'Marseille',
          url: '/villes/marseille',
        },
        {
          name: 'Bordeaux',
          url: '/villes/bordeaux',
        },
        {
          name: 'Lille',
          url: '/villes/lille',
        },
        {
          name: 'Rennes',
          url: '/villes/rennes',
        },
        {
          name: 'Montpellier',
          url: '/villes/montpellier',
        },
        {
          name: 'Strasbourg',
          url: '/villes/strasbourg',
        },
        {
          name: 'Nice',
          url: '/villes/nice',
        },
        {
          name: 'Rouen',
          url: '/villes/rouen',
        },
        {
          name: 'Angers',
          url: '/villes/angers',
        },
        {
          name: '+',
          url: '/territoires',
          target: '_blank',
          title: 'Voir tous les territoires engagés',
        },
      ],
    }
  },
})
</script>
