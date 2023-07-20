export default {
  mounted () {
    this.trackPageView()
  },
  watch: {
    $route: {
      handler () {
        this.trackPageView()
      }
    }
  },
  methods: {
    trackPageView () {
      this.$plausible.trackPageview({}, {
        props: {
          contextRole: this.$store.getters.contextRole,
          isLogged: this.$store.getters.isLogged
        }
      })
    }
  }
}
