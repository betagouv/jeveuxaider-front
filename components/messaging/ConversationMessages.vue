<template>
  <div class="mb-auto">
    <div
      v-for="message in messages.reverse()"
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
      messages: []
    }
  },
  async fetch () {
    const { data: response } = await this.$axios.get(`/conversationsv2/${this.conversation.id}/messages`)
    this.messages = response.data
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    }
  },
  methods: {}
}
</script>
