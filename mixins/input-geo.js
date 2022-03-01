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
          limit: 10,
          type: this.inputGeoType || undefined
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
      if (!this.$route.query.place) {
        document.querySelector('#autocomplete-place')?.focus()
      }
    },
    clearAddress () {
      this.$set(this.form, 'address', null)
      this.$set(this.form, 'zip', null)
      this.$set(this.form, 'city', null)
      this.$set(this.form, 'latitude', null)
      this.$set(this.form, 'longitude', null)
      // this.$set(this.form, 'department', null)
      // this.form.address = ''
      // this.form.zip = ''
      // this.form.city = ''
      // this.form.latitude = ''
      // this.form.longitude = ''
      // this.form.department = ''
    },
    handleSelectedGeo (item) {
      if (!item) {
        this.clearAddress()
        return
      }
      this.$set(this.form, 'address', item.name != item.city ? item.name : null)
      this.$set(this.form, 'zip', item.postcode)
      this.$set(this.form, 'city', item.city)
      this.$set(this.form, 'latitude', item.coordinates[1])
      this.$set(this.form, 'longitude', item.coordinates[0])
      this.validate('address')
    }
  }
}
