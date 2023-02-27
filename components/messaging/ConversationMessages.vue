<template>
  <div class="mb-auto divide-y">
    <div
      v-for="message in messages"
      :key="message.id"
      class="p-8"
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
  props: {
    messages: { type: Array, required: true }
  },
  data () {
    return {}
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    }
  },
  methods: {}
}
</script>
