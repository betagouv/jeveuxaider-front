<template>
  <Box v-if="mission.type == 'Mission en présentiel'" :padding="false" class="overflow-hidden">
    <iframe
      width="100%"
      height="100%"
      style="border: 0; min-height: 190px"
      loading="lazy"
      allowfullscreen
      :src="`https://www.google.com/maps/embed/v1/place?key=${$config.google.places}&q=${mission.full_address}`"
    />
    <div class="text-sm px-6 py-4">
      <span class="font-bold text-gray-800 uppercase">Mission sur le terrain</span> <br>
      📍 <span class="text-gray-500">{{ mission.full_address }}</span>
    </div>
  </Box>

  <Box v-else class="relative" :padding="false">
    <img
      src="/images/missions/mission_a_distance.jpg"
      srcset="/images/missions/mission_a_distance@2x.jpg 2x"
      alt="Personne assise devant un ordinateur portable"
      class="absolute inset-0 w-full h-full object-cover"
    >

    <div class="absolute inset-0 custom-gradient" />

    <div class="text-white relative px-6 xl:px-16 py-8">
      <div class="font-extrabold text-2xl mb-2">
        Mission à distance
      </div>
      <div>
        Réalisez cette mission de bénévolat<br>
        <strong>depuis chez vous</strong> ou
        <strong>en autonomie</strong>
      </div>
    </div>
  </Box>
</template>

<script>
export default {
  props: {
    mission: {
      type: Object,
      required: true
    }
  }
}
</script>
