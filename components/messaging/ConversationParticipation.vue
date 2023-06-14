<template>
  <Conversation>
    <template #header>
      <ConversationRecipientUser :user="recipientUser" :variant="userVariant" />
      <template v-if="userVariant === 'responsable'">
        <ConversationContextualResponsableActionParticipation />
      </template>
      <template v-if="userVariant === 'benevole'">
        <ConversationContextualBenevoleActionParticipation />
      </template>
    </template>

    <template #scroll-container-top>
      <CardInfosMission v-if="conversation.conversable.mission" :mission="conversation.conversable.mission" />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientUser from '@/components/messaging/ConversationRecipientUser.vue'
import ConversationContextualResponsableActionParticipation from '@/components/messaging/ConversationContextualResponsableActionParticipation.vue'
import ConversationContextualBenevoleActionParticipation from '@/components/messaging/ConversationContextualBenevoleActionParticipation.vue'
import CardInfosMission from '@/components/messaging/CardInfosMission.vue'
import Conversation from '@/components/messaging/Conversation.vue'

export default {
  components: {
    ConversationRecipientUser,
    ConversationContextualResponsableActionParticipation,
    ConversationContextualBenevoleActionParticipation,
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
