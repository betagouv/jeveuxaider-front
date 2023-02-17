<template>
  <div class="flex flex-col h-full">
    <ConversationRecipientUser :user="recipientUser" :variant="userVariant" />
    <ContainerScrollable class="flex-1">
      <CardMissionInfos v-if="mission" :mission="mission" />
      <ConversationMessages />
    </ContainerScrollable>
    <ConversationForm />
  </div>
</template>

<script>
import ConversationRecipientUser from '@/components/messaging/ConversationRecipientUser.vue'
import CardMissionInfos from '@/components/messaging/CardMissionInfos.vue'
import ConversationMessages from '@/components/messaging/ConversationMessages.vue'
import ConversationForm from '@/components/messaging/ConversationForm.vue'

export default {
  components: {
    ConversationRecipientUser,
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

<style>

</style>
