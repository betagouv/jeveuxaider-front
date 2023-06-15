<template>
  <div class="h-full flex flex-col">
    <div class="p-6 lg:p-8 border-b">
      <Input
        name="search"
        placeholder="Recherche par mots clés..."
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        clearable
        @input="changeFilter('filter[search]', $event)"
      />
    </div>
    <ContainerScrollable
      :class="[{'hidden lg:block': $route.name == 'messages-id'}, 'flex-1']"
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
      <div v-if="$store.getters['messaging2/hasMoreConversations']" class="flex justify-center mb-8 border-t pt-8">
        <Button
          :loading="loadingMoreConversations"
          type="secondary"
          size="sm"
          @click.native="handleFetchMoreConversations"
        >
          Charger plus de conversations
        </Button>
      </div>
    </ContainerScrollable>
  </div>
</template>

<script>
import ConversationTeaserParticipation from '@/components/messaging/ConversationTeaserParticipation.vue'
import ConversationTeaserMission from '@/components/messaging/ConversationTeaserMission.vue'
import ConversationTeaserOrganisation from '@/components/messaging/ConversationTeaserOrganisation.vue'
import QueryBuilder from '@/mixins/query-builder'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    ConversationTeaserParticipation,
    ConversationTeaserMission,
    ConversationTeaserOrganisation,
    Button
  },
  mixins: [QueryBuilder],
  data () {
    return {
      loadingMoreConversations: false
      // filters: [],
      // currentPage: 1,
      // lastPage: null
    }
  },
  async fetch () {
    console.log('this.$route.query', this.$route.query)
    await this.$store.dispatch('messaging2/fetchConversations', { ...this.$route.query })
  },
  // watch: {
  //   async '$store.state.messaging2.activeConversation' (newConversation, oldConversation) {
  //     // @TODO à quoi ça sert ?
  //     // if (oldConversation.id) {
  //     //   await this.$store.dispatch('messaging2/refreshConversationInConversations', oldConversation.id)
  //     // }
  //   }
  //   // filters () {
  //   //   this.conversations = []
  //   // }
  // },
  watch: {
    '$route.query': '$fetch'
  },
  beforeDestroy () {
    this.$store.commit('messaging2/setConversations', [])
  },
  methods: {
    async handleFetchMoreConversations () {
      this.loadingMoreConversations = true
      await this.$store.dispatch('messaging2/fetchMoreConversations', { ...this.$route.query })
      this.loadingMoreConversations = false
    },
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
      // const isBottom = Math.ceil(scrollTop + clientHeight) >= (scrollHeight - 45)
      // if (this.currentPage < this.lastPage && isBottom && !this.loading) {
      //   this.filters.page = this.currentPage + 1
      //   this.$fetch()
      // }
    }
  }
}
</script>
