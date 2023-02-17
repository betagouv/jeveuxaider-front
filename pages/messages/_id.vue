<template>
  <div>
    <template v-if="conversation.conversable_type == 'App\\Models\\Participation'">
      <ConversationParticipation />
    </template>
    <template v-if="conversation.conversable_type == 'App\\Models\\Mission'">
      <ConversationMission />
    </template>
    <template v-if="conversation.conversable_type == 'App\\Models\\Structure'">
      <ConversationOrganisation />
    </template>
  </div>
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

    return {
      conversation
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
