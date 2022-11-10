<template>
  <Box v-if="mission.type == 'Mission en présentiel' && address" :padding="false" class="overflow-hidden">
    <iframe
      width="100%"
      height="100%"
      style="border: 0; min-height: 190px"
      loading="lazy"
      allowfullscreen
      :src="`https://www.google.com/maps/embed/v1/place?key=${$config.google.places}&q=${googleQuery}`"
    />
    <div class="text-sm px-6 py-4">
      <div class="text-gray-800 uppercase">
        <span v-if="mission.is_autonomy">Mission en autonomie</span>
        <span v-else>Mission sur le terrain</span>
      </div>
      <p v-if="mission.is_autonomy" class="text-[#666666] mt-1 mb-1">
        Cette mission peut être réalisée sans l’encadrement du responsable de mission.
        <span v-if="mission.autonomy_zips.length > 1">Elle est proposée sur plusieurs lieux.</span>
      </p>
      <div class="line-clamp-1">
        <span>📍</span>
        <span v-if="mission.is_autonomy">{{ autonomyCities }}</span>
        <span v-else>{{ address }}</span>
      </div>
    </div>
  </Box>

  <Box v-else class="relative overflow-hidden" :padding="false">
    <img
      src="/images/missions/mission_a_distance.jpg"
      srcset="/images/missions/mission_a_distance@2x.jpg 2x"
      alt="Personne assise devant un ordinateur portable"
      class="absolute inset-0 w-full h-full object-cover"
    >

    <div class="absolute inset-0 custom-gradient" />

    <div class="text-white relative px-6 xl:px-16 py-12 text-shadow">
      <div class="font-extrabold text-2xl mb-2">
        Mission à distance
      </div>
      <div>
        Réalisez cette mission de bénévolat<br>
        <strong>depuis chez vous</strong>
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
  },
  computed: {
    address () {
      if (this.mission.full_address) {
        return this.mission.full_address
      }
      if (this.mission.zip) {
        return this.mission.zip
      }
      return null
    },
    autonomyCities () {
      if (this.mission.is_autonomy && this.mission.autonomy_zips.length) {
        return this.mission.autonomy_zips.map((item) => {
          return item.city.includes(' Arrondissement') ? `${item.city.replace(' Arrondissement', '')}` : `${item.city} (${item.zip})`
        }).sort((a, b) => a.localeCompare(b, 'fr', { numeric: true })).join(', ')
      }
      return null
    },
    googleQuery () {
      return this.mission.is_autonomy ? `${this.mission.department} ${this.$options.filters.label(this.mission.department, 'departments')}` : this.address
    }
  }
}
</script>

<style lang="postcss" scoped>
.custom-gradient {
  background: linear-gradient(
    225deg,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

.text-shadow {
  text-shadow: 0px 4px 14px rgb(0 0 0 / 25%), 0px 4px 30px rgb(0 0 0 / 40%);
}
</style>
