export default {
  data() {
    return {
      showArchiveConversationModal: false,
      showUnarchiveConversationModal: false,
    }
  },
  computed: {
    isCurrentUserReferentOrAdmin() {
      return ['referent', 'admin'].includes(this.$stores.auth.contextRole)
    },
    isCurrentUserResponsable() {
      return this.$stores.auth.contextRole === 'responsable'
    },
    conversation() {
      return this.$stores.messaging.activeConversation
    },
    mission() {
      return this.conversation.conversable_type === 'App\\Models\\Participation'
        ? this.conversation.conversable.mission
        : this.conversation.conversable
    },
    formattedDates() {
      const startDate = this.mission.start_date
      const endDate = this.mission.end_date
      if (!startDate) {
        return
      }
      if (startDate && endDate) {
        if (this.$dayjs(startDate).isSame(this.$dayjs(endDate))) {
          return `Le ${this.$dayjs(startDate).format('D MMMM YYYY')}`
        }
        return `Du ${this.$dayjs(startDate).format(
          'D MMMM YYYY'
        )} au ${this.$dayjs(endDate).format('D MMMM YYYY')}`
      }

      return `À partir du ${this.$dayjs(startDate).format('D MMMM YYYY')}`
    },
    formattedCommitment() {
      if (this.mission.commitment__time_period) {
        return `${this.$filters.label(
          this.mission.commitment__duration,
          'duration'
        )} par ${this.$filters.label(
          this.mission.commitment__time_period,
          'time_period'
        )}`
      }
      return this.mission.commitment__duration
        ? this.$filters.label(this.mission.commitment__duration, 'duration')
        : null
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
