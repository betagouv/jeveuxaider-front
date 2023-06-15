<template>
  <Conversation>
    <template #header>
      <ConversationRecipientResponsable :user="recipientUser" />
      <ConversationContextualActionMission />
    </template>

    <template #scroll-container-top>
      <CardInfosMission v-if="conversation.conversable" :mission="conversation.conversable" />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientResponsable from '~/components/messaging/ConversationRecipientResponsable.vue'
import ConversationContextualActionMission from '@/components/messaging/ConversationContextualActionMission.vue'
import CardInfosMission from '@/components/messaging/CardInfosMission.vue'
import Conversation from '@/components/messaging/Conversation.vue'

export default {
  components: {
    ConversationRecipientResponsable,
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
