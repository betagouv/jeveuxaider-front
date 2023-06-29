export default {
  data () {
    return {
      showArchiveConversationModal: false,
      showUnarchiveConversationModal: false
    }
  },
  computed: {
    isCurrentUserReferentOrAdmin () {
      return ['referent', 'admin'].includes(this.$store.getters.contextRole)
    },
    isCurrentUserResponsable () {
      return this.$store.getters.contextRole === 'responsable'
    },
    conversation () {
      return this.$store.getters['messaging/activeConversation']
    },
    mission () {
      return this.conversation.conversable_type === 'App\\Models\\Participation' ? this.conversation.conversable.mission : this.conversation.conversable
    },
    formattedDates () {
      const startDate = this.mission.start_date
      const endDate = this.mission.end_date
      if (!startDate) {
        return
      }
      if (startDate && endDate) {
        if (this.$dayjs(startDate).isSame(this.$dayjs(endDate))) {
          return `Le ${this.$dayjs(startDate).format('D MMMM YYYY')}`
        }
        return `Du ${this.$dayjs(startDate).format('D MMMM YYYY')} au ${this.$dayjs(endDate).format('D MMMM YYYY')}`
      }

      return `À partir du ${this.$dayjs(startDate).format('D MMMM YYYY')}`
    },
    formattedCommitment () {
      if (this.mission.commitment__time_period) {
        return `${this.$options.filters.label(this.mission.commitment__duration, 'duration')} par ${this.$options.filters.label(this.mission.commitment__time_period, 'time_period')}`
      }
      return this.mission.commitment__duration ? this.$options.filters.label(this.mission.commitment__duration, 'duration') : null
    },
    canArchive () {
      return this.$store.getters['messaging/isCurrentUserInConversation'] && !this.$store.getters['messaging/isConversationArchivedForCurrentUser']
    },
    canUnarchive () {
      return this.$store.getters['messaging/isCurrentUserInConversation'] && this.$store.getters['messaging/isConversationArchivedForCurrentUser']
    }
  },
  methods: {
    async handleArchive () {
      await this.$axios.post(`/conversations/${this.conversation.id}/archive`)
      this.$store.dispatch('messaging/selectNextActiveConversation')
    },
    async handleUnarchive () {
      await this.$axios.post(`/conversations/${this.conversation.id}/unarchive`)
      this.$store.dispatch('messaging/selectNextActiveConversation')
    }
  }
}
