<template>
  <div ref="container" class="h-full" @scroll="onScroll">
    <Conversation
      v-for="conversation in conversations"
      :key="conversation.id"
      :conversation="conversation"
    />
  </div>
</template>

<script>
import Conversation from '@/components/messaging/Conversation.vue'

export default {
  components: {
    Conversation
  },
  data () {
    return {
      loading: true,
      conversations: [],
      filters: [],
      currentPage: 1,
      lastPage: null
    }
  },
  async fetch () {
    this.loading = true
    const conversations = await this.$axios.get('/conversations', {
      params: { ...this.filters }
    })

    this.conversations = [...this.conversations, ...conversations.data?.data]
    this.currentPage = conversations.data?.current_page
    this.lastPage = conversations.data?.last_page
    this.loading = false
  },
  watch: {
    filters () {
      this.conversations = []
    }
  },
  methods: {
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight } }) {
      const isBottom = Math.ceil(scrollTop) + clientHeight >= scrollHeight
      if (this.currentPage < this.lastPage && isBottom && !this.loading) {
        this.filters.page = this.currentPage + 1
        this.$fetch()
      }
    }
  }
}
</script>
