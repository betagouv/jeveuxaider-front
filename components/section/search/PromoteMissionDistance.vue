<template>
  <nuxt-link
    to="/missions-benevolat?type=Mission à distance"
    class="banner-remote relative h-auto flex flex-col flex-1 bg-white overflow-hidden cursor-pointer group text-shadow"
  >
    <img
      src="/images/missions/banner_a_distance.jpg"
      srcset="/images/missions/banner_a_distance@2x.jpg 2x"
      alt="Engagez-vous à distance"
      class="background absolute object-cover w-full h-full transition duration-300 ease-in-out group-hover:scale-105"
    >

    <div
      class="foreground text-white relative flex flex-col h-full items-center text-center justify-between px-4 py-12"
    >
      <img
        src="/images/icons/computer.svg"
        alt=""
        class="my-4"
      >
      <div
        class="text-3xl font-bold mb-4"
      >
        Engagez-vous<br>à distance
      </div>
      <div class="text-xl">
        Près de 1000 missions de télébénévolat disponibles
      </div>

      <Button type="tertiary-no-outline" class="mt-4">
        Missions à distance
      </Button>
    </div>
  </nuxt-link>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  }
}
</script>

<style lang="postcss" scoped>
.text-shadow {
  text-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25),
    0px 4px 30px rgba(0, 0, 0, 0.85);
}
</style>
