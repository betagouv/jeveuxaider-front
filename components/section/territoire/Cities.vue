<template>
  <section class="section-cities bg-[#fafaff]">
    <div class="container px-4 mx-auto pb-24" :class="[{ 'pb-0': !cities.length }]">
      <template v-if="cities.length">
        <div class="text-4xl font-extrabold text-center">
          <h2
            class="text-3xl lg:text-4xl leading-none font-extrabold tracking-[-1px] lg:tracking-[-2px]"
          >
            Engagez-vous près de chez vous
          </h2>
        </div>

        <div class="mt-12 flex flex-wrap gap-4 items-center justify-center">
          <nuxt-link
            no-prefetch
            v-for="city in cities"
            :key="city.zipcode"
            class="leading-none truncate px-8 py-4 rounded-full text-sm shadow-md font-extrabold tracking-wide uppercase bg-white text-gray-800 transform transition hover:scale-105"
            :to="`/missions-benevolat?type=Mission en présentiel&aroundLatLng=${city.coordonates}&city=${city.name}&aroundRadius=35000`"
          >
            {{ city.name }}
          </nuxt-link>
        </div>
      </template>
    </div>

    <hr class="opacity-25" />
  </section>
</template>

<script>
export default defineNuxtComponent({
  props: {
    territoire: {
      type: Object,
      required: true,
    },
    cities: {
      type: Array,
      required: true,
    },
  },
})
</script>
