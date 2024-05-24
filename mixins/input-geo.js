export default {
  data() {
    return {
      autocompleteOptions: [],
    }
  },
  methods: {
    clearAddress() {
      this.form.address = null
      this.form.zip = null
      this.form.city = null
      this.form.latitude = null
      this.form.longitude = null
      this.form.full_address = null
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
