<template>
  <Conversation>
    <template #header>
      <template v-if="isCurrentUserBenevole">
        <ConversationRecipientResponsable :user="recipientUser" />
      </template>
      <template v-if="isCurrentUserResponsable">
        <ConversationRecipientBenevole :user="recipientUser" />
      </template>
    </template>

    <template #actions>
      <template v-if="isCurrentUserBenevole">
        <ConversationParticipationActionAsBenevole v-if="conversation.conversable_type === 'App\\Models\\Participation'" />
      </template>
      <template v-if="isCurrentUserResponsable">
        <ConversationParticipationActionAsResponsable v-if="conversation.conversable_type === 'App\\Models\\Participation'" />
      </template>
    </template>

    <template #scroll-container-top>
      <div v-if="participation?.slots" class="my-10">
        <div class="font-semibold text-center mb-2">
          Le bénévole a précisé être disponible à ces dates
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2">
          <Badge
            v-for="(date) in participation.slots"
            :key="date.id"
            size="md"
            no-icon
          >
            {{ $dayjs(date.date).format('dddd D MMMM') }}<span class="font-normal text-gray-600"> : {{ date.slots.map(slot => $options.filters.label(slot, 'slots')).join(', ') }}</span>
          </Badge>
        </div>
      </div>

      <CardInfosMission
        :show-places-left="isCurrentUserResponsable"
      />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientBenevole from '@/components/messaging/ConversationRecipientBenevole.vue'
import ConversationRecipientResponsable from '@/components/messaging/ConversationRecipientResponsable.vue'
import ConversationParticipationActionAsResponsable from '~/components/messaging/ConversationParticipationActionAsResponsable.vue'
import ConversationParticipationActionAsBenevole from '~/components/messaging/ConversationParticipationActionAsBenevole.vue'
import CardInfosMission from '@/components/messaging/CardInfosMission.vue'
import Conversation from '@/components/messaging/Conversation.vue'
import MixinConversationParticipation from '@/mixins/conversation/participation'
import Badge from '@/components/dsfr/Badge.vue'

export default {
  components: {
    ConversationRecipientBenevole,
    ConversationRecipientResponsable,
    ConversationParticipationActionAsResponsable,
    ConversationParticipationActionAsBenevole,
    CardInfosMission,
    Conversation,
    Badge
  },
  mixins: [MixinConversationParticipation],
  computed: {
    recipientUser () {
      return this.conversation.users.filter(user => user.id != this.$store.getters.profile.user_id)[0]
    }
  }
}
</script>
