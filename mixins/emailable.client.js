export default {
  data () {
    return {
      emailableResponse: null
    }
  },
  methods: {
    async emailableValidation () {
      // Bypass
      if (this.$config.emailable?.enabled === 'false') {
        return true
      }

      // do not redo the call if the email did not change
      if (this.emailableResponse?.content.email !== this.form.email) {
        const { data: response } = await this.$axios.get(`/emailable/verify/${this.form.email}`)
        this.emailableResponse = response
      }

      return this.emailableResponse.code !== 200 ? true : this.emailableResponse.content.state !== 'undeliverable'
    }
  }
}
