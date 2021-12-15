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
  watch: {
    $route: '$fetch'
  },
  methods: {
    changeFilter (filterName, filterValue) {
      if (this.$route.query[filterName] && this.$route.query[filterName] === filterValue) {
        this.deleteFilter(filterName)
      } else if (filterValue === '' || filterValue === null) {
        this.deleteFilter(filterName)
      } else {
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, [filterName]: filterValue, page: undefined }
        })
      }
    },
    deleteFilter (filterName) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, [filterName]: undefined, page: undefined }
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
