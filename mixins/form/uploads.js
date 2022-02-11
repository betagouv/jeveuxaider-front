export default {
  data () {
    return {
      uploads: {
        add: [], /* New files to upload */
        update: [], /* Files to update */
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
        const uploadObject = { file, attribute: payload.attribute, name: file.name }
        if (existingIndex !== -1) {
          this.uploads.add.splice(existingIndex, 1, uploadObject)
        } else {
          this.uploads.add.push(uploadObject)
        }
      })
    },
    deleteFile (file, index) {
      if (file.id) {
        this.uploads.delete.push(file)
        const updateIndex = this.uploads.update?.findIndex(upload => upload.id == file.id)
        if (updateIndex !== -1) {
          this.uploads.update.splice(updateIndex, 1)
        }
      } else {
        this.uploads.add.splice(index, 1)
      }
    },
    onManipulationsChange (payload, index) {
      if (payload.file.id) {
        this.uploads.update.splice(index, 1, { ...payload.file, manipulations: payload.manipulations })
      } else {
        this.uploads.add.splice(index, 1, { ...this.uploads.add[index], manipulations: payload.manipulations })
      }
    },

    uploadFiles (modelType, modelId, collection) {
      if (this.form.id) {
        const promises = []

        // Files to be deleted
        this.uploads.delete.forEach((upload) => {
          promises.push(
            this.$axios.delete(`/medias/${upload.id}`)
          )
        })

        // New files to be added.
        this.uploads.add.forEach((upload) => {
          const form = new FormData()
          form.append('file', upload.file)
          form.append('manipulations', JSON.stringify(upload.manipulations))

          promises.push(
            this.$axios.post(
              `/medias/${modelType}/${modelId}/${collection}/${upload.attribute}`,
              form,
              { 'Content-Type': 'multipart/form-data' }
            )
          )
        })

        // Files to be updated.
        this.uploads.update.forEach((upload) => {
          promises.push(
            this.$axios.put(`/medias/${upload.id}`, { manipulations: upload.manipulations })
          )
        })

        Promise.all(promises)
      }
    }
  }
}
