export default {
  data () {
    return {
      exportEndpoint: null,
      exportLoading: false
    }
  },
  methods: {
    async handleExport () {
      if (this.exportLoading || !this.exportEndpoint) {
        return
      }
      this.exportLoading = true
      const { data } = await this.$axios.get(this.exportEndpoint, {
        params: { ...this.$route.query }
      })
      if (data) {
        this.$toast.success("L'export est en cours.\nVous recevrez une notification lorsqu'il sera prêt.")
      }
      this.exportLoading = false
    }
  }
}
