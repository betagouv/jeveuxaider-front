export default {
  data() {
    return {
      autocompleteOptions: [],
    }
  },
  computed: {
    safeValue() {},
  },
  methods: {
    async onFetchGeoSuggestions(value) {
      if (!value || value.length < 3) {
        return
      }

      // First character must be a letter or a number to avoid error 400
      var re = new RegExp(/^[a-z0-9]$/i)
      if (!re.test(value[0])) {
        this.autocompleteOptions = []
        return
      }

      const response = await $fetch('https://api-adresse.data.gouv.fr/search', {
        params: {
          q: value,
          limit: 10,
          type: this.inputGeoType || undefined,
        },
      })

      const formatOptions = response.features.map((option) => {
        return {
          ...option.properties,
          coordinates: option.geometry.coordinates,
          typeLabel: this.$filters.label(option.properties.type, 'geoType'),
        }
      })
      this.autocompleteOptions = formatOptions
    },
    onInitializedAutocomplete() {
      if (!this.$route.query.place) {
        document.querySelector('#autocomplete-place')?.focus()
      }
    },
    clearAddress() {
      this.form.address = null
      this.form.zip = null
      this.form.city = null
      this.form.latitude = null
      this.form.longitude = null
    },
    handleSelectedGeo(item) {
      if (!item) {
        this.clearAddress()
        return
      }
      this.form.address = item.name != item.city ? item.name : null
      this.form.zip = item.postcode
      this.form.city = item.city
      this.form.latitude = item.coordinates[1]
      this.form.longitude = item.coordinates[0]
      this.validate('address')
    },
  },
}
