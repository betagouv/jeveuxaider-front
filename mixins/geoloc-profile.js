export default {
  methods: {
    async onFetchZipSuggestions(payload) {
      this.zipAutocompleteOptions = await useGeolocationFetch(payload, {
        context: 'input',
        inputGeoType: 'municipality',
        hideAllZipsOption: true,
      })
    },
    handleSelectedZip(payload) {
      this.form.zip = payload.postcode
      this.form.city = payload.city
      this.form.latitude = payload.coordinates[1]
      this.form.longitude = payload.coordinates[0]
      this.form.department = getDepartmentFromCitycode(payload.citycode)
      this.validate('zip')
    },
    onDeleteZip() {
      this.form.zip = null
      this.form.city = null
      this.form.latitude = null
      this.form.longitude = null
      this.form.department = null
    },
  },
}
