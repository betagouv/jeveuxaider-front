<template>
  <div class="flex flex-col h-full min-w-0">
    <slot name="header" />
    <slot name="actions" />

    <BaseContainerScrollable
      class="flex-1 pl-4 lg:pl-6"
      :reverse="true"
      scrollbar-class="pr-4 lg:pr-6 py-4 lg:py-6"
      @scroll="onScroll"
    >
      <ConversationMessages />

      <div
        v-if="$stores.messaging.hasActiveConversationMoreMessages"
        class="flex justify-center mt-8"
      >
        <DsfrButton
          :loading="loadingPreviousMessages"
          type="secondary"
          size="sm"
          @click.native="handleFetchPreviousMessages"
        >
          Charger les messages précédents
        </DsfrButton>
      </div>

      <slot name="scroll-container-top" />
    </BaseContainerScrollable>

    <ConversationForm v-if="$stores.messaging.isCurrentUserInConversation" @submit="onSubmit" />
  </div>
</template>

<script>
import ConversationForm from '@/components/messaging/ConversationForm.vue'
import ConversationMessages from '@/components/messaging/ConversationMessages.vue'

export default defineNuxtComponent({
  components: {
    ConversationForm,
    ConversationMessages,
  },
  data() {
    return {
      loadingPreviousMessages: false,
    }
  },
  computed: {},
  async setup() {
    const route = useRoute()
    const { $stores } = useNuxtApp()

    await $stores.messaging.fetchConversationMessages(route.params.id)
  },
  methods: {
    async onSubmit() {
      await this.$stores.messaging.fetchNewConversationMessages(this.$route.params.id)
    },
    async handleFetchPreviousMessages() {
      this.loadingPreviousMessages = true
      await this.$stores.messaging.fetchOldConversationMessages(this.$route.params.id)
      this.loadingPreviousMessages = false
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      //
    },
  },
})
</script>
