<template>
  <nuxt-link
    to="/missions-benevolat?type=Mission à distance"
    class="banner-remote relative h-auto flex flex-col flex-1 bg-white rounded-lg overflow-hidden cursor-pointer group"
  >
    <img
      src="/images/missions/banner_a_distance.jpg"
      srcset="/images/missions/banner_a_distance@2x.jpg 2x"
      alt="Engagez-vous à distance"
      class="background absolute object-cover w-full h-full transition duration-300 ease-in-out"
    >

    <div
      class="foreground text-white relative flex flex-col h-full items-center text-center px-4 py-8"
    >
      <img
        src="/images/icons/computer.svg"
        alt="Télébénévolat"
        class="my-4"
      >
      <div
        class="text-3xl font-extrabold leading-none mb-4"
      >
        Engagez-vous<br>à distance
      </div>
      <div class="text-xl font-bold mt-auto">
        Près de 1000 missions de télébénévolat disponibles
      </div>

      <div
        class="text-center px-4 py-2 rounded-full text-white shadow-md cursor-pointer bg-jva-green group-hover:bg-[#0e9f6e] transition mt-6 font-extrabold inline-flex justify-center items-center"
        style="width: 212px; height: 45px"
      >
        Missions à distance
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {

}
</script>

<style>

</style>
