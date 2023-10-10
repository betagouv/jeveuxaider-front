<template>
  <div class="relative h-full flex flex-col">
    <template v-if="$stores.messaging.showFilters">
      <ConversationsFilters />
    </template>
    <template v-else>
      <div class="p-4 lg:py-4 lg:px-6 border-b">
        <div class="flex gap-6 items-center">
          <BaseInput
            name="search"
            placeholder="Recherche par noms, emails..."
            icon="RiSearchLine"
            variant="transparent"
            clearable
            class="flex-1"
            :modelValue="$stores.messaging.conversationsQueryParams['filter[search]']"
            @update:modelValue="handleSearchInput"
          />

          <div
            class="relative cursor-pointer text-jva-blue-500 hover:text-jva-blue-300"
            @click="$stores.messaging.toggleShowFilters()"
          >
            <RiEqualizerFill class="h-6 w-6 lg:h-8 lg:w-8 fill-current" />
            <div
              v-if="$stores.messaging.activeFiltersCount"
              class="absolute -top-2 -right-2 bg-[#e41e3f] px-1.5 py-0.5 rounded-full text-white font-bold text-xxs min-w-[20px] inline-flex justify-center"
            >
              {{ $stores.messaging.activeFiltersCount }}
            </div>
          </div>
        </div>
      </div>

      <template v-if="$stores.messaging.hasConversationsResults">
        <BaseContainerScrollable :class="['flex-1']">
          <div class="divide-y">
            <nuxt-link
              no-prefetch
              v-for="conversation in $stores.messaging.conversations"
              :key="conversation.id"
              :to="`/messages/${conversation.id}`"
              class="block lg:border-l-4 lg:border-l-white cursor-pointer hover:bg-[#F5F5FE] lg:hover:border-l-[#6A6AF4]"
              :class="[
                {
                  '!border-l-[#6A6AF4] bg-[#F5F5FE]': conversation.id == $route.params.id,
                },
              ]"
            >
              <component :is="retrieveComponent(conversation)" :conversation="conversation" />
            </nuxt-link>
          </div>
          <div
            v-if="$stores.messaging.hasMoreConversations"
            class="flex justify-center mb-8 border-t pt-8"
          >
            <DsfrButton
              :loading="loadingMoreConversations"
              type="secondary"
              size="sm"
              @click.native="handleFetchMoreConversations"
            >
              Charger plus de conversations
            </DsfrButton>
          </div>
        </BaseContainerScrollable>
      </template>
      <template v-else>
        <div class="flex justify-center items-center flex-1">
          <div class="text-gray-400">Aucun message</div>
        </div>
      </template>
      <ClientOnly>
        <div
          v-if="$stores.messaging.isConversationsLoading"
          class="absolute z-20 h-full flex-1 flex items-center justify-center w-full"
        >
          <SpinIcon class="animate-spin h-10 w-10 text-jva-blue-500" />
        </div>
      </ClientOnly>
    </template>
  </div>
</template>

<script>
import ConversationTeaserParticipation from '@/components/messaging/ConversationTeaserParticipation.vue'
import ConversationTeaserMission from '@/components/messaging/ConversationTeaserMission.vue'
import ConversationTeaserOrganisation from '@/components/messaging/ConversationTeaserOrganisation.vue'
import ConversationsFilters from '@/components/messaging/ConversationsFilters.vue'
import SpinIcon from '@/components/icon/SpinIcon.vue'

export default defineNuxtComponent({
  components: {
    ConversationTeaserParticipation,
    ConversationTeaserMission,
    ConversationTeaserOrganisation,
    ConversationsFilters,
    SpinIcon,
  },
  data() {
    return {
      loadingMoreConversations: false,
    }
  },
  async created() {
    await this.$stores.messaging.fetchConversations()
  },
  beforeDestroy() {
    this.$stores.messaging.conversations = []
  },
  methods: {
    handleSearchInput(inputValue) {
      if (this.timeout) {
        this.timeout.cancel()
      }
      this.timeout = _debounce(async () => {
        this.$stores.messaging.conversationsQueryParams = {
          ...this.$stores.messaging.conversationsQueryParams,
          'filter[search]': inputValue,
          page: 1,
        }
        await this.$stores.messaging.fetchConversations()
      }, 250)
      this.timeout()
    },
    async handleFetchMoreConversations() {
      this.loadingMoreConversations = true
      await this.$stores.messaging.fetchMoreConversations()
      this.loadingMoreConversations = false
    },
    retrieveComponent(conversation) {
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
  },
})
</script>
