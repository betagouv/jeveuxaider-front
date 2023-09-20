export default {
  computed: {
    isAutonomy () { return !!this.$route.query.is_autonomy },
    isPresentiel () { return !this.$route.query.type || this.$route.query.type == 'Mission en présentiel' }
  },
  methods: {
    handleToggle () {
      const isAutonomy = !this.isAutonomy

      const query = {
        ...this.$route.query,
        page: undefined
      }
      if (isAutonomy) {
        query.is_autonomy = '=1'
      } else {
        delete query.is_autonomy
      }

      this.$router.push({
        path: this.$route.path,
        query
      })
    }
  }
}
