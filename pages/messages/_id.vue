<template>
  <div>
    <template v-if="conversation.conversable_type == 'App\\Models\\Participation'">
      <ConversationParticipation :conversation="conversation" />
    </template>
    <template v-if="conversation.conversable_type == 'App\\Models\\Mission'">
      <ConversationMission :conversation="conversation" />
    </template>
    <template v-if="conversation.conversable_type == 'App\\Models\\Structure'">
      <ConversationOrganisation :conversation="conversation" />
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
    const { data: conversation } = await $axios.get(`/conversations/${params.id}`)

    if (!conversation) {
      return error({ statusCode: 403 })
    }

    return { conversation }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
