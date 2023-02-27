<template>
  <Conversation>
    <template #header>
      <ConversationRecipientUser :user="recipientUser" :variant="userVariant" />
      <ConversationOrganisationContextualAction />
    </template>

    <template #scroll-container-top>
      <CardOrganisationInfos v-if="conversation.conversable" :organisation="conversation.conversable" />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientUser from '@/components/messaging/ConversationRecipientUser.vue'
import CardOrganisationInfos from '~/components/messaging/CardOrganisationInfos.vue'
import ConversationOrganisationContextualAction from '@/components/messaging/ConversationOrganisationContextualAction.vue'
import Conversation from '@/components/messaging/Conversation.vue'

export default {
  components: {
    ConversationRecipientUser,
    CardOrganisationInfos,
    ConversationOrganisationContextualAction,
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
