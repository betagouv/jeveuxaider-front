<template>
  <div class="relative h-full flex flex-col">
    <template v-if="$store.getters['messaging/showFilters']">
      <ConversationsFilters />
    </template>
    <template v-else>
      <div class="p-4 lg:p-8 border-b">
        <div class="flex gap-6 items-center">
          <Input
            name="search"
            placeholder="Recherche par mots clés..."
            icon="SearchIcon"
            variant="transparent"
            clearable
            class="flex-1"
            :value="$store.getters['messaging/conversationsQueryParams']['filter[search]']"
            @input="handleSearchInput"
          />

          <div class="relative cursor-pointer text-jva-blue-500 hover:text-jva-blue-300" @click="$store.commit('messaging/toggleShowFilters')">
            <RiEqualizerFill class="h-8 w-8 fill-current " />
            <div v-if="$store.getters['messaging/activeFiltersCount']" class="absolute -top-2 -right-2 bg-[#e41e3f] px-1.5 py-0.5 rounded-full text-white font-bold text-xxs min-w-[20px] inline-flex justify-center">
              {{ $store.getters['messaging/activeFiltersCount'] }}
            </div>
          </div>
        </div>
      </div>

      <template v-if="$store.getters['messaging/hasConversationsResults']">
        <ContainerScrollable
          :class="['flex-1']"
          @scroll="onScroll"
        >
          <div class="divide-y">
            <nuxt-link
              v-for="conversation in $store.getters['messaging/conversations']"
              :key="conversation.id"
              :to="`/messages/${conversation.id}`"
              class="block lg:border-l-4 lg:border-l-white cursor-pointer hover:bg-[#F5F5FE] lg:hover:border-l-[#6A6AF4]"
              :class="[
                { '!border-l-[#6A6AF4] bg-[#F5F5FE]': conversation.id == $route.params.id }
              ]"
              @click.native="handleConversationTeaserClick(conversation)"
            >
              <component
                :is="retrieveComponent(conversation)"
                :conversation="conversation"
              />
            </nuxt-link>
          </div>
          <div v-if="$store.getters['messaging/hasMoreConversations']" class="flex justify-center mb-8 border-t pt-8">
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
      </template>
      <template v-else>
        <div class="flex justify-center items-center flex-1">
          <div class="text-gray-400">
            Aucun message
          </div>
        </div>
      </template>
      <template v-if="$store.getters['messaging/isConversationsLoading']">
        <div class="absolute z-20 h-full flex-1 flex items-center justify-center w-full">
          <SpinIcon class="animate-spin h-10 w-10 text-jva-blue-500" />
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import ConversationTeaserParticipation from '@/components/messaging/ConversationTeaserParticipation.vue'
import ConversationTeaserMission from '@/components/messaging/ConversationTeaserMission.vue'
import ConversationTeaserOrganisation from '@/components/messaging/ConversationTeaserOrganisation.vue'
import ConversationsFilters from '@/components/messaging/ConversationsFilters.vue'
import Button from '@/components/dsfr/Button.vue'
import SpinIcon from '@/components/icon/SpinIcon'

export default {
  components: {
    ConversationTeaserParticipation,
    ConversationTeaserMission,
    ConversationTeaserOrganisation,
    ConversationsFilters,
    Button,
    SpinIcon
  },
  data () {
    return {
      loadingMoreConversations: false
    }
  },
  async fetch () {
    await this.$store.dispatch('messaging/fetchConversations')
  },
  beforeDestroy () {
    this.$store.commit('messaging/setConversations', [])
  },
  methods: {
    handleSearchInput ($event) {
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = debounce(() => {
        this.$store.commit('messaging/setConversationsQueryParams', {
          ...this.$store.getters['messaging/conversationsQueryParams'],
          'filter[search]': $event,
          page: 1
        })
        this.$fetch()
      }, 500)
      this.timeout()
    },
    async handleFetchMoreConversations () {
      this.loadingMoreConversations = true
      await this.$store.dispatch('messaging/fetchMoreConversations')
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
    },
    handleConversationTeaserClick (conversation) {
      const userReadAt = new Date(conversation?.users.filter(user => user.id === this.$store.state.auth.user.id)[0]?.pivot.read_at)
      const conversationUpdatedAt = new Date(conversation.updated_at)
      if (!this.$store.state.auth.isImpersonate) {
        if (userReadAt < conversationUpdatedAt) {
          this.$store.commit('messaging/decrementUnreadMessagesCount')
        }
      }
    }
  }
}
</script>
