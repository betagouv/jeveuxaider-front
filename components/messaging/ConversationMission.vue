<template>
  <Conversation>
    <template #header>
      <template v-if="isCurrentUserResponsable">
        <ConversationRecipientReferentOrAdmin :user="recipientUser" />
        <ConversationMissionActionAsResponsable />
      </template>
      <template v-if="isCurrentUserReferentOrAdmin">
        <ConversationRecipientResponsable :user="recipientUser" />
        <ConversationMissionActionAsReferent />
      </template>
    </template>

    <template #scroll-container-top>
      <CardInfosMission v-if="mission" :mission="mission" />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientResponsable from '~/components/messaging/ConversationRecipientResponsable.vue'
import ConversationMissionActionAsReferent from '~/components/messaging/ConversationMissionActionAsReferent.vue'
import CardInfosMission from '@/components/messaging/CardInfosMission.vue'
import Conversation from '@/components/messaging/Conversation.vue'
import MixinConversationMission from '@/mixins/conversation/mission'

export default {
  components: {
    ConversationRecipientResponsable,
    ConversationMissionActionAsReferent,
    CardInfosMission,
    Conversation
  },
  mixins: [MixinConversationMission],
  computed: {
    recipientUser () {
      return this.conversation.users.filter(user => user.id != this.$store.getters.profile.user_id)[0]
    }
  },
  methods: {}
}
</script>
