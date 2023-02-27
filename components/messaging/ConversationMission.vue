<template>
  <Conversation>
    <template #header>
      <ConversationRecipientUser :user="recipientUser" :variant="userVariant" />
      <ConversationContextualActionMission />
    </template>

    <template #scroll-container-top>
      <CardInfosMission v-if="conversation.conversable" :mission="conversation.conversable" />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientUser from '@/components/messaging/ConversationRecipientUser.vue'
import ConversationContextualActionMission from '@/components/messaging/ConversationContextualActionMission.vue'
import CardInfosMission from '@/components/messaging/CardInfosMission.vue'
import Conversation from '@/components/messaging/Conversation.vue'

export default {
  components: {
    ConversationRecipientUser,
    ConversationContextualActionMission,
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
      // TODO variant referent / responsable / admin
      return 'referent'
    }
  },
  methods: {}
}
</script>
