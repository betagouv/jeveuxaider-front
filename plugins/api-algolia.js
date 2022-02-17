export default function ({ $config }, inject) {
  const headers = {
    'X-Algolia-API-Key': process.env.algolia.searchKey,
    'X-Algolia-Application-Id': process.env.algolia.appId
  }
  inject('algoliaApi', {
    getMissions
  })

  async function getMissions (config) {
    // {
    //   aroundLatLng: `${lat},${lng}`,
    //   aroundRadius: radiusInMeters,
    //   hitsPerPage: 10,
    //   filters: days.join(' AND '),
    //   attributesToHighlight: [],
    // }

    try {
      return unWrap(
        await fetch(
            `https://${process.env.algolia.appId}-dsn.algolia.net/1/indexes/${process.env.algolia.missionsIndex}/query`,
            {
              headers,
              method: 'POST',
              body: JSON.stringify(config)
            }
        )
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }
}

export async function unWrap (response) {
  const json = await response.json()
  const { ok, status, statusText } = response
  return {
    json,
    ok,
    status,
    statusText
  }
}

export function getErrorResponse (error) {
  return {
    ok: false,
    status: 500,
    statusText: error.message,
    json: {}
  }
}
