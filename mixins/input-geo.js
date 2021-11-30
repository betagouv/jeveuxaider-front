export default {
  data () {
    return {
      autocompleteOptions: []
    }
  },
  methods: {
    async onFetchGeoSuggestions (value) {
      if (!value) { return [] }
      const { data } = await this.$axios.get('https://api-adresse.data.gouv.fr/search', {
        params: {
          q: value,
          limit: 15
        }
      })

      const formatOptions = data.features.map((option) => {
        return {
          ...option.properties,
          coordinates: option.geometry.coordinates,
          typeLabel: this.$options.filters.label(option.properties.type, 'geoType')
        }
      })
      this.autocompleteOptions = formatOptions
    },
    onInitializedAutocomplete () {
      document.querySelector('#autocomplete-place').focus()
    }
  }
}
