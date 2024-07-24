<template>
  <transition
    appear
    mode="out-in"
    enter-active-class="transition ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="transform opacity-100"
    leave-active-class="transition ease-in"
    leave-from-class="transform opacity-100"
    leave-to-class="transform opacity-0"
  >
    <component v-if="!loading" :is="as" />
  </transition>
</template>

<script>
import ConversationParticipation from '@/components/messaging/ConversationParticipation.vue'
import ConversationOrganisation from '@/components/messaging/ConversationOrganisation.vue'
import ConversationMission from '@/components/messaging/ConversationMission.vue'

export default defineNuxtComponent({
  components: {
    ConversationParticipation,
    ConversationOrganisation,
    ConversationMission,
  },
  async setup() {
    definePageMeta({
      layout: 'messages',
      middleware: ['authenticated'],
    })
    const route = useRoute()
    const { $stores } = useNuxtApp()

    const { data: conversation, error } = await useApiFetch(
      `/conversations/${route.params.id}`
    )

    if (!conversation.value) {
      showError({
        statusCode: 404,
      })
    }

    $stores.messaging.activeConversation = conversation.value

    if (!$stores.auth.isImpersonate) {
      $stores.messaging.setActiveConversationAsRead(conversation.value)
      await $stores.messaging.getUserUnreadMessagesCount()
    }

    return {
      conversation: conversation.value,
    }
  },
  computed: {
    as() {
      if (this.conversation.conversable_type == 'App\\Models\\Participation') {
        return 'ConversationParticipation'
      }
      if (this.conversation.conversable_type == 'App\\Models\\Mission') {
        return 'ConversationMission'
      }
      if (this.conversation.conversable_type == 'App\\Models\\Structure') {
        return 'ConversationOrganisation'
      }
      return null
    },
  },
  data() {
    return { loading: false }
  },
  watch: {
    '$route.fullPath'() {
      this.loading = true
    },
  },
})
</script>
