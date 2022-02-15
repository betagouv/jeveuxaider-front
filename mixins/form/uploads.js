export default {
  data () {
    return {
      uploads: {
        add: [], /* New files to upload */
        update: [], /* Files to update */
        delete: [] /* Files to delete */
      }
      // suffix: 0
    }
  },
  methods: {
    addFiles (payload) {
      payload.files.forEach((file) => {
        const name = file.name
        // @todo: this.uploads dans un store pour corriger probleme lorsque plusieurs fois le meme fichier
        // if (this.uploads.add.some(upload => upload.name == file.name)) {
        //   name = file.name.replace(/(\.[\w\d_-]+)$/i, `_${this.suffix}$1`)
        //   this.suffix++
        // }
        this.uploads.add.push({ file, collection: payload.collection, name })
      })
    },
    deleteFile (file) {
      if (file.id) {
        this.uploads.delete.push(file)
        const updateIndex = this.uploads.update?.findIndex(upload => upload.id == file.id)
        if (updateIndex !== -1) {
          this.uploads.update.splice(updateIndex, 1)
        }
      } else {
        const index = this.uploads.add.findIndex(upload => upload.name === file.name)
        this.uploads.add.splice(index, 1)
      }
    },
    onManipulationsChange (payload) {
      // @todo: this.uploads dans un store pour corriger probleme lorsque plusieurs fois le meme fichier
      // console.log('onManipulationsChange', payload.file)

      if (payload.file.id) {
        this.uploads.update.splice(
          this.uploads.update.findIndex(upload => upload.id === payload.file.id),
          1,
          { ...payload.file, manipulations: payload.manipulations }
        )
      } else {
        const index = this.uploads.add.findIndex(upload => upload.name === payload.file.name)
        this.uploads.add.splice(
          index,
          1,
          { ...this.uploads.add[index], manipulations: payload.manipulations }
        )
      }
    },

    async uploadFiles (modelType, modelId) {
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
              `/medias/${modelType}/${modelId}/${upload.collection}`,
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

        await Promise.all(promises)
      }
    }
  }
}
