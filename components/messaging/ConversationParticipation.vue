<template>
  <div>
    <ConversationRecipientUser :user="recipientUser" />
    <ConversationParticipationContextualAction :conversation="conversation" />
  </div>
</template>

<script>
import ConversationRecipientUser from '@/components/messaging/ConversationRecipientUser.vue'
import ConversationParticipationContextualAction from '@/components/messaging/ConversationParticipationContextualAction.vue'

export default {
  components: {
    ConversationRecipientUser,
    ConversationParticipationContextualAction
  },
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  computed: {
    recipientUser () {
      return this.conversation.users.filter(user => user.id != this.$store.getters.profile.user_id)[0]
    },
    mission () {
      return this.conversation.conversable.mission
    }
  }
}
</script>

<style>

</style>
