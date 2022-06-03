
export default {
  data () {
    return {

    }
  },
  computed: {
    indexName () {
      return this.getIndexName()
    },
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
    isMoreFiltersActive () {
      return !!this.activeFacets.length
    },
    // activeFacets () {
    //   let activeFacets = this.availableFacets.filter(facetName => this.$route.query[facetName])

    //   activeFacets = activeFacets.map((facetName) => {
    //     return this.$route.query[facetName].split('|').map((facetValue) => {
    //       return `${facetName}:${facetValue}`
    //     })
    //   })

    //   // if (!this.$route.query.type) {
    //   //   activeFacets.push(['type:Mission en présentiel'])
    //   // }

    //   return activeFacets
    // },
    activeNumericFilters () {
      let activeNumericFilters = this.availableNumericFilters.filter(filterName => this.$route.query[filterName])

      activeNumericFilters = activeNumericFilters.map((filterName) => {
        return `${filterName}${this.$route.query[filterName]}`
      })

      return activeNumericFilters
    }
  },
  methods: {
    getIndexName () {
      return ''
    },
    getInitialFilters () {
      return ''
    },
    getAvailableFacets () {
      return []
    },
    getAvailableNumericFilters () {
      return []
    },
    onFetchAlgoliaResults (results) {
      // WHAT TO DO WITH RESULTS
    },
    async search () {
      const queries = [{
        indexName: this.indexName,
        params: this.searchParameters
      }]

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

      this.onFetchAlgoliaResults(results)
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
    }
  }
}
