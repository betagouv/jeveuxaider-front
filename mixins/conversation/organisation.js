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
    organisation () {
      return this.conversation.conversable
    },
    isAssociation () {
      return this.organisation.statut_juridique === 'Association'
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
