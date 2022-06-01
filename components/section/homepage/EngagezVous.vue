<template>
  <section class="py-16 bg-gray-50 overflow-hidden">
    <div class="container mx-auto px-4 relative xl:max-w-[1412px]">
      <div class="mx-auto max-w-6xl">
        <h2
          class="text-4xl lg:text-[50px] lg:leading-[42px] tracking-tight text-center lg:text-left"
        >
          Engagez-vous
          <strong class="font-extrabold">près de chez vous</strong>
        </h2>

        <div
          class="mt-12 max-w-3xl lg:max-w-[500px] mx-auto lg:ml-0 flex flex-wrap gap-4 items-center justify-center lg:justify-start"
        >
          <nuxt-link
            v-for="(city, index) in cities"
            :key="city.name"
            class="text-[#696974] leading-none truncate px-[18px] h-[40px] flex items-center rounded-full text-[13px] shadow-md font-extrabold tracking-wide uppercase bg-white transform transition will-change-transform hover:scale-110"
            :class="[
              {
                'w-[40px] h-[40px] !p-0 flex items-center justify-center text-[26px] font-normal':
                  index == cities.length - 1,
              },
            ]"
            :to="city.url"
          >
            <template v-if="index != cities.length - 1">
              {{ city.name }}
            </template>

            <img
              v-else
              src="/images/icons/more.svg"
              alt="Voir plus de villes"
              width="13"
              height="13"
              data-not-lazy
            >
          </nuxt-link>
        </div>
      </div>

      <div
        class="bg-white mt-16 text-center md:text-left rounded-[10px] overflow-hidden lg:max-w-[660px] xl:ml-[56px]"
        style="box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05)"
      >
        <div class="flex flex-col items-center md:flex-row md:items-end">
          <div class="px-6 pt-8 md:pt-0 md:pb-12 md:pl-12 md:pr-0">
            <h2
              class="text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight"
            >
              Ou <strong class="font-extrabold">à distance</strong>
            </h2>

            <div class="mt-4 text-xl text-[#696974]">
              Plus de 1 000 missions de bénévolat sont réalisables en
              autonomie
            </div>

            <nuxt-link
              class="rounded-full text-white bg-jva-green-500 hover:scale-105 !outline-none focus:scale-105 transition px-8 py-3 transform will-change-transform shadow-xl font-bold inline-flex mt-8"
              to="/missions-benevolat?type=Mission à distance"
            >
              <span>Découvrir le télébénévolat</span>
            </nuxt-link>
          </div>

          <img
            src="/images/homepage/telebenevolat.svg"
            alt="Télébénévolat"
            class="-mt-16 md:mt-0 md:mr-[-97px]"
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
export default {
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
