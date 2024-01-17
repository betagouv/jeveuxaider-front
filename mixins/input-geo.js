export default {
  data() {
    return {
      autocompleteOptions: [],
    }
  },
  methods: {
    async onFetchGeoSuggestions(value) {
      if (!value || value.trim().length < 3) {
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
          q: value.substring(0, 85),
          limit: 25,
          type: this.inputGeoType || undefined,
        },
      })

      const formatOptions = this.formatInputGeoSuggestions(response, {
        hideAllZipsOption: this.hideAllZipsOption,
        inputGeoType: this.inputGeoType,
      })

      this.autocompleteOptions = formatOptions
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
