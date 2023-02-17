<template>
  <div>
    <div
      v-for="message in messages"
      :key="message.id"
    >
      <div>Message content:{{ message.content }}</div>
      <div>Message created_at:{{ $dayjs(message.created_at).format('D MMM HH[h]mm') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      messages: []
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get(`/conversationsv2/${this.conversation.id}/messages`).then((response) => {
      this.loading = false
      this.messages = response.data.data
    })
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    }
  },
  created () {
    this.$fetch()
  }
}
</script>

<style>

</style>
