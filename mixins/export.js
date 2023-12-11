export default {
  data() {
    return {
      exportEndpoint: null,
      exportLoading: false,
    }
  },
  computed: {},
  methods: {
    exportFilename(date) {
      switch (this.exportEndpoint) {
        case '/export/structures':
          return `jva-structures-${date}.xlsx`
        case '/export/missions':
          return `jva-missions-${date}.xlsx`
        case '/export/participations':
          return `jva-participations-${date}.xlsx`
        case '/export/profiles':
          return `jva-utilisateurs-${date}.xlsx`
        case '/export/territoires':
          return `jva-territoires-${date}.xlsx`
        case '/export/reseaux':
          return `jva-reseaux-${date}.xlsx`
        default:
          return 'jva-export.xlsx'
      }
    },
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
          const date = this.$dayjs().format('YYYY-MM-DD-HH-mm-ss')
          const filename = this.exportFilename(date)

          fileLink.href = fileURL
          fileLink.setAttribute('download', filename)
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
