<template>
  <div class="flex flex-col h-full">
    <ConversationRecipientUser :user="recipientUser" :variant="userVariant" />
    <ContainerScrollable class="flex-1" :reverse="true">
      <ConversationMessages />
      <CardOrganisationInfos v-if="organisation" :organisation="organisation" />
      <ConversationOrganisationContextualAction />
    </ContainerScrollable>
    <ConversationForm />
  </div>
</template>

<script>
import ConversationRecipientUser from '@/components/messaging/ConversationRecipientUser.vue'
import CardOrganisationInfos from '~/components/messaging/CardOrganisationInfos.vue'
import ConversationMessages from '@/components/messaging/ConversationMessages.vue'
import ConversationForm from '@/components/messaging/ConversationForm.vue'
import ConversationOrganisationContextualAction from '@/components/messaging/ConversationOrganisationContextualAction.vue'

export default {
  components: {
    ConversationRecipientUser,
    CardOrganisationInfos,
    ConversationMessages,
    ConversationForm,
    ConversationOrganisationContextualAction
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    },
    recipientUser () {
      return this.conversation.users.filter(user => user.id != this.$store.getters.profile.user_id)[0]
    },
    organisation () {
      return this.conversation.conversable
    },
    userVariant () {
      // TODO variant referent / responsable / admin
      return 'referent'
    }
  },
  methods: {

  }
}
</script>
