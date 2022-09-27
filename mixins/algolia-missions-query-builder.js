import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  mixins: [AlgoliaQueryBuilder],
  computed: {
    hitsPerPage () {
      if (this.$store.state.algoliaSearch.hitsPerPage) {
        return this.$store.state.algoliaSearch.hitsPerPage
      } else {
        return this.$route.query.type === 'Mission à distance' ? 18 : 17
      }
    },
    aroundLatLng () {
      if (this.$store.state.algoliaSearch.aroundLatLng) {
        return this.$store.state.algoliaSearch.aroundLatLng
      } else {
        return this.$route.query.aroundLatLng || ''
      }
    },
    searchParameters () {
      return {
        aroundLatLngViaIP: this.$route.query.type != 'Mission à distance' && !this.$route.query.aroundLatLng,
        aroundLatLng: this.aroundLatLng,
        aroundRadius: this.$route.query.aroundLatLng ? 35000 : 'all',
        query: this.$route.query.search || '',
        page: this.$route.query.page ? (this.$route.query.page - 1) : 0,
        facetFilters: this.activeFacets,
        facets: ['*'],
        filters: this.$store.state.algoliaSearch.initialFilters,
        numericFilters: this.activeNumericFilters,
        hitsPerPage: this.hitsPerPage
      }
    },
    activeFacets () {
      let activeFacets = this.availableFacets.filter(facetName => this.$route.query[facetName])

      activeFacets = activeFacets.map((facetName) => {
        return this.$route.query[facetName].split('|').map((facetValue) => {
          return `${facetName}:${facetValue}`
        })
      })

      if (!this.$route.query.type && this.$route.name === 'missions-benevolat') {
        activeFacets.push(['type:Mission en présentiel'])
      }

      return activeFacets
    },
    nbMobileSecondaryFilters () {
      const nbFacets = this.availableFacets.filter(facetName => this.$route.query[facetName] && !['type'].includes(facetName)).length
      const nbNumericFilters = this.activeNumericFilters.length
      let nbSecondaryFilters = nbFacets + nbNumericFilters
      if (this.searchParameters?.query) {
        nbSecondaryFilters++
      }
      return nbSecondaryFilters
    }
  },
  methods: {
    getAvailableFacets () {
      return ['type', 'activity.name', 'structure.name', 'department_name', 'domaines', 'structure.reseaux.name', 'publics_beneficiaires', 'template_subtitle', 'publics_volontaires']
    },
    getAvailableNumericFilters () {
      return ['commitment__total', 'is_autonomy']
    }
  }
}
