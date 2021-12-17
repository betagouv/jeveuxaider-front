export default {
  data () {
    return {
      queryResult: {}
    }
  },
  async fetch () {
    const { data } = await this.$axios.get(this.endpoint, {
      params: this.$route.query
    })
    this.queryResult = data
    window.scrollTo(0, 0)
  },
  fetchOnServer: false,
  watch: {
    $route: '$fetch'
  },
  methods: {
    changeFilter (filterName, filterValue, multiple = false) {
      const filterQueryValues = this.$route.query[filterName] ? this.$route.query[filterName].split(',') : []

      if (filterQueryValues.includes(filterValue)) { // L'option est déjà filtrée, on la retire
        this.deleteFilter(filterName, filterValue, multiple)
      } else if (filterValue === '' || filterValue === null) {
        this.deleteFilter(filterName, filterValue, multiple)
      } else {
        this.addFilter(filterName, filterValue, multiple)
      }
    },
    addFilter (filterName, filterValue, multiple) {
      let filterQueryValues = this.$route.query[filterName] ? this.$route.query[filterName].split(',') : []

      if (multiple) {
        filterQueryValues.push(filterValue)
      } else {
        filterQueryValues = [filterValue]
      }
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, [filterName]: filterQueryValues.join(','), page: undefined }
      })
    },
    deleteFilter (filterName, filterValue, multiple) {
      let filterQueryValues = this.$route.query[filterName] ? this.$route.query[filterName].split(',') : []

      if (multiple) {
        filterQueryValues = filterQueryValues.filter(value => value !== filterValue)
        if (filterQueryValues.length === 0) { filterQueryValues = undefined }
      } else {
        filterQueryValues = undefined
      }
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, [filterName]: filterQueryValues ? filterQueryValues.join(',') : undefined, page: undefined }
      })
    },

    changePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page }
      })
    }
  }
}
