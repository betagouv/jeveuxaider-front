import algoliasearch from 'algoliasearch'

export default function (context, inject) {
  let xForwardedFor = null
  if (process.server) {
    const req = context.req
    const headers = (req && req.headers) ? Object.assign({}, req.headers) : {}
    console.log('xForwardedFor', headers['x-forwarded-for'])
    if (headers['x-forwarded-for']) {
      xForwardedFor = headers['x-forwarded-for'].split(', ')[0]
    }
  }
  const $config = context.$config
  const client = algoliasearch($config.algolia.appId, $config.algolia.searchKey)

  const missionsIndex = client.initIndex($config.algolia.missionsIndex)
  const organisationsIndex = client.initIndex($config.algolia.organisationsIndex)

  inject('algolia', {
    multipleQueries: client.multipleQueries,
    missionsIndex,
    organisationsIndex,
    xForwardedFor
  })
}
