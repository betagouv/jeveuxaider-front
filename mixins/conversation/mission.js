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
      return this.$store.getters['messaging2/activeConversation']
    },
    mission () {
      return this.conversation.conversable
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
    canArchive () {
      return this.$store.getters['messaging2/isCurrentUserInConversation'] && !this.$store.getters['messaging2/isConversationArchivedForCurrentUser']
    },
    canUnarchive () {
      return this.$store.getters['messaging2/isCurrentUserInConversation'] && this.$store.getters['messaging2/isConversationArchivedForCurrentUser']
    }
  },
  methods: {
    async handleArchive () {
      await this.$axios.post(`/conversations/${this.conversation.id}/archive`)
      this.$store.dispatch('messaging2/selectNextActiveConversation')
    },
    async handleUnarchive () {
      await this.$axios.post(`/conversations/${this.conversation.id}/unarchive`)
      this.$store.dispatch('messaging2/selectNextActiveConversation')
    }
  }
}
