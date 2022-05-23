import algoliasearch from 'algoliasearch'

export default function ({ $config }, inject) {
  const client = algoliasearch($config.algolia.appId, $config.algolia.searchKey)

  const missionsIndex = client.initIndex($config.algolia.missionsIndex)

  inject('algolia', {
    multipleQueries: client.multipleQueries,
    missionsIndex
  })
}
