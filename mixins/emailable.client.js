export default {
  data() {
    return {
      emailableResponse: null,
    }
  },
  methods: {
    async emailableValidation() {
      const runtimeConfig = useRuntimeConfig()

      // Bypass
      if (runtimeConfig.public.emailable?.enabled === 'false') {
        return true
      }

      // Don't redo the call if the email did not change
      if (this.emailableResponse?.content.email !== this.form.email) {
        const response = await apiFetch(`/emailable/verify/${this.form.email}`)
        this.emailableResponse = response
      }

      return this.emailableResponse.code !== 200
        ? true
        : this.emailableResponse.content.state !== 'undeliverable'
    },
  },
}
