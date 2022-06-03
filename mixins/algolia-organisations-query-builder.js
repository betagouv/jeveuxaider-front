
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  mixins: [AlgoliaQueryBuilder],
  computed: {
    searchParameters () {
      return {
        aroundLatLngViaIP: !this.$route.query.aroundLatLng,
        aroundLatLng: this.$route.query.aroundLatLng || '',
        aroundRadius: this.$route.query.aroundLatLng ? 35000 : 'all',
        query: this.$route.query.search || '',
        page: this.$route.query.page ? (this.$route.query.page - 1) : 0,
        facetFilters: this.activeFacets,
        facets: ['*'],
        filters: this.getInitialFilters(),
        hitsPerPage: 18
      }
    },
    activeFacets () {
      let activeFacets = this.availableFacets.filter(facetName => this.$route.query[facetName])

      activeFacets = activeFacets.map((facetName) => {
        return this.$route.query[facetName].split('|').map((facetValue) => {
          return `${facetName}:${facetValue}`
        })
      })

      return activeFacets
    },
    activeMoreFacets () {
      return this.availableFacets.filter(facetName => this.$route.query[facetName] && !['search'].includes(facetName))
    }
  },
  methods: {
    getIndexName () {
      return this.$config.algolia.organisationsIndex
    },
    getAvailableFacets () {
      return ['department_name', 'domaines', 'reseaux.name', 'publics_beneficiaires']
    },
    getInitialFilters () {
      return ''
    },
    onFetchAlgoliaResults (results) {
      this.$store.commit('algoliaSearchOrganisations/setResults', results[0])
      this.$store.commit('algoliaSearchOrganisations/setFacetsResults', results.slice(1))
    },
    async searchForFacetValues (facetName, facetQuery) {
      return await this.$algolia.organisationsIndex.searchForFacetValues(facetName, facetQuery, {
        ...this.searchParameters,
        facetFilters: this.activeFacets.filter(facetFilter => facetFilter[0].split(':')[0] != facetName)
      })
    }
  }
}
