export default {
  methods: {
    handleCopy(invitation) {
      const runtimeConfig = useRuntimeConfig()
      navigator.clipboard
        .writeText(`${runtimeConfig.public.appUrl}/invitations/${invitation.token}`)
        .then(() => {
          this.$toast.success("Le lien d'invitation a été copié dans votre presse papier (CTRL+V)")
        })
        .catch((err) => {
          this.$toast.error(
            `Votre navigateur ne permet pas de copier le lien : ${runtimeConfig.public.appUrl}/invitations/${invitation.token}`
          )
          console.log('Something went wrong', err)
        })
    },
    handleResendEmail(invitation) {
      apiFetch(`/invitations/${invitation.token}/resend`, {
        method: 'POST',
      })
        .then(() => {
          this.$toast.success("L'invitation a été envoyée à " + invitation.email)
          this.$emit('updated')
        })
        .catch((err) => {
          console.log('Something went wrong', err)
        })
    },
    handleDelete(invitation) {
      this.invitationSelected = invitation
      this.showAlertDeleted = true
    },
    async handleConfirmDelete() {
      await apiFetch(`/invitations/${this.invitationSelected.token}/delete`, {
        method: 'DELETE',
      }).catch((err) => {
        console.log('Something went wrong', err)
        this.showAlertDeleted = false
      })
      this.$toast.success("L'invitation a été supprimée : " + this.invitationSelected.email)
      this.showAlertDeleted = false
    },
    roleLabel(role) {
      switch (role) {
        case 'benevole':
          return 'Bénévole'
        case 'responsable_organisation':
          return 'Responsable organisation'
        case 'responsable_reseau':
          return 'Responsable réseau'
        case 'responsable_territoire':
          return 'Responsable territoire'
        case 'referent_regional':
          return 'Référent régional'
        case 'referent_departemental':
          return 'Référent départemental'
        case 'responsable_antenne':
          return "Antenne d'un réseau"
        default:
          return role
      }
    },
  },
}
