<template>
  <ConversationPage v-if="conversationIsSet" />
</template>

<script>
import ConversationPage from '@/components/conversation/Page.vue'

export default {
  components: {
    ConversationPage
  },
  layout: 'messages',
  data () {
    return {
      conversationIsSet: false
    }
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging/conversations']
        ? this.$store.getters['messaging/conversations'][0]
        : null
    }
  },
  watch: {
    conversation: {
      immediate: true,
      async handler () {
        if (this.conversation && !this.conversationIsSet) {
          const { data: conversation } = await this.$axios.get(`/conversations/${this.conversation.id}`)
          this.$store.commit('messaging/setConversation', conversation)
          this.$store.commit('messaging/replaceConversationInConversations', conversation)
          this.$store.dispatch('messaging/fetchUnreadMessages')
          this.conversationIsSet = true
        }
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('messaging/setNewMessagesCount', 0)
  }
}
</script>
