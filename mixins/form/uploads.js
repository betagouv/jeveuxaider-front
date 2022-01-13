export default {
  data () {
    return {
      uploads: []
    }
  },
  methods: {
    addUpload (file) {
      const existingIndex = this.uploads.findIndex(
        upload => upload.fieldName === file.fieldName
      )
      if (existingIndex != -1) {
        this.uploads.splice(existingIndex, 1, file)
      } else {
        this.uploads.push(file)
      }
    },
    deleteUpload (fieldName) {
      this.uploads.splice(
        this.uploads.findIndex(upload => upload.fieldName === fieldName), 1
      )
    },
    uploadFiles (modelType, modelId, collection) {
      if (this.form.id) {
        const promises = []
        this.uploads.forEach((upload) => {
          const form = new FormData()

          console.log(upload)

          form.append('file', upload.file)
          // form.append('cropSettings', JSON.stringify(upload.coordinates))

          promises.push(
            this.$axios.post(
              `/medias/${modelType}/${modelId}/${collection}/${upload.fieldName}`,
              form,
              { 'Content-Type': 'multipart/form-data', test: 'TOTO' }
            )
          )
        })
        Promise.all(promises)
      }
    }
  }
}
