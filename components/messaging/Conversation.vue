<template>
  <div class="flex flex-col h-full">
    <slot name="header" />
    <slot name="actions" />

    <ContainerScrollable
      class="flex-1 p-6 lg:p-8"
      :reverse="true"
      scrollbar-class="pr-6"
      @scroll="onScroll"
    >
      <ConversationMessages />

      <div v-if="$store.getters['messaging2/hasActiveConversationMoreMessages']" class="flex justify-center mt-8">
        <Button
          :loading="loadingPreviousMessages"
          type="secondary"
          size="sm"
          @click.native="handleFetchPreviousMessages"
        >
          Charger les messages précédents
        </Button>
      </div>
      <slot name="scroll-container-top" />
    </ContainerScrollable>

    <ConversationForm v-if="$store.getters['messaging2/isCurrentUserInConversation']" class="border-t" @submit="onSubmit" />
  </div>
</template>

<script>
import ConversationForm from '@/components/messaging/ConversationForm.vue'
import ConversationMessages from '@/components/messaging/ConversationMessages.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    ConversationForm,
    ConversationMessages,
    Button
  },
  data () {
    return {
      loadingPreviousMessages: false
    }
  },
  computed: {
  },
  async mounted () {
    await this.$store.dispatch('messaging2/fetchConversationMessages', this.$route.params.id)
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch('messaging2/fetchNewConversationMessages', this.$route.params.id)
    },
    async handleFetchPreviousMessages () {
      this.loadingPreviousMessages = true
      await this.$store.dispatch('messaging2/fetchOldConversationMessages', this.$route.params.id)
      this.loadingPreviousMessages = false
    },
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight } }) {
      // Il faut prendre en compte la taille du slot header,
      // plus une marge pour éviter le content shift au scroll
      // const offset = 379
      // const isBottom = Math.ceil(Math.abs(scrollTop) + clientHeight) >= (scrollHeight - offset)
      // if (this.currentPage < this.lastPage && isBottom && !this.loading) {
      //   this.$store.dispatch('messaging2/fetchOldConversationMessages', this.$route.params.id)
      // }
    }
  }
}
</script>
