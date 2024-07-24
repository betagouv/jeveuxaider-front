export default {
  created() {
    if (!this.form.metatags) {
      this.form.metatags = { properties: {} }
    }
  },
  methods: {
    handleMetatags(modelType, modelId) {
      this.trimAllProperties()
      const isAllPropertiesEmpty = Object.values(this.form.metatags.properties).every(
        (x) => x === null || x === ''
      )

      if (!this.form.metatags.id && !isAllPropertiesEmpty) {
        this.addMetatags(modelType, modelId)
        return
      }
      if (this.form.metatags.id) {
        isAllPropertiesEmpty ? this.deleteMetatags() : this.updateMetatags()
      }
    },
    async addMetatags(modelType, modelId) {
      await apiFetch(`${modelType}/${modelId}/metatags`, {
        method: 'POST',
        body: this.form.metatags,
      })
    },
    async deleteMetatags() {
      await apiFetch(`metatags/${this.form.metatags.id}`, {
        method: 'DELETE',
      })
    },
    async updateMetatags() {
      await apiFetch(`/metatags/${this.form.metatags.id}`, {
        method: 'PUT',
        body: this.form.metatags,
      })
    },
    trimAllProperties() {
      if (!!this.form.metatags.properties) {
        Object.keys(this.form.metatags.properties).forEach((key) => {
          this.form.metatags.properties[key] = this.form.metatags.properties[key].trim()
        })
      }
    },
  },
}
