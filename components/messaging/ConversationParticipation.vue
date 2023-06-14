<template>
  <Conversation>
    <template #header>
      <ConversationRecipientUser :user="recipientUser" :variant="userVariant" />
      <ConversationContextualActionParticipation />
    </template>

    <template #scroll-container-top>
      <CardInfosMission v-if="conversation.conversable.mission" :mission="conversation.conversable.mission" />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientUser from '@/components/messaging/ConversationRecipientUser.vue'
import ConversationContextualActionParticipation from '@/components/messaging/ConversationContextualActionParticipation.vue'
import CardInfosMission from '@/components/messaging/CardInfosMission.vue'
import Conversation from '@/components/messaging/Conversation.vue'

export default {
  components: {
    ConversationRecipientUser,
    ConversationContextualActionParticipation,
    CardInfosMission,
    Conversation
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    },
    recipientUser () {
      return this.conversation.users.filter(user => user.id != this.$store.getters.profile.user_id)[0]
    },
    userVariant () {
      return this.conversation.conversable.profile_id == this.$store.getters.profile.id ? 'benevole' : 'responsable'
    }
  }
}
</script>
