/* eslint-disable */
export default {
  mounted() {
    if (!this.includeHotjar) {
      return
    }

    // Hotjar script start
    ;(function (h, o, t, j, a, r) {
      h.hj =
        h.hj ||
        function () {
          ;(h.hj.q = h.hj.q || []).push(arguments)
        }
      h._hjSettings = { hjid: 2373674, hjsv: 6, site_id: 2373674 }
      a = o.getElementsByTagName('head')[0]
      r = o.createElement('script')
      r.async = 1
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
      a.appendChild(r)
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')
    // Hotjar script end

    if (this.$stores.auth.isLogged && this.$stores.auth.contextRole !== 'admin') {
      this.identifyUser()
    }
  },
  computed: {
    includeHotjar() {
      if (this.$stores.auth.isLogged && this.$stores.auth.contextRole === 'admin') {
        console.log('no hotjar for admin')
        return false
      }
      return true
    },
  },
  methods: {
    identifyUser() {
      if (window.hj) {
        window.hj('identify', this.$stores.auth?.user?.id, {
          'Context Role': this.$stores.auth.contextRole,
          'Registered date': this.$dayjs(this.$stores.auth.user.created_at).toISOString(), // date in ISO-8601 format.
        })
      }
    },
  },
}
