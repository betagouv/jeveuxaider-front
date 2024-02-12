import algoliasearch from 'algoliasearch'

export default defineNuxtPlugin(({ ctx }) => {
  let xForwardedFor = null
  if (process.server) {
    const headers = useRequestHeaders()
    // Hydratation errors on local
    if (
      headers['x-forwarded-for'] &&
      !['::ffff:127.0.0.1', '::1', '127.0.0.1'].includes(headers['x-forwarded-for'])
    ) {
      xForwardedFor = (headers['x-forwarded-for'] as String).split(', ')[0]
    }
  }
  const config = useRuntimeConfig()
  const client = algoliasearch(config.public.algolia.appId, config.public.algolia.searchKey)
  const missionsIndex = client.initIndex(config.public.algolia.missionsIndex)
  const missionsReplicaCreneauxIndex = client.initIndex(
    config.public.algolia.missionsReplicaCreneauxIndex
  )
  const termsIndex = client.initIndex(config.public.algolia.termsIndex)
  const organisationsIndex = client.initIndex(config.public.algolia.organisationsIndex)

  return {
    provide: {
      algolia: {
        multipleQueries: client.multipleQueries,
        missionsIndex,
        missionsReplicaCreneauxIndex,
        organisationsIndex,
        termsIndex,
        xForwardedFor,
      },
    },
  }
})
