<template>
  <Conversation>
    <template #header>
      <template v-if="isCurrentUserBenevole">
        <ConversationRecipientResponsable :user="recipientUser" />
        <ConversationParticipationActionAsBenevole />
      </template>
      <template v-if="isCurrentUserResponsable">
        <ConversationRecipientBenevole :user="recipientUser" />
        <ConversationParticipationActionAsResponsable />
      </template>
    </template>

    <template #scroll-container-top>
      <CardInfosMission
        v-if="conversation.conversable.mission"
        :mission="conversation.conversable.mission"
        :show-places-left="isCurrentUserResponsable"
      />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientBenevole from '@/components/messaging/ConversationRecipientBenevole.vue'
import ConversationRecipientResponsable from '@/components/messaging/ConversationRecipientResponsable.vue'
import ConversationParticipationActionAsResponsable from '~/components/messaging/ConversationParticipationActionAsResponsable.vue'
import ConversationParticipationActionAsBenevole from '~/components/messaging/ConversationParticipationActionAsBenevole.vue'
import CardInfosMission from '@/components/messaging/CardInfosMission.vue'
import Conversation from '@/components/messaging/Conversation.vue'
import MixinConversationParticipation from '@/mixins/conversation/participation'

export default {
  components: {
    ConversationRecipientBenevole,
    ConversationRecipientResponsable,
    ConversationParticipationActionAsResponsable,
    ConversationParticipationActionAsBenevole,
    CardInfosMission,
    Conversation
  },
  mixins: [MixinConversationParticipation],
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    },
    recipientUser () {
      return this.conversation.users.filter(user => user.id != this.$store.getters.profile.user_id)[0]
    }
  }
}
</script>
