<template>
  <div />
</template>

<script>
export default defineNuxtComponent({
  setup() {
    definePageMeta({
      layout: 'messages',
      middleware: ['authenticated'],
    })
  },
  components: {},
  mounted() {
    if (this.$mq.current == 'xl') {
      this.getLastReadConversation()
    }
  },
  methods: {
    async getLastReadConversation() {
      if (!this.$stores.auth.isImpersonate) {
        const response = await apiFetch('/user/last-read-conversation')
        if (response.last_read_conversation) {
          navigateTo(`/messages/${response.last_read_conversation.id}`, { replace: true })
        }
      }
    },
  },
})
</script>
