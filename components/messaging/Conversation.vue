<template>
  <div class="flex flex-col h-full ">
    <slot name="header" />

    <ContainerScrollable class="flex-1" :reverse="true" @scroll="onScroll">
      <ConversationMessages :messages="messages" />
      <slot name="scroll-container-top" />
    </ContainerScrollable>

    <ConversationForm />
  </div>
</template>

<script>
import ConversationForm from '@/components/messaging/ConversationForm.vue'
import ConversationMessages from '@/components/messaging/ConversationMessages.vue'

export default {
  components: {
    ConversationForm,
    ConversationMessages
  },
  data () {
    return {
      loading: true,
      currentPage: 0,
      lastPage: null,
      messages: []
    }
  },
  async fetch () {
    this.loading = true
    const { data: messages } = await this.$axios.get(`/conversationsv2/${this.conversation.id}/messages`, {
      params: { page: this.currentPage + 1 }
    })

    this.currentPage = messages.current_page
    this.lastPage = messages.last_page

    this.messages = [
      ...messages.data?.reverse(),
      ...this.messages
    ]

    this.loading = false
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    }
  },
  methods: {
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight } }) {
      // Il faut prendre en compte la taille du slot header,
      // plus une marge pour éviter le content shift au scroll
      const offset = 400
      const isBottom = Math.ceil(Math.abs(scrollTop) + clientHeight) >= (scrollHeight - offset)
      if (this.currentPage < this.lastPage && isBottom && !this.loading) {
        this.$fetch()
      }
    }
  }
}
</script>
