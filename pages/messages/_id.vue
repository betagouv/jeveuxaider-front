<template>
  <ConversationPage />
</template>

<script>
import ConversationPage from '@/components/conversation/Page.vue'

export default {
  components: {
    ConversationPage
  },
  layout: 'messages',
  async asyncData ({ store, error, $api, params, $axios }) {
    const { data: conversation } = await $axios.get(`/conversations/${params.id}`)

    if (!conversation) {
      return error({ statusCode: 403 })
    }

    store.commit('messaging/setConversation', conversation)
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
