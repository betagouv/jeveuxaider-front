export default {
  data() {
    return {
      exportEndpoint: null,
      exportLoading: false,
    }
  },
  computed: {
    exportFilename() {
      const date = this.$dayjs().format('YYYY-MM-DD-HH-mm-ss')
      switch (this.exportEndpoint) {
        case '/export/structures':
          return `jva-structures-${date}.csv`
        case '/export/missions':
          return `jva-missions-${date}.csv`
        case '/export/participations':
          return `jva-participations-${date}.csv`
        case '/export/profiles':
          return `jva-utilisateurs-${date}.csv`
        case '/export/territoires':
          return `jva-territoires-${date}.csv`
        case '/export/reseaux':
          return `jva-reseaux-${date}.csv`
        default:
          return 'jva-export.csv'
      }
    },
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
          fileLink.setAttribute('download', this.exportFilename)
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
