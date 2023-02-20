<template>
  <ConversationTeaser :conversation="conversation">
    <template #badge>
      TODO ORGA BADGE
    </template>

    TODO ORGA CONTENT
  </ConversationTeaser>
</template>

<script>
import ConversationTeaser from '@/components/messaging/ConversationTeaser.vue'
import ConversationTeaserMixin from '@/mixins/conversation-teaser.js'

export default {
  components: {
    ConversationTeaser
  },
  mixins: [ConversationTeaserMixin],
  props: {
    conversation: { type: Object, required: true }
  },
  computed: {},
  methods: {}
}
</script>
