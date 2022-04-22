import algoliasearch from 'algoliasearch'

export default function ({ $config }, inject) {
  const client = algoliasearch($config.algolia.appId, $config.algolia.searchKey)
  const index = client.initIndex('local_jeremy_covid_missions')
  //   index.setSettings({
  //     sortFacetValuesBy: 'count'
  //   })

  inject('algolia', {
    search: index.search,
    searchForFacetValues: index.searchForFacetValues
  })
//   async function search () {
//     return await index.search(query, searchParameters)
//   }
}
