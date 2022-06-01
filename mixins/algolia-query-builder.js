
export default {
  data () {
    return {
      indexName: this.$config.algolia.missionsIndex,
      availableFacets: ['type', 'activity.name', 'structure.name', 'department_name', 'domaines', 'structure.reseaux.name', 'publics_beneficiaires', 'template_subtitle'],
      availableNumericFilters: ['commitment__total']
    }
  },
  computed: {
    searchParameters () {
      return {
        aroundLatLngViaIP: this.$route.query.type != 'Mission à distance' && !this.$route.query.aroundLatLng,
        aroundLatLng: this.$route.query.aroundLatLng || '',
        aroundRadius: this.$route.query.aroundLatLng ? 35000 : 'all',
        query: this.$route.query.search || '',
        page: this.$route.query.page ? (this.$route.query.page - 1) : 0,
        facetFilters: this.activeFacets,
        facets: ['*'],
        numericFilters: this.activeNumericFilters,
        hitsPerPage: this.$route.query.type === 'Mission à distance' ? 18 : 17
      }
    },
    hasActiveFilters () {
      Object.keys(this.$route.query).forEach(key => this.$route.query[key] === undefined ? delete this.$route.query[key] : {})
      return Object.keys(this.$route.query).length !== 0
    },
    activeFacets () {
      let activeFacets = this.availableFacets.filter(facetName => this.$route.query[facetName])

      activeFacets = activeFacets.map((facetName) => {
        return this.$route.query[facetName].split('|').map((facetValue) => {
          return `${facetName}:${facetValue}`
        })
      })

      if (!this.$route.query.type) {
        activeFacets.push(['type:Mission en présentiel'])
      }

      return activeFacets
    },
    activeNumericFilters () {
      let activeNumericFilters = this.availableNumericFilters.filter(filterName => this.$route.query[filterName])

      activeNumericFilters = activeNumericFilters.map((filterName) => {
        return `${filterName}${this.$route.query[filterName]}`
      })

      return activeNumericFilters
    }
  },
  methods: {
    async search () {
      // Recherche principale
      const queries = [{
        indexName: this.indexName,
        params: this.searchParameters
      }]

      // Une recherche par facet filtrée, pour récupérer les counts (algolia hack)
      this.activeFacets.forEach((facetFilter) => {
        const facetName = facetFilter[0].split(':')[0]
        queries.push({
          indexName: this.indexName,
          params: {
            ...this.searchParameters,
            facetFilters: this.activeFacets.filter(facetFilter => facetFilter[0].split(':')[0] != facetName),
            facets: [facetName],
            hitsPerPage: 1,
            attributesToRetrieve: [],
            attributesToSnippet: [],
            attributesToHighlight: [],
            clickAnalytics: false,
            analytics: false
          }
        })
      })

      const { results } = await this.$algolia.multipleQueries(queries)

      this.$store.commit('algoliaSearchMissions/setResults', results[0])
      this.$store.commit('algoliaSearchMissions/setFacetsResults', results.slice(1))
    },
    addFilter (filterName, filterValue, multiple = false) {
      let filterQueryValues = this.$route.query[filterName] ? this.$route.query[filterName].split('|') : []
      if (multiple) {
        filterQueryValues.push(filterValue)
      } else {
        filterQueryValues = [filterValue]
      }

      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, [filterName]: filterQueryValues.join('|'), page: undefined }
      })
    },
    deleteFilter (filterName, filterValue = null, multiple = false) {
      let filterQueryValues = this.$route.query[filterName] ? this.$route.query[filterName].split('|') : []

      if (multiple) {
        filterQueryValues = filterQueryValues.filter(value => value !== filterValue)
        if (filterQueryValues.length === 0) { filterQueryValues = undefined }
      } else {
        filterQueryValues = undefined
      }

      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, [filterName]: filterQueryValues ? filterQueryValues.join('|') : undefined, page: undefined }
      })
    },
    deleteAllFilters () {
      this.$router.push({
        path: this.$route.path
      })
    },
    isActiveFilter (name, value) {
      return this.$route.query[name] && this.$route.query[name].split('|').includes(value)
    },
    async searchForFacetValues (facetName, facetQuery) {
      return await this.$algolia.missionsIndex.searchForFacetValues(facetName, facetQuery, {
        ...this.searchParameters,
        facetFilters: this.activeFacets.filter(facetFilter => facetFilter[0].split(':')[0] != facetName)
      })
    }
  }
}
