export default {
  methods: {
    async onFetchZipSuggestions(payload) {
      this.loadingFetchZips = true
      this.zipAutocompleteOptions = await useGeolocationFetch(payload, {
        context: 'input',
        inputGeoType: 'municipality',
        hideAllZipsOption: true,
        breakDownMultiplePostCodes: true,
      })
      this.selectZipInOptions()
      this.loadingFetchZips = false
    },
    handleSelectedZip(payload) {
      if (payload === null) {
        this.onDeleteZip()
        return
      }

      this.form.zip = payload.postcode
      this.form.city = payload.city
      this.form.latitude = payload.coordinates[1]
      this.form.longitude = payload.coordinates[0]
      this.form.department = getDepartmentFromCitycode(payload.citycode)
      this.selectZipInOptions()
      this.validate('zip')
    },
    onDeleteZip() {
      this.form.zip = null
      this.form.city = null
      this.form.latitude = null
      this.form.longitude = null
      this.form.department = null
      this.unselectZipInOptions()
    },
    selectZipInOptions() {
      this.unselectZipInOptions()

      const foundOption = this.zipAutocompleteOptions.find(
        (option) => option.postcode === this.form.zip && option.city === this.form.city
      )
      if (foundOption) {
        foundOption.isSelected = true
      }
    },
    unselectZipInOptions() {
      this.zipAutocompleteOptions.map((option) => (option.isSelected = false))
    },
  },
}
