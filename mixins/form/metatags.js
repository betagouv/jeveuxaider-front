export default {
  created () {
    if (!this.form.metatags) {
      this.$set(this.form, 'metatags', { properties: {} })
    }
  },
  methods: {
    handleMetatags (modelType, modelId) {
      this.trimAllProperties()
      const isAllPropertiesEmpty = Object.values(this.form.metatags.properties).every(x => x === null || x === '')

      if (!this.form.metatags.id && !isAllPropertiesEmpty) {
        this.addMetatags(modelType, modelId)
        return
      }
      if (this.form.metatags.id) {
        isAllPropertiesEmpty ? this.deleteMetatags() : this.updateMetatags()
      }
    },
    async addMetatags (modelType, modelId) {
      await this.$axios.post(`${modelType}/${modelId}/metatags`, this.form.metatags)
    },
    async deleteMetatags () {
      await this.$axios.delete(`metatags/${this.form.metatags.id}`)
    },
    async updateMetatags () {
      await this.$axios.put(`/metatags/${this.form.metatags.id}`, this.form.metatags)
    },
    trimAllProperties () {
      const trimmedProperties = Object.keys(this.form.metatags.properties).forEach(
        (key) => { this.form.metatags.properties[key] = this.form.metatags.properties[key].trim() }
      )
      this.$set(this.form, 'metatags.properties', trimmedProperties)
    }
  }
}
