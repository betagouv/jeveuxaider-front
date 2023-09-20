export default {
  mounted() {
    this.trackPageView()
  },
  watch: {
    $route: {
      handler() {
        this.trackPageView()
      },
    },
  },
  methods: {
    trackPageView() {
      if (process.client) {
        this.$plausible.trackPageview(
          {},
          {
            props: {
              contextRole: this.$stores.auth.contextRole,
              isLogged: this.$stores.auth.isLogged,
            },
          }
        )
      }
    },
  },
}
