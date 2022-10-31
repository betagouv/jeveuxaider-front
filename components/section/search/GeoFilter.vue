<template>
  <div>
    <div v-show="!showAutocomplete" @click="handleClickLabel()">
      <div v-if="ipLatLng">
        Près de chez moi <span v-if="ipCity">({{ ipCity }})</span>
      </div>
      <div v-else>
        {{ $route.query.city }}
      </div>
    </div>
    <InputAutocomplete
      v-show="showAutocomplete"
      ref="input-autocomplete"
      name="autocomplete-place"
      placeholder="Ex: Paris"
      :value="$route.query.city"
      :options="autocompleteOptions"
      attribute-key="id"
      attribute-label="label"
      attribute-right-label="typeLabel"
      class-options="lg:w-96"
      :min-value-length="3"
      @selected="handleSelectedAdress"
      @fetch-suggestions="onFetchGeoSuggestions"
      @mounted="onInitializedAutocomplete"
    />
  </div>
</template>

<script>
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import inputGeo from '@/mixins/input-geo'

export default {
  mixins: [inputGeo, AlgoliaQueryBuilder],
  props: {
    ipLatLng: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      ipCity: null,
      inputGeoType: 'municipality',
      showAutocomplete: false
    }
  },
  async mounted () {
    if (this.ipLatLng) {
      const [lat, lng] = this.ipLatLng.split(',')
      const res = await this.$axios.get(`https://api-adresse.data.gouv.fr/reverse/?lon=${lng}&lat=${lat}`)
      this.ipCity = res.data?.features[0]?.properties?.city
    }
  },
  methods: {
    handleClickLabel () {
      this.showAutocomplete = true
      this.$nextTick(() => {
        this.$refs['input-autocomplete'].$refs.input.focus()
      })
    },
    handleSelectedAdress (address) {
      if (address === null) {
        this.deleteFilter('aroundLatLng')
      } else {
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, aroundLatLng: `${address.coordinates[1]},${address.coordinates[0]}`, city: address.city, page: undefined }
        })
      }
      this.showAutocomplete = false
    }
  }
}
</script>
