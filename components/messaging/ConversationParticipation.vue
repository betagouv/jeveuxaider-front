<template>
  <Conversation>
    <template #header>
      <ConversationRecipientUser :user="recipientUser" :variant="userVariant" />
      <ConversationParticipationContextualAction />
    </template>

    <template #scroll-container-top>
      <CardMissionInfos v-if="conversation.conversable.mission" :mission="conversation.conversable.mission" />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientUser from '@/components/messaging/ConversationRecipientUser.vue'
import ConversationParticipationContextualAction from '@/components/messaging/ConversationParticipationContextualAction.vue'
import CardMissionInfos from '@/components/messaging/CardMissionInfos.vue'
import Conversation from '@/components/messaging/Conversation.vue'

export default {
  components: {
    ConversationRecipientUser,
    ConversationParticipationContextualAction,
    CardMissionInfos,
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
