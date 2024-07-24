<template>
  <Conversation>
    <template #header>
      <ModalParticipationShouldBeDone
        :participation="participation"
        :is-open="showModal"
        @cancel="showModal = false"
        @updated="handleUpdatedParticipation"
      />
      <template v-if="isCurrentUserBenevole">
        <!-- <ConversationRecipientResponsable :user="responsableUser" /> -->
        <ConversationRecipientOrganisation :structure="structure" :users="conversationUsers" />
      </template>
      <template v-if="isCurrentUserResponsable">
        <ConversationRecipientBenevole :user="benevoleUser" />
      </template>
    </template>
    <template #actions>
      <template v-if="isCurrentUserBenevole">
        <ConversationParticipationActionAsBenevole
          v-if="conversation.conversable_type === 'App\\Models\\Participation'"
        />
      </template>
      <template v-if="isCurrentUserResponsable">
        <ConversationParticipationActionAsResponsable
          v-if="conversation.conversable_type === 'App\\Models\\Participation'"
        />
        <ConversationTags class="border-b" @update-selected-tags="onUpdateSelectedTags" />
      </template>
    </template>

    <template #scroll-container-top>
      <div v-if="participation?.slots" class="my-10">
        <div class="font-semibold text-center mb-2">
          Le bénévole a précisé être disponible à ces dates
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2">
          <DsfrBadge v-for="date in participation.slots" :key="date.id" size="md" no-icon>
            {{ $dayjs(date.date).format('dddd D MMMM YYYY')
            }}<span class="font-normal text-gray-600">
              :
              {{ date.slots.map((slot) => $filters.label(slot, 'slots')).join(', ') }}</span
            >
          </DsfrBadge>
        </div>
      </div>

      <BaseAlert
        v-if="
          isCurrentUserResponsable &&
          $dayjs().diff($dayjs(benevoleUser.profile.birthday), 'year') < 18
        "
        class="mt-4 lg:ml-10"
      >
        <div>
          <strong>Ce bénévole a moins de 18 ans</strong>
          <p>
            Il devra fournir un accord de ses parents ou représentants légaux pour effectuer la
            mission
          </p>
        </div>
      </BaseAlert>

      <CardInfosMission :show-places-left="isCurrentUserResponsable" />
    </template>
  </Conversation>
</template>

<script>
import ConversationRecipientBenevole from '@/components/messaging/ConversationRecipientBenevole.vue'
import ConversationRecipientResponsable from '@/components/messaging/ConversationRecipientResponsable.vue'
import ConversationRecipientOrganisation from '@/components/messaging/ConversationRecipientOrganisation.vue'
import ConversationParticipationActionAsResponsable from '@/components/messaging/ConversationParticipationActionAsResponsable.vue'
import ConversationParticipationActionAsBenevole from '@/components/messaging/ConversationParticipationActionAsBenevole.vue'
import ConversationTags from '@/components/messaging/ConversationTags.vue'
import CardInfosMission from '@/components/messaging/CardInfosMission.vue'
import Conversation from '@/components/messaging/Conversation.vue'
import MixinConversationParticipation from '@/mixins/conversation/participation'

export default defineNuxtComponent({
  components: {
    ConversationRecipientBenevole,
    ConversationRecipientResponsable,
    ConversationParticipationActionAsResponsable,
    ConversationParticipationActionAsBenevole,
    ConversationRecipientOrganisation,
    ConversationTags,
    CardInfosMission,
    Conversation,
  },
  mixins: [MixinConversationParticipation],
  data() {
    return {
      showModal: this.$route.query.open_modal === 'participation-should-be-done',
    }
  },
  computed: {
    responsableUser() {
      const responsable = this.conversation.users.find(
        (user) => user.id === this.mission.responsables[0].user_id
      )
      if (responsable) {
        return responsable
      }
      return this.conversation.users.filter(
        (user) => user.id != this.$stores.auth.profile?.user_id
      )[0]
    },
    benevoleUser() {
      return this.conversation.users.find((user) => user.id == this.participation.profile.user_id)
    },
  },
  methods: {
    onUpdateSelectedTags(tags) {
      this.conversation.conversable.tags = tags
      this.$stores.messaging.refreshConversationInConversations(this.conversation)
    },
    handleUpdatedParticipation() {
      this.$stores.messaging.refreshActiveConversation(this.conversation.id)
      this.$stores.messaging.fetchNewConversationMessages(this.conversation.id)
    },
  },
})
</script>
