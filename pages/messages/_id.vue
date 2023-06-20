<template>
  <component :is="as" />
</template>

<script>
import ConversationParticipation from '@/components/messaging/ConversationParticipation.vue'
import ConversationOrganisation from '@/components/messaging/ConversationOrganisation.vue'
import ConversationMission from '@/components/messaging/ConversationMission.vue'

export default {
  components: {
    ConversationParticipation,
    ConversationOrganisation,
    ConversationMission
  },
  layout: 'messages',
  async asyncData ({ store, error, $api, params, $axios }) {
    const { data: conversation } = await $axios.get(`/conversationsv2/${params.id}`)

    if (!conversation) {
      return error({ statusCode: 403 })
    }

    store.commit('messaging2/setActiveConversation', conversation)

    if (!store.state.auth.isImpersonate) {
      store.commit('messaging2/setActiveConversationAsRead', conversation)
    }

    return {
      conversation
    }
  },
  computed: {
    as () {
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
    }
  },
  methods: {

  }
}
</script>
