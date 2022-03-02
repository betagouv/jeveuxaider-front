export default {
  methods: {
    handleCopy (invitation) {
      navigator.clipboard.writeText(`${this.$config.appUrl}/invitations/${invitation.token}`)
        .then(() => {
          this.$refs[`dropdown-${invitation.id}`][0].show = false
          this.$toast.success("Le lien d'invitation a été copié dans votre presse papier (CTRL+V)")
        })
        .catch((err) => {
          this.$toast.error(`Votre navigateur ne permet pas de copier le lien : ${this.$config.appUrl}/invitations/${invitation.token}`)
          console.log('Something went wrong', err)
        })
    },
    handleResendEmail (invitation) {
      this.$axios.post(`/invitations/${invitation.token}/resend`).then(() => {
        this.$toast.success("L'invitation a été envoyée à " + invitation.email)
        this.$emit('updated')
      }).catch((err) => {
        console.log('Something went wrong', err)
      })
    },
    handleDelete (invitation) {
      this.invitationSelected = invitation
      this.showAlertDeleted = true
    },
    async handleConfirmDelete () {
      await this.$axios.delete(`/invitations/${this.invitationSelected.token}/delete`).catch((err) => {
        console.log('Something went wrong', err)
        this.showAlertDeleted = false
      })
      this.$toast.success("L'invitation a été supprimée : " + this.invitationSelected.email)
      this.showAlertDeleted = false
    },
    roleLabel (role) {
      switch (role) {
        case 'referent_regional':
          return 'Référent régional'
        case 'referent_departemental':
          return 'Référent départemental'
        default:
          return role
      }
    }
  }
}
