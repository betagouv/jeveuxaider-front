<template>
  <div class="flex flex-col h-full">
    <ConversationRecipientUser :user="recipientUser" :is-benevole="isBenevole" />
    <ConversationParticipationContextualAction :conversation="conversation" />
    <ContainerScrollable>
      <CardMissionInfos :mission="mission" />
      <ConversationMessages :conversation="conversation" />
    </ContainerScrollable>
    <ConversationForm :conversation="conversation" @submitted="onSubmitted" />
  </div>
</template>

<script>
import ConversationRecipientUser from '@/components/messaging/ConversationRecipientUser.vue'
import ConversationParticipationContextualAction from '@/components/messaging/ConversationParticipationContextualAction.vue'
import CardMissionInfos from '@/components/messaging/CardMissionInfos.vue'
import ConversationMessages from '@/components/messaging/ConversationMessages.vue'
import ConversationForm from '@/components/messaging/ConversationForm.vue'

export default {
  components: {
    ConversationRecipientUser,
    ConversationParticipationContextualAction,
    CardMissionInfos,
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
    mission () {
      return this.conversation.conversable.mission
    },
    isBenevole () {
      return (
        this.conversation.conversable.profile_id == this.$store.getters.profile.id
      )
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
