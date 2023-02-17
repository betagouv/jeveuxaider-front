<template>
  <div class="flex flex-col h-full ">
    <ConversationRecipientUser :user="recipientUser" :variant="userVariant" />
    <ContainerScrollable class="flex-1 flex flex-col-reverse">
      <ConversationMessages />
      <CardMissionInfos v-if="mission" :mission="mission" />
      <ConversationParticipationContextualAction />
    </ContainerScrollable>
    <ConversationForm />
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
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    },
    recipientUser () {
      return this.conversation.users.filter(user => user.id != this.$store.getters.profile.user_id)[0]
    },
    mission () {
      return this.conversation.conversable.mission
    },
    userVariant () {
      return this.conversation.conversable.profile_id == this.$store.getters.profile.id ? 'benevole' : 'responsable'
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
