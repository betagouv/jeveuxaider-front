import algoliasearch from 'algoliasearch'

export default function ({ $config }, inject) {
  const client = algoliasearch($config.algolia.appId, $config.algolia.searchKey)

  // const indexMissions = client.initIndex('')

  inject('algolia', {
    multipleQueries: client.multipleQueries
    // indexMissions
  })
}
