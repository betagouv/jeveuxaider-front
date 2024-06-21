export default {
  data() {
    return {
      showArchiveConversationModal: false,
      showUnarchiveConversationModal: false,
    }
  },
  computed: {
    isCurrentUserBenevole() {
      return this.conversation.conversable.profile_id == this.$stores.auth.profile.id
    },
    isCurrentUserResponsable() {
      return (
        this.conversation.conversable.profile_id &&
        this.conversation.conversable.profile_id !== this.$stores.auth.profile.id
      )
    },
    conversation() {
      return this.$stores.messaging.activeConversation
    },
    conversationUsers() {
      return this.$stores.messaging.activeConversation.users
    },
    participation() {
      return this.conversation.conversable
    },
    mission() {
      return this.participation.mission
    },
    structure() {
      return this.participation?.mission?.structure
    },
    hasCreneaux() {
      return this.participation.slots?.length > 0
    },
    isMissionRecurrent() {
      return this.participation.mission.date_type === 'recurring'
    },
    isMissionPonctual() {
      return this.participation.mission.date_type === 'ponctual'
    },
    participationShouldBeDone() {
      if (
        !['En attente de validation', 'En cours de traitement'].includes(this.participation.state)
      ) {
        return false
      }

      // Si créneaux avec une date passée
      if (
        this.hasCreneaux &&
        this.participation.slots.filter((slot) => this.$dayjs().startOf('day').isAfter(slot.date))
          .length > 0
      ) {
        return true
      }

      // Si date de fin passée et mission ponctuel
      if (
        this.isMissionPonctual &&
        this.mission.end_date &&
        this.$dayjs().startOf('day').isAfter(this.mission.end_date)
      ) {
        return true
      }

      // Si pas date de fin et date de début passée et mission ponctuel
      if (
        this.isMissionPonctual &&
        !this.mission.end_date &&
        this.$dayjs().startOf('day').isAfter(this.mission.start_date) &&
        this.$dayjs().startOf('day').subtract(1, 'month').isAfter(this.participation.created_at)
      ) {
        return true
      }

      // Si date de participation créée depuis plus de 2 mois et mission recurrente
      if (
        this.isMissionRecurrent &&
        this.mission.start_date &&
        this.$dayjs().startOf('day').subtract(1, 'month').isAfter(this.participation.created_at)
      ) {
        return true
      }

      return false
    },
    needTestimonial() {
      return (
        this.participation.state === 'Validée' &&
        this.mission.state === 'Terminée' &&
        !this.participation.temoignage &&
        !this.isTestimonialSubmitted
      )
    },
    canArchive() {
      return (
        this.$stores.messaging.isCurrentUserInConversation &&
        !this.$stores.messaging.isConversationArchivedForCurrentUser
      )
    },
    canUnarchive() {
      return (
        this.$stores.messaging.isCurrentUserInConversation &&
        this.$stores.messaging.isConversationArchivedForCurrentUser
      )
    },
  },
  methods: {
    async handleArchive() {
      await useApiFetch(`/conversations/${this.conversation.id}/archive`, {
        method: 'POST',
      })
      this.$stores.messaging.selectNextActiveConversation()
    },
    async handleUnarchive() {
      await useApiFetch(`/conversations/${this.conversation.id}/unarchive`, {
        method: 'POST',
      })
      this.$stores.messaging.selectNextActiveConversation()
    },
  },
}
