<template>
  <ContainerScrollable
    :class="[{'hidden lg:block': $route.name == 'messages-id'}, 'h-full']"
    @scroll="onScroll"
  >
    <div class="divide-y">
      <nuxt-link
        v-for="conversation in $store.getters['messaging2/conversations']"
        :key="conversation.id"
        :to="`/messages/${conversation.id}`"
        class="block border-l-4 border-l-white cursor-pointer hover:bg-[#F5F5FE hover:border-l-[#6A6AF4]"
        :class="[
          { '!border-l-[#6A6AF4] bg-[#F5F5FE]': conversation.id == $route.params.id }
        ]"
      >
        <component
          :is="retrieveComponent(conversation)"
          :conversation="conversation"
        />
      </nuxt-link>
    </div>
  </ContainerScrollable>
</template>

<script>
import ConversationTeaserParticipation from '@/components/messaging/ConversationTeaserParticipation.vue'
import ConversationTeaserMission from '@/components/messaging/ConversationTeaserMission.vue'
import ConversationTeaserOrganisation from '@/components/messaging/ConversationTeaserOrganisation.vue'

export default {
  components: {
    ConversationTeaserParticipation,
    ConversationTeaserMission,
    ConversationTeaserOrganisation
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
    async '$store.state.messaging2.activeConversation' (newConversation, oldConversation) {
      if (oldConversation.id) {
        await this.$store.dispatch('messaging2/refreshConversationInConversations', oldConversation.id)
      }
    }
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
        return 'ConversationTeaserParticipation'
      }
      if (conversation.conversable_type == 'App\\Models\\Mission') {
        return 'ConversationTeaserMission'
      }
      if (conversation.conversable_type == 'App\\Models\\Structure') {
        return 'ConversationTeaserOrganisation'
      }
      return null
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
