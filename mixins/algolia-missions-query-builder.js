import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  mixins: [AlgoliaQueryBuilder],
  computed: {
    aroundLatLng () {
      if (this.$route.query.type == 'Mission à distance') {
        return ''
      }

      if (this.$store.state.algoliaSearch.aroundLatLng) {
        return this.$store.state.algoliaSearch.aroundLatLng
      }

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
        aroundLatLngViaIP: this.$route.query.type != 'Mission à distance' && !this.aroundLatLng,
        aroundLatLng: this.aroundLatLng,
        aroundRadius: this.$route.query.aroundLatLng ? 35000 : 'all',
        // aroundPrecision: 2000,
        query: this.$route.query.search || '',
        page: this.$route.query.page ? (this.$route.query.page - 1) : 0,
        facetFilters: this.activeFacets,
        facets: ['*'],
        filters: this.$store.state.algoliaSearch.initialFilters,
        numericFilters: this.activeNumericFilters,
        hitsPerPage: this.hitsPerPage
      }
    },
    hitsPerPage () {
      if (this.$store.state.algoliaSearch.hitsPerPage) {
        return this.$store.state.algoliaSearch.hitsPerPage
      } else {
        return this.$route.query.type === 'Mission à distance' ? 18 : 17
      }
    },
    activeFacets () {
      let activeFacets = this.$store.state.algoliaSearch.availableFacets.filter(facetName => this.$route.query[facetName])

      activeFacets = activeFacets.map((facetName) => {
        return this.$route.query[facetName].split('|').map((facetValue) => {
          return `${facetName}:${facetValue}`
        })
      })

      if (!this.$route.query.type && this.$route.name != 'activites-slug') {
        activeFacets.push(['type:Mission en présentiel'])
      }

      return activeFacets
    },
    activeNumericFilters () {
      let activeNumericFilters = this.$store.state.algoliaSearch.availableNumericFilters.filter(filterName => this.$route.query[filterName])

      activeNumericFilters = activeNumericFilters.map((filterName) => {
        return `${filterName}${this.$route.query[filterName]}`
      })

      return activeNumericFilters
    },
    nbMobileSecondaryFilters () {
      const nbFacets = this.$store.state.algoliaSearch.availableFacets.filter(facetName => this.$route.query[facetName] && !['type'].includes(facetName)).length
      const nbNumericFilters = this.activeNumericFilters.length
      let nbSecondaryFilters = nbFacets + nbNumericFilters
      if (this.searchParameters?.query) {
        nbSecondaryFilters++
      }
      return nbSecondaryFilters
    }
  }
}
