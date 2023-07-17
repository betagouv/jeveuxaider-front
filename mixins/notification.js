export default {
  computed: {
    notificationResolver () {
      switch (this.notification.type) {
        case 'App\\Notifications\\ParticipationCreated':
          return {
            emoji: '✊',
            message: 'Votre demande de participation **a bien été enregistrée**',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        case 'App\\Notifications\\ParticipationBeingProcessed':
          return {
            emoji: '⏳',
            message: 'Votre demande de participation **est en cours de traitement**',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        case 'App\\Notifications\\ParticipationValidated':
          return {
            emoji: '😇',
            message: 'Votre demande de participation **a été validée**',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        case 'App\\Notifications\\ParticipationDeclined':
          return {
            emoji: '🙁',
            message: 'Votre demande de participation **a été refusée**',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        case 'App\\Notifications\\ParticipationCanceled':
          return {
            emoji: '🙁',
            message: 'Votre demande de participation **a été annulée**',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        case 'App\\Notifications\\DocumentSubmitted':
          return {
            emoji: '📥',
            message: 'Une **nouvelle ressource** est accessible dans **votre espace**',
            contexteIcon: 'RiDownload2Line',
            contexte: this.notification.data.ressource_title,
            redirection: '/admin/ressources'
          }
        case 'App\\Notifications\\StructureSubmitted':
          return {
            emoji: '🏫',
            message: 'Une nouvelle organisation est **en attente de validation** dans votre département',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.structure_name,
            redirection: `/admin/organisations/${this.notification.data.structure_id}`
          }
        case 'App\\Notifications\\MissionAlmostFull':
          return {
            emoji: '🔥',
            message: 'Votre mission est **presque complète**',
            contexteIcon: 'RiBuildingFill',
            contexte: this.notification.data.mission_name,
            redirection: `/admin/missions/${this.notification.data.mission_id}`
          }
        case 'App\\Notifications\\ParticipationWaitingValidation':
          return {
            emoji: '👊',
            message: 'Vous avez une **nouvelle demande de participation**',
            contexteIcon: 'RiTeamLine',
            contexte: this.notification.data.mission_name,
            redirection: `/messages/${this.notification.data.conversation_id}`
          }
        case 'App\\Notifications\\MissionBeingProcessed':
          return {
            emoji: '⏳',
            message: 'Votre mission est **en cours de traitement**',
            contexteIcon: 'RiTeamLine',
            contexte: this.notification.data.mission_name,
            redirection: `/admin/missions/${this.notification.data.mission_id}`
          }
        case 'App\\Notifications\\MissionReactivated':
          return {
            emoji: '🥳',
            message: 'Votre mission est **de nouveau active**',
            contexteIcon: 'RiTeamLine',
            contexte: this.notification.data.mission_name,
            redirection: `/admin/missions/${this.notification.data.mission_id}`
          }
        case 'App\\Notifications\\MissionDeactivated':
          return {
            emoji: '😢',
            message: 'Votre mission a été **désactivée**',
            contexteIcon: 'RiTeamLine',
            contexte: this.notification.data.mission_name,
            redirection: `/admin/missions/${this.notification.data.mission_id}`
          }
        case 'App\\Notifications\\MissionSignaled':
          return {
            emoji: '😢',
            message: 'Votre mission a été **signalée**',
            contexteIcon: 'RiTeamLine',
            contexte: this.notification.data.mission_name,
            redirection: `/admin/missions/${this.notification.data.mission_id}`
          }
        case 'App\\Notifications\\MissionValidated':
          return {
            emoji: '👍',
            message: 'Votre mission a été **validée**',
            contexteIcon: 'RiTeamLine',
            contexte: this.notification.data.mission_name,
            redirection: `/admin/missions/${this.notification.data.mission_id}`
          }
        case 'App\\Notifications\\MissionWaitingValidation':
          return {
            emoji: '🙏',
            message: 'Votre mission est **en attente de validation**',
            contexteIcon: 'RiTeamLine',
            contexte: this.notification.data.mission_name,
            redirection: `/admin/missions/${this.notification.data.mission_id}`
          }
        case 'App\\Notifications\\ResetPassword':
          return {
            emoji: '🔐',
            message: 'Une demande de **réinitialisation de votre mot de passe** a été effectuée',
            redirection: null
          }
        default:
          return {
            emoji: '✊',
            message: 'Nouvelle notification',
            contexte: this.notification.type,
            redirection: null
          }
      }
    }
  },
  methods: {
    handleClick (notification) {
      if (this.notificationResolver.redirection) {
        this.$router.push(this.notificationResolver.redirection)
      }
      if (this.notification.read_at === null && !this.$store.state.auth.isImpersonate) {
        this.$store.dispatch('notifications/markNotificationAsRead', notification)
        this.$store.commit('notifications/decrementUnreadNotificationsCount')
        this.$emit('refetch')
      }
    }
  }
}
