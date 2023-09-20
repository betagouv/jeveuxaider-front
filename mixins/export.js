export default {
  data() {
    return {
      exportEndpoint: null,
      exportLoading: false,
    }
  },
  methods: {
    async handleExport() {
      if (this.exportLoading || !this.exportEndpoint) {
        return
      }
      this.exportLoading = true
      await apiFetch(this.exportEndpoint, {
        params: { ...this.$route.query },
      })
        .then((response) => {
          const fileURL = window.URL.createObjectURL(new Blob([response]))
          const fileLink = document.createElement('a')

          fileLink.href = fileURL
          fileLink.setAttribute('download', 'file.csv')
          document.body.appendChild(fileLink)

          fileLink.click()
        })
        .catch((err) => {
          console.log('err export', err)
        })
      this.exportLoading = false
    },
  },
}
