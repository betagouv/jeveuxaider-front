<template>
  <BaseBox
    v-if="mission.type == 'Mission en présentiel' && mission.addresses.length > 0"
    :padding="false"
    class="overflow-hidden"
  >
    <iframe
      width="100%"
      height="100%"
      style="border: 0; min-height: 190px"
      loading="lazy"
      allowfullscreen
      :src="`https://www.google.com/maps/embed/v1/place?key=${googlePlacesKey}&q=${googleQuery}`"
    />
    <div class="text-sm px-6 xl:px-16 py-6">
      <div class="text-gray-800 uppercase font-bold">
        <span>Mission sur le terrain</span>
      </div>
      <!-- <p v-if="mission.is_autonomy" class="text-[#666666] mt-1 mb-1">
        Cette mission peut être réalisée sans l’encadrement du responsable de mission.
        <span v-if="mission.autonomy_zips.length > 1">Elle est proposée sur plusieurs lieux.</span>
      </p> -->
      <div class="text-[#727273]">
        <div class="old-line-clamp-1">
          <span class="relative left-[-3px]">📍</span>
          <span>{{ mission.addresses.map((a) => a.label).join(', ') }}</span>
        </div>
        <div v-if="mission.addresses_precisions">
          <span class="font-bold">Précisions sur la zone d’intervention&nbsp;: </span>
          <span>{{
            $filters.decodeHTMLEntities($filters.stripHTML(mission.addresses_precisions))
          }}</span>
        </div>
      </div>
    </div>
  </BaseBox>

  <BaseBox v-else class="relative overflow-hidden" :padding="false">
    <img
      src="/images/missions/mission_a_distance.jpg"
      srcset="/images/missions/mission_a_distance@2x.jpg 2x"
      alt="Personne assise devant un ordinateur portable"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <div class="absolute inset-0 custom-gradient" />

    <div class="text-white relative px-6 xl:px-16 py-12 text-shadow">
      <div class="font-extrabold text-2xl mb-2">Mission à distance</div>
      <div>
        Réalisez cette mission de bénévolat<br />
        <strong>depuis chez vous</strong>
      </div>
    </div>
  </BaseBox>
</template>

<script>
export default defineNuxtComponent({
  async setup() {
    const runtimeConfig = useRuntimeConfig()

    return {
      googlePlacesKey: runtimeConfig.public.google.places,
    }
  },
  props: {
    mission: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // address() {
    //   if (this.mission.full_address) {
    //     return this.mission.full_address
    //   }
    //   if (this.mission.zip) {
    //     return this.mission.zip
    //   }
    //   return null
    // },
    // autonomyCities() {
    //   const { formatAutonomyCities } = autonomyCitiesHelper()
    //   return formatAutonomyCities(this.mission.autonomy_zips)
    // },
    googleQuery() {
      return this.mission.addresses[0]?.label
    },
  },
})
</script>

<style lang="postcss" scoped>
.custom-gradient {
  background: linear-gradient(225deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.7) 100%);
}

.text-shadow {
  text-shadow: 0px 4px 14px rgb(0 0 0 / 25%), 0px 4px 30px rgb(0 0 0 / 40%);
}
</style>
