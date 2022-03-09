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
      await this.$axios.get(this.exportEndpoint, {
        params: { ...this.$route.query }
      }).then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]))
        const fileLink = document.createElement('a')

        fileLink.href = fileURL
        fileLink.setAttribute('download', 'file.csv')
        document.body.appendChild(fileLink)

        fileLink.click()
      }).catch((err) => {
        console.log('err export', err)
      })
      // if (data) {
      //   this.$toast.success("L'export est en cours.\nVous recevrez une notification lorsqu'il sera prêt.")
      // }
      this.exportLoading = false
    }
  }
}
