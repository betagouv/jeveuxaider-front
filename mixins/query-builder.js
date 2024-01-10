export default {
  data() {
    return {
      queryLoading: false,
      queryResult: {},
    }
  },
  created() {
    this.fetch()
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.name === oldVal.name) {
        this.fetch()
      }
    },
  },
  methods: {
    async fetch() {
      this.queryLoading = true
      const response = await apiFetch(this.endpoint, {
        params: { ...this.queryParams, ...this.$route.query },
      })
      this.queryResult = response
      this.queryLoading = false
    },
    changeFilter(filterName, filterValue, multiple = false) {
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = _debounce(() => {
        const filterQueryValues = this.$route.query[filterName]
          ? this.$route.query[filterName].split(',')
          : []
        if (filterQueryValues.includes(filterValue) || filterQueryValues === filterValue) {
          // L'option est déjà filtrée, on la retire
          this.deleteFilter(filterName, filterValue, multiple)
        } else if (['', null, undefined].includes(filterValue)) {
          this.deleteFilter(filterName, filterValue, multiple)
        } else {
          this.addFilter(filterName, filterValue, multiple)
        }
      }, 275)
      this.timeout()
    },
    addFilter(filterName, filterValue, multiple) {
      let filterQueryValues = this.$route.query[filterName]
        ? this.$route.query[filterName].split(',')
        : []
      if (multiple) {
        filterQueryValues.push(filterValue)
      } else {
        filterQueryValues = [filterValue]
      }

      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          [filterName]: filterQueryValues.join(','),
          page: undefined,
        },
      })
    },
    deleteFilter(filterName, filterValue, multiple) {
      let filterQueryValues = this.$route.query[filterName]
        ? this.$route.query[filterName].split(',')
        : []

      if (multiple && filterValue) {
        filterQueryValues = filterQueryValues.filter((value) => value !== filterValue)
        if (filterQueryValues.length === 0) {
          filterQueryValues = undefined
        }
      } else {
        filterQueryValues = undefined
      }

      console.log('filterName', filterValue)
      console.log('filterQueryValues', filterQueryValues)

      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          [filterName]: filterQueryValues ? filterQueryValues.join(',') : undefined,
          page: undefined,
        },
      })
    },
    deleteAllFilters() {
      this.$router.push({
        path: this.$route.path,
        query: {
          sort: this.$route.query.sort,
        },
      })
    },
    changePage(page) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page },
      })
    },
  },
  computed: {
    hasActiveFilters() {
      return Object.keys(this.$route.query).some((q) => q !== 'page')
    },
  },
}
