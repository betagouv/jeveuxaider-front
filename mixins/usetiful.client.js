/* eslint-disable */
export default {
  mounted() {
    const runtimeConfig = useRuntimeConfig()

    if (runtimeConfig.public.usetiful?.enabled !== 'true') {
      return
    }

    // User segmentation start
    window.usetifulTags = {
      userId: this.$stores.auth.profile?.id,
      role: this.$stores.auth.currentRole?.key,
    }
    // User segmentation end

    // exit if script already loaded
    if (window.usetiful_instance) {
      return
    }

    // Usetiful script start
    ;(function (d, config) {
      var a = d.getElementsByTagName('head')[0]
      var r = d.createElement('script')
      r.async = 1
      r.src = 'https://www.usetiful.com/dist/usetiful.js'
      r.setAttribute('id', 'usetifulScript')
      r.dataset.token = config.public.usetiful.token
      a.appendChild(r)
    })(document, runtimeConfig)
    // Usetiful script end
  },
}
