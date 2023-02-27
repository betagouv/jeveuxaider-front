import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  mixins: [AlgoliaQueryBuilder],
  computed: {
    aroundLatLng () {
      if (this.$route.query.aroundLatLng) {
        return this.$route.query.aroundLatLng
      }
      if (this.$store.state.algoliaSearch.navigatorGeolocation) {
        return `${this.$store.state.algoliaSearch.navigatorGeolocation.coords.latitude}, ${this.$store.state.algoliaSearch.navigatorGeolocation.coords.longitude}`
      }
      return ''
    },
    searchParameters () {
      return {
        aroundLatLngViaIP: !this.aroundLatLng,
        aroundLatLng: this.aroundLatLng,
        aroundRadius: this.$route.query.aroundLatLng ? 35000 : 'all',
        aroundPrecision: 2000,
        query: this.$route.query.search || '',
        page: this.$route.query.page ? (this.$route.query.page - 1) : 0,
        facetFilters: this.activeFacets,
        facets: ['*'],
        filters: this.$store.state.algoliaSearch.initialFilters,
        hitsPerPage: 18
      }
    },
    activeFacets () {
      let activeFacets = this.$store.state.algoliaSearch.availableFacets.filter(facetName => this.$route.query[facetName])

      activeFacets = activeFacets.map((facetName) => {
        return this.$route.query[facetName].split('|').map((facetValue) => {
          return `${facetName}:${facetValue}`
        })
      })

      return activeFacets
    },
    nbMobileActiveFilters () {
      let nbFacets = this.$store.state.algoliaSearch.availableFacets.filter(facetName => this.$route.query[facetName]).length
      if (this.searchParameters?.query) {
        nbFacets++
      }
      return nbFacets
    }
  }
}
