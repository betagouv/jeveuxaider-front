
export default {
  computed: {
    availableFacets () {
      return this.getAvailableFacets()
    },
    availableNumericFilters () {
      return this.getAvailableNumericFilters()
    },
    hasActiveFilters () {
      Object.keys(this.$route.query).forEach(key => this.$route.query[key] === undefined ? delete this.$route.query[key] : {})
      return Object.keys(this.$route.query).length !== 0
    },
    activeNumericFilters () {
      let activeNumericFilters = this.availableNumericFilters.filter(filterName => this.$route.query[filterName])

      activeNumericFilters = activeNumericFilters.map((filterName) => {
        return `${filterName}${this.$route.query[filterName]}`
      })

      return activeNumericFilters
    },
    activeFacets () {
      let activeFacets = this.availableFacets.filter(facetName => this.$route.query[facetName])

      activeFacets = activeFacets.map((facetName) => {
        return this.$route.query[facetName].split('|').map((facetValue) => {
          return `${facetName}:${facetValue}`
        })
      })

      return activeFacets
    }
  },
  methods: {
    getAvailableFacets () {
      return []
    },
    getAvailableNumericFilters () {
      return []
    },
    async search () {
      const queries = [{
        indexName: this.$store.state.algoliaSearch.indexName,
        params: this.searchParameters
      }]

      this.activeFacets.forEach((facetFilter) => {
        const facetName = facetFilter[0].split(':')[0]
        queries.push({
          indexName: this.$store.state.algoliaSearch.indexName,
          params: {
            ...this.searchParameters,
            facetFilters: this.activeFacets.filter(facetFilter => facetFilter[0].split(':')[0] != facetName),
            facets: [facetName],
            filters: this.$store.state.algoliaSearch.initialFilters,
            hitsPerPage: 1,
            attributesToRetrieve: [],
            attributesToSnippet: [],
            attributesToHighlight: [],
            clickAnalytics: false,
            analytics: false
          }
        })
      })

      let params = {}
      if (this.$algolia.xForwardedFor) {
        params = {
          headers: {
            'X-Forwarded-For': this.$algolia.xForwardedFor
          }
        }
      }
      const { results } = await this.$algolia.multipleQueries(queries, params)

      this.$store.commit('algoliaSearch/setResults', results[0])
      this.$store.commit('algoliaSearch/setFacetsResults', results.slice(1))

      console.log('SEARCH')
    },
    async searchForFacetValues (facetName, facetQuery) {
      return await this.$algolia[this.$store.state.algoliaSearch.indexKey].searchForFacetValues(facetName, facetQuery, {
        ...this.searchParameters,
        facetFilters: this.activeFacets.filter(facetFilter => facetFilter[0].split(':')[0] != facetName)
      })
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
    async onNavigatorGeolocation (data) {
      // console.log('onNavigatorGeolocation', data)
      this.$store.commit('algoliaSearch/setNavigatorGeolocation', data)
      await this.search()
    }
  }
}
