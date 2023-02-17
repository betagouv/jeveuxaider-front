<template>
  <div>
    <div
      v-for="message in messages"
      :key="message.id"
    >
      <MessageChat
        v-if="message.type === 'chat'"
        :message="message"
      />
      <MessageParticipationContextual
        v-if="conversation.conversable_type == 'App\\Models\\Participation' && message.type === 'contextual'"
        :message="message"
      />
    </div>
  </div>
</template>

<script>
import MessageChat from '@/components/messaging/MessageChat.vue'
import MessageParticipationContextual from '~/components/messaging/MessageParticipationContextual.vue'

export default {
  components: {
    MessageChat,
    MessageParticipationContextual
  },
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
  },
  methods: {
  }
}
</script>

<style>

</style>
