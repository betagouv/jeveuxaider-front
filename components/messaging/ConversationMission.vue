<template>
  <Conversation>
    <template #header>
      <template v-if="isCurrentUserResponsable">
        <ConversationRecipientReferentOrAdmin :user="recipientUser" />
      </template>
      <template v-if="isCurrentUserReferentOrAdmin">
        <ConversationRecipientResponsable :user="recipientUser" show-private-infos />
      </template>
    </template>

    <template #actions>
      <template v-if="isCurrentUserResponsable">
        <ConversationMissionActionAsResponsable v-if="conversation.conversable_type === 'App\\Models\\Mission'" />
      </template>
      <template v-if="isCurrentUserReferentOrAdmin">
        <ConversationMissionActionAsReferent v-if="conversation.conversable_type === 'App\\Models\\Mission'" />
      </template>
    </template>

    <template #scroll-container-top>
      <CardInfosMission />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientReferentOrAdmin from '~/components/messaging/ConversationRecipientReferentOrAdmin.vue'
import ConversationRecipientResponsable from '~/components/messaging/ConversationRecipientResponsable.vue'
import ConversationMissionActionAsReferent from '~/components/messaging/ConversationMissionActionAsReferent.vue'
import ConversationMissionActionAsResponsable from '~/components/messaging/ConversationMissionActionAsResponsable.vue'
import CardInfosMission from '@/components/messaging/CardInfosMission.vue'
import Conversation from '@/components/messaging/Conversation.vue'
import MixinConversationMission from '@/mixins/conversation/mission'

export default {
  components: {
    ConversationRecipientReferentOrAdmin,
    ConversationRecipientResponsable,
    ConversationMissionActionAsReferent,
    ConversationMissionActionAsResponsable,
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
