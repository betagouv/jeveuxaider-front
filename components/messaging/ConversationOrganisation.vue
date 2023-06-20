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
        <ConversationOrganisationActionAsResponsable v-if="conversation.conversable_type === 'App\\Models\\Structure'" />
      </template>
      <template v-if="isCurrentUserReferentOrAdmin">
        <ConversationOrganisationActionAsReferent v-if="conversation.conversable_type === 'App\\Models\\Structure'" />
      </template>
    </template>

    <template #scroll-container-top>
      <CardInfosOrganisation />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientReferentOrAdmin from '~/components/messaging/ConversationRecipientReferentOrAdmin.vue'
import ConversationRecipientResponsable from '~/components/messaging/ConversationRecipientResponsable.vue'
import CardInfosOrganisation from '~/components/messaging/CardInfosOrganisation.vue'
import ConversationOrganisationActionAsReferent from '~/components/messaging/ConversationOrganisationActionAsReferent.vue'
import ConversationOrganisationActionAsResponsable from '~/components/messaging/ConversationOrganisationActionAsResponsable.vue'
import Conversation from '@/components/messaging/Conversation.vue'
import MixinConversationOrganisation from '@/mixins/conversation/organisation'

export default {
  components: {
    ConversationRecipientReferentOrAdmin,
    ConversationRecipientResponsable,
    CardInfosOrganisation,
    ConversationOrganisationActionAsReferent,
    ConversationOrganisationActionAsResponsable,
    Conversation
  },
  mixins: [MixinConversationOrganisation],
  computed: {
    recipientUser () {
      return this.conversation.users.filter(user => user.id != this.$store.getters.profile.user_id)[0]
    }
  },
  methods: {}
}
</script>
