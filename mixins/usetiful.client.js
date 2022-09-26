/* eslint-disable */
export default {
  mounted() {
    if (!this.$config.usetiful.enabled) {
      return;
    }

    // User segmentation start
    window.usetifulTags = {
      userId : this.$store.getters.profile?.id,
      role : this.$store.getters.currentRole?.key
    };
    // User segmentation end

    // Usetiful script start
    (function(d, config) {
      var a = d.getElementsByTagName('head')[0];
      var r = d.createElement('script');
      r.async = 1;
      r.src = "https://www.usetiful.com/dist/usetiful.js";
      r.setAttribute('id', 'usetifulScript');
      r.dataset.token = config.usetiful.token;
      a.appendChild(r);
    })(document, this.$config);
    // Usetiful script end
  }

}
