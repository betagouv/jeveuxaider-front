<template>
  <div />
</template>

<script>

export default {
  components: {},
  layout: 'messages',
  mounted () {
    if (this.$mq == 'xl') {
      this.getLastReadConversation()
    }
  },
  methods: {
    async getLastReadConversation () {
      if (!this.$store.state.auth.isImpersonate) {
        const { data: conversation } = await this.$axios.get('/user/last-read-conversation')
        if (conversation) {
          this.$router.push(`/messages/${conversation.id}`)
        }
      }
    }
  }
}
</script>
