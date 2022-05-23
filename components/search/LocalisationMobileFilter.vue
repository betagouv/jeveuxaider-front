<template>
  <div>
    <div class="group flex justify-between items-end cursor-pointer" @click="$emit('open')">
      <div>
        <div class="text-gray-500 mb-1">
          Localisation
        </div>
        <div class="flex space-x-2 items-center text-gray-900">
          <template v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'">
            <LocationMarkerIcon class="h-5 w-5" />
            <div v-if="ipLatLng">
              Près de chez moi <span v-if="ipCity">({{ ipCity }})</span>
            </div>
            <div v-else>
              {{ $route.query.city }}
            </div>
          </template>
          <template v-else>
            <DesktopComputerIcon class="h-5 w-5" />
            <div>Depuis chez moi</div>
          </template>
        </div>
      </div>
      <PencilIcon class="text-gray-500 h-4 w-4 group-hover:text-gray-900 mb-1" />
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    ipLatLng: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      ipCity: null
    }
  },
  computed: {

  },
  watch: {

  },
  async mounted () {
    if (this.ipLatLng) {
      const [lat, lng] = this.ipLatLng.split(',')
      const res = await this.$axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${lng}&lat=${lat}`)
      this.ipCity = res.data?.features[0]?.properties?.city
    }
  },
  methods: {

  }
}
</script>
