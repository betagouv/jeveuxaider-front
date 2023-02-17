<template>
  <div class="flex flex-col h-full">
    <ConversationRecipientUser :user="recipientUser" :variant="userVariant" />
    <ConversationParticipationContextualAction :conversation="conversation" />
    <ContainerScrollable>
      <CardOrganisationInfos :organisation="organisation" />
      <ConversationMessages :conversation="conversation" />
    </ContainerScrollable>
    <ConversationForm :conversation="conversation" @submitted="onSubmitted" />
  </div>
</template>

<script>
import ConversationRecipientUser from '@/components/messaging/ConversationRecipientUser.vue'
import ConversationParticipationContextualAction from '@/components/messaging/ConversationParticipationContextualAction.vue'
import CardOrganisationInfos from '~/components/messaging/CardOrganisationInfos.vue'
import ConversationMessages from '@/components/messaging/ConversationMessages.vue'
import ConversationForm from '@/components/messaging/ConversationForm.vue'

export default {
  components: {
    ConversationRecipientUser,
    ConversationParticipationContextualAction,
    CardOrganisationInfos,
    ConversationMessages,
    ConversationForm
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
    organisation () {
      return this.conversation.conversable
    },
    userVariant () {
      // TODO variant referent / responsable / admin
      return 'referent'
    }
  },
  methods: {
    onSubmitted (message) {
      console.log('onSubmitted', message)
    }
  }
}
</script>

<style>

</style>
