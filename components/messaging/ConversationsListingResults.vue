<template>
  <ContainerScrollable
    :class="[{'hidden lg:block': $route.name == 'messages-id'}, 'h-full divide-y']"
    @scroll.native="onScroll"
  >
    <component
      :is="retrieveComponent(conversation)"
      v-for="conversation in $store.getters['messaging2/conversations']"
      :key="conversation.id"
      :conversation="conversation"
      @click.native="onClick(conversation)"
    />
  </ContainerScrollable>
</template>

<script>
import ConversationParticipationTeaser from '@/components/messaging/ConversationParticipationTeaser.vue'
import ConversationMissionTeaser from '@/components/messaging/ConversationMissionTeaser.vue'
import ConversationOrganisationTeaser from '@/components/messaging/ConversationOrganisationTeaser.vue'

export default {
  components: {
    ConversationParticipationTeaser,
    ConversationMissionTeaser,
    ConversationOrganisationTeaser
  },
  data () {
    return {
      loading: true,
      filters: [],
      currentPage: 1,
      lastPage: null
    }
  },
  async fetch () {
    this.loading = true
    const conversations = await this.$axios.get('/conversationsv2', {
      params: { ...this.filters }
    })
    this.currentPage = conversations.data?.current_page
    this.lastPage = conversations.data?.last_page
    this.$store.commit('messaging2/setConversations', [
      ...this.$store.getters['messaging2/conversations'],
      ...conversations.data?.data
    ])
    this.loading = false
  },
  watch: {
    // filters () {
    //   this.conversations = []
    // }
  },
  beforeDestroy () {
    this.$store.commit('messaging2/setConversations', [])
  },
  methods: {
    retrieveComponent (conversation) {
      if (conversation.conversable_type == 'App\\Models\\Participation') {
        return 'ConversationParticipationTeaser'
      }
      if (conversation.conversable_type == 'App\\Models\\Mission') {
        return 'ConversationMissionTeaser'
      }
      if (conversation.conversable_type == 'App\\Models\\Structure') {
        return 'ConversationOrganisationTeaser'
      }
      return null
    },
    onClick (conversation) {
      this.$router.push(`/messages/${conversation.id}`)
    },
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight } }) {
      const isBottom = Math.ceil(scrollTop + clientHeight) >= (scrollHeight - 45)
      if (this.currentPage < this.lastPage && isBottom && !this.loading) {
        this.filters.page = this.currentPage + 1
        this.$fetch()
      }
    }
  }
}
</script>
