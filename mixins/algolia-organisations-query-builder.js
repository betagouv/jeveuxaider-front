
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
        filters: this.$store.state.algoliaSearch.initialFilters,
        hitsPerPage: 18
      }
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
      return ['department_name', 'domaines.name', 'reseaux.name', 'publics_beneficiaires', 'activities.name', 'statut_juridique']
    }
  }
}
