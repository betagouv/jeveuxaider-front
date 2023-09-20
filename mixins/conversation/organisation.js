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
    organisation() {
      return this.conversation.conversable
    },
    isAssociation() {
      return this.organisation.statut_juridique === 'Association'
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
