export default {
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
          this.$stores.softGate.showOverlay = false
          this.$stores.archivedUser.email = email
          this.$stores.archivedUser.showOverlay = true
        }
      })
    },
  },
}
