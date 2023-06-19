<template>
  <div class="h-full flex flex-col">
    <template v-if="$store.getters['messaging2/showFilters']">
      <ConversationsFilters />
    </template>
    <template v-else>
      <div class="p-6 lg:p-8 border-b">
        <div class="flex gap-6 items-center">
          <Input
            name="search"
            placeholder="Recherche par mots clés..."
            icon="SearchIcon"
            variant="transparent"
            clearable
            class="flex-1"
            :value="$store.getters['messaging2/conversationsQueryParams']['filter[search]']"
            @input="handleSearchInput"
          />

          <div class="relative cursor-pointer text-jva-blue-500 hover:text-jva-blue-300" @click="$store.commit('messaging2/toggleShowFilters')">
            <RiEqualizerFill class="h-8 w-8 fill-current " />
            <div v-if="$store.getters['messaging2/activeFiltersCount']" class="absolute -top-2 -right-2 bg-[#e41e3f] px-1.5 py-0.5 rounded-full text-white font-bold text-xxs min-w-[20px] inline-flex justify-center">
              {{ $store.getters['messaging2/activeFiltersCount'] }}
            </div>
          </div>
        </div>
      </div>
      <template v-if="$store.getters['messaging2/hasConversationsResults']">
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
      </template>
      <template v-else>
        <div class="flex justify-center items-center flex-1">
          <div class="text-gray-400">
            Aucun message
          </div>
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

export default {
  components: {
    ConversationTeaserParticipation,
    ConversationTeaserMission,
    ConversationTeaserOrganisation,
    ConversationsFilters,
    Button
  },
  data () {
    return {
      loadingMoreConversations: false
    }
  },
  async fetch () {
    await this.$store.dispatch('messaging2/fetchConversations')
  },
  beforeDestroy () {
    this.$store.commit('messaging2/setConversations', [])
  },
  methods: {
    handleSearchInput ($event) {
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = debounce(() => {
        this.$store.commit('messaging2/setConversationsQueryParams', {
          ...this.$store.getters['messaging2/conversationsQueryParams'],
          'filter[search]': $event,
          page: 1
        })
        this.$fetch()
      }, 500)
      this.timeout()
    },
    async handleFetchMoreConversations () {
      this.loadingMoreConversations = true
      await this.$store.dispatch('messaging2/fetchMoreConversations')
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
