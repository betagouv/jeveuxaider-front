export default {
  computed: {
    currentConversationUser () {
      return this.conversation.users.find((user) => {
        return user.id == this.$store.getters.profile.user_id
      })
    },
    hasUnreadMessage () {
      if (this.currentConversationUser.pivot.read_at == null) {
        return true
      }
      if (this.$dayjs(this.currentConversationUser.pivot.read_at).isSame(this.$dayjs(this.conversation.updated_at))) {
        return false
      }
      if (this.$dayjs(this.currentConversationUser.pivot.read_at).isAfter(this.$dayjs(this.conversation.updated_at))) {
        return false
      }
      return true
    }
  }
}
