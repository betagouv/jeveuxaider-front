<template>
  <div>@TODO</div>
</template>

<script>
export default defineNuxtComponent({
  setup() {
    definePageMeta({
      layout: 'messages-params',
      middleware: ['authenticated'],
    })
  },
  components: {},
  created() {},
  methods: {
    async getLastReadConversation() {
      if (!this.$stores.auth.isImpersonate) {
        const response = await apiFetch('/user/last-read-conversation')
        if (response.last_read_conversation) {
          this.$router.push(`/messages/${response.last_read_conversation.id}`)
        }
      }
    },
  },
})
</script>
