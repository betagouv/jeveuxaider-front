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

      const formatOptions = response.features
        .flatMap((option) => {
          if (this.inputGeoType === 'municipality' && this.getMultidistributedCity) {
            const multidistributedCity = this.getMultidistributedCity(
              option.properties.postcode,
              option.properties.city
            )

            if (multidistributedCity) {
              return [
                this.hideAllZipsOption
                  ? undefined
                  : {
                      ...option.properties,
                      id: `${multidistributedCity[0].group}_all_zips`,
                      coordinates: option.geometry.coordinates,
                      label: option.properties.city.match(/^([^\d]+)/)?.[1].trim(),
                      postcode: undefined,
                      postcodes: multidistributedCity,
                      typeLabel: 'Tous les codes postaux',
                    },
                ...multidistributedCity.map((c) => {
                  return {
                    ...option.properties,
                    ...c,
                    coordinates: [c.longitude, c.latitude],
                    id: c.key,
                    label: c.labelArrondissement ?? c.label,
                    postcode: c.zip,
                    typeLabel: c.zip,
                  }
                }),
              ].filter((o) => o)
            }
          }

          return {
            ...option.properties,
            coordinates: option.geometry.coordinates,
            typeLabel:
              this.inputGeoType === 'municipality'
                ? option.properties.postcode
                : this.$filters.label(option.properties.type, 'geoType'),
          }
        })
        .reduce((accumulator, currentValue) => {
          const exists = accumulator.some(
            (obj) =>
              !obj.id.includes('all_zips') &&
              obj.label === currentValue.label &&
              obj.postcode?.endsWith(currentValue.postcode)
          )
          if (!exists) {
            accumulator.push(currentValue)
          }
          return accumulator
        }, [])
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
