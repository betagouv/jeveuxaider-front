export default {
  data () {
    return {
      uploads: {
        add: [], /* New files to upload */
        delete: [] /* Files to delete */
      }
    }
  },
  methods: {
    addFiles (payload) {
      payload.files.forEach((file) => {
        const existingIndex = this.uploads.add.findIndex(
          upload => (upload.name === file.name && upload.lastModified === file.lastModified)
        )
        if (existingIndex != -1) {
          this.uploads.add.splice(existingIndex, 1, { file, field: payload.field })
        } else {
          this.uploads.add.push({ file, field: payload.field })
        }
      })
    },
    deleteFile (file) {
      if (file.id) {
        this.uploads.delete.push(file)
      } else {
        const index = this.uploads.add.findIndex(
          upload => upload.field === file.field
        )
        this.uploads.add.splice(index, 1)
      }
    },
    uploadFiles (modelType, modelId, collection) {
      if (this.form.id) {
        const promises = []

        // Files to delete
        this.uploads.delete.forEach((upload) => {
          promises.push(
            this.$axios.delete(`/medias/${upload.id}`)
          )
        })

        // New files to be added.
        this.uploads.add.forEach((upload) => {
          console.log(upload)
          const form = new FormData()
          form.append('file', upload.file)
          // form.append('cropSettings', JSON.stringify(upload.coordinates))

          promises.push(
            this.$axios.post(
              `/medias/${modelType}/${modelId}/${collection}/${upload.field}`,
              form,
              { 'Content-Type': 'multipart/form-data' }
            )
          )
        })
        Promise.all(promises)
      }
    }
  }
}
