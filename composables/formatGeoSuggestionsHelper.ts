export const formatGeoSuggestionsHelper = async () => {
  const { $filters } = useNuxtApp()
  const { getMultidistributedCity } = await multidistributedCitiesHelper()

  const formatAlgoliaGeoSuggestions = (suggestions: any) => {
    const formattedSuggestions = suggestions.features
      .flatMap((option: any) => {
        const multidistributedCity = getMultidistributedCity(
          option.properties.postcode,
          option.properties.city
        )
        if (multidistributedCity) {
          return [
            ...multidistributedCity.map((c) => {
              return {
                id: c.key,
                city: c.labelArrondissement ?? c.label,
                postcode: c.zip,
                typeLabel: c.zip,
                aroundLatLng: `${c.latitude},${c.longitude}`,
              }
            }),
          ]
        }

        return {
          ...option.properties,
          aroundLatLng: `${option.geometry.coordinates[1]},${option.geometry.coordinates[0]}`,
          typeLabel: $filters.label(option.properties.type, 'geoType'),
        }
      })
      .reduce((accumulator: any[], currentValue: any) => {
        const exists = accumulator.some(
          (obj) => obj.city === currentValue.city && obj.postcode?.endsWith(currentValue.postcode)
        )
        if (!exists) {
          accumulator.push(currentValue)
        }
        return accumulator
      }, [])

    return formattedSuggestions
  }

  const formatFilterGeoSuggestions = (suggestions: any) => {
    const formattedSuggestions = suggestions.features
      .flatMap((option: any) => {
        const multidistributedCity = getMultidistributedCity(
          option.properties.postcode,
          option.properties.city
        )
        if (multidistributedCity) {
          return [
            {
              id: `${multidistributedCity[0].group}_all_zips`,
              name: multidistributedCity[0].label,
              zip: multidistributedCity
                .map((c) => {
                  return c.zip
                })
                .join(','),
              labelRight: 'Tous les CP',
            },
            ...multidistributedCity.map((c) => {
              return {
                id: c.key,
                name: c.labelArrondissement ?? c.label,
                zip: c.zip,
                labelRight: c.zip,
              }
            }),
          ]
        }

        return {
          id: option.properties.id,
          name: option.properties.city,
          zip: option.properties.postcode,
          labelRight: option.properties.postcode,
        }
      })
      .reduce((accumulator: any[], currentValue: any) => {
        const exists = accumulator.some(
          (obj) =>
            !obj.id.includes('all_zips') &&
            obj.name === currentValue.name &&
            obj.zip?.endsWith(currentValue.zip)
        )
        if (!exists) {
          accumulator.push(currentValue)
        }
        return accumulator
      }, [])

    return formattedSuggestions
  }

  const formatInputGeoSuggestions = (
    suggestions: any,
    config: {
      hideAllZipsOption?: boolean
      inputGeoType?: string
      breakDownMultiplePostCodes?: boolean // ex: Paris 16
    }
  ) => {
    const formattedSuggestions = suggestions.features
      .flatMap((option: any) => {
        if (config.inputGeoType === 'municipality') {
          const multidistributedCity = getMultidistributedCity(
            option.properties.postcode,
            option.properties.city
          )

          if (multidistributedCity) {
            return [
              config.hideAllZipsOption
                ? undefined
                : {
                    ...option.properties,
                    id: `${multidistributedCity[0].group}_all_zips`,
                    coordinates: option.geometry.coordinates,
                    label: multidistributedCity[0].label,
                    postcode: undefined,
                    postcodes: multidistributedCity,
                    typeLabel: 'Tous les codes postaux',
                  },
              ...multidistributedCity.flatMap((c) => {
                if (config.breakDownMultiplePostCodes === true) {
                  return c.zip.split(',').map((cPc: string) => {
                    return {
                      ...option.properties,
                      ...c,
                      coordinates: [c.longitude, c.latitude],
                      id: c.key,
                      label: c.labelArrondissement ?? c.label,
                      postcode: cPc,
                      typeLabel: cPc,
                    }
                  })
                }
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
            config.inputGeoType === 'municipality'
              ? option.properties.postcode
              : $filters.label(option.properties.type, 'geoType'),
        }
      })
      .reduce((accumulator: any[], currentValue: any) => {
        const foundIndex = accumulator.findIndex(
          (obj) =>
            !obj.id.includes('all_zips') &&
            obj.label === currentValue.label &&
            obj.postcode?.endsWith(currentValue.postcode)
        )
        if (foundIndex === -1) {
          accumulator.push(currentValue)
        } else {
          // Prefer the multidistributedCitiesHelper version and keep the order
          if (currentValue.group) {
            accumulator.splice(foundIndex, 1)
            accumulator.push(currentValue)
          }
        }
        return accumulator
      }, [])

    return formattedSuggestions
  }

  return {
    formatAlgoliaGeoSuggestions,
    formatFilterGeoSuggestions,
    formatInputGeoSuggestions,
  }
}
