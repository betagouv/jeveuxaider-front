<template>
  <div class="mb-auto flex flex-col gap-6 lg:gap-8 mt-8">
    <div v-for="message in messages" :key="message.id">
      <MessageChat v-if="message.type === 'chat'" :message="message" class="max-w-[548px] w-full" />
      <MessageParticipationContextual
        v-if="
          conversation.conversable_type == 'App\\Models\\Participation' &&
          message.type === 'contextual'
        "
        :message="message"
      />
    </div>
  </div>
</template>

<script>
import MessageChat from '@/components/messaging/MessageChat.vue'
import MessageParticipationContextual from '@/components/messaging/MessageParticipationContextual.vue'

export default defineNuxtComponent({
  components: {
    MessageChat,
    MessageParticipationContextual,
  },
  data() {
    return {}
  },
  computed: {
    messages() {
      return this.$stores.messaging.activeConversationMessages
    },
    conversation() {
      return this.$stores.messaging.activeConversation
    },
  },
})
</script>
