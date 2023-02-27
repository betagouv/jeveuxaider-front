<template>
  <Conversation>
    <template #header>
      <ConversationRecipientUser :user="recipientUser" :variant="userVariant" />
      <ConversationContextualActionOrganisation />
    </template>

    <template #scroll-container-top>
      <CardInfosOrganisation v-if="conversation.conversable" :organisation="conversation.conversable" />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientUser from '@/components/messaging/ConversationRecipientUser.vue'
import CardInfosOrganisation from '~/components/messaging/CardInfosOrganisation.vue'
import ConversationContextualActionOrganisation from '@/components/messaging/ConversationContextualActionOrganisation.vue'
import Conversation from '@/components/messaging/Conversation.vue'

export default {
  components: {
    ConversationRecipientUser,
    CardInfosOrganisation,
    ConversationContextualActionOrganisation,
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
