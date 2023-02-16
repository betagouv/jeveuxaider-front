<template>
  <div>
    <template v-if="conversation.conversable_type == 'App\\Models\\Participation'">
      <ConversationParticipation :conversation="conversation" />
    </template>
    <template v-if="conversation.conversable_type == 'App\\Models\\Mission'">
      @TODO Conversation d'une mission
    </template>
    <template v-if="conversation.conversable_type == 'App\\Models\\Structure'">
      @TODO Conversation d'une organisation
    </template>
  </div>
</template>

<script>
import ConversationParticipation from '@/components/messaging/ConversationParticipation.vue'

export default {
  components: {
    ConversationParticipation
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
