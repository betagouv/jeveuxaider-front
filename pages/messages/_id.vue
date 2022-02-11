<template>
  <ConversationPage />
</template>

<script>
import ConversationPage from '@/components/conversation/page'

export default {
  components: {
    ConversationPage
  },
  layout: 'messages',
  async asyncData ({ store, error, $api, params, $axios }) {
    const { data: conversation } = await $axios.get(`/conversation/${params.id}`)

    if (!conversation) {
      return error({ statusCode: 403 })
    }

    store.commit('messaging/setConversation', conversation)

    // Remove conversation from user unread conversations
    // if (store.getters.user.unreadConversations.includes(conversation.id)) {
    //   store.commit(
    //     'auth/deleteConversationFromUserUnreadConversations',
    //     conversation.id
    //   )
    // }
  },
  mounted () {
    if (this.$store.getters['messaging/isMobile']) {
      this.$store.commit('messaging/setShowPanelLeft', false)
    }
    this.$store.commit('messaging/setShowPanelCenter', true)
  },
  beforeDestroy () {
    this.$store.commit('messaging/setNewMessagesCount', 0)
  }
}
</script>
