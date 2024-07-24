export async function useGeolocationFetch(
  query: string,
  config: {
    context?: 'input' | 'filter' | 'algolia'
    inputGeoType?: string
    hideAllZipsOption?: boolean
    breakDownMultiplePostCodes?: boolean
  } = {}
) {
  if (!queryIsOfSufficientLength(query) || !firstCharIsAlphaNumeric(query)) {
    return []
  }

  const { formatAlgoliaGeoSuggestions, formatInputGeoSuggestions, formatFilterGeoSuggestions } =
    await formatGeoSuggestionsHelper()

  const suggestions = await $fetch('https://api-adresse.data.gouv.fr/search', {
    params: {
      q: query.trim().substring(0, 85),
      limit: 25,
      type: config.inputGeoType || undefined,
    },
  })

  switch (config.context) {
    case 'filter':
      return formatFilterGeoSuggestions(suggestions)
    case 'algolia':
      return formatAlgoliaGeoSuggestions(suggestions)
    case 'input':
    default:
      return formatInputGeoSuggestions(suggestions, {
        hideAllZipsOption: config.hideAllZipsOption,
        inputGeoType: config.inputGeoType,
        breakDownMultiplePostCodes: config.breakDownMultiplePostCodes,
      })
  }
}

// Citycode, not postcode.
export function getDepartmentFromCitycode(citycode: string) {
  const pattern = /^(971|972|973|974|976|987|988)/
  if (pattern.test(citycode)) {
    return citycode.substring(0, 3)
  }

  return citycode.substring(0, 2)
}

const queryIsOfSufficientLength = (query: string) => {
  return query.trim().length >= 3
}

const firstCharIsAlphaNumeric = (query: string) => {
  const regex = new RegExp(/^[a-z0-9]$/i)
  return regex.test(query[0])
}
