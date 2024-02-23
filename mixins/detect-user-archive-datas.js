export default {
  data() {
    return {
      showModalUnarchive: false,
    }
  },
  methods: {
    async onBlurEmailCheckIfUserArchiveDatasExists() {
      this.validate('email')
      if (this.isValid('email')) {
        this.checkIfUserArchiveDatasExists(this.form.email)
      }
    },
    async checkIfUserArchiveDatasExists(email) {
      await apiFetch(`/user/archive/exist`, {
        method: 'POST',
        body: { email },
      }).then((response) => {
        if (response.exist === true) {
          this.showModalUnarchive = true
        }
      })
    },
  },
}
