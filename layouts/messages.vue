<template>
  <div class="overflow-hidden h-full">
    <div class="h-full flex flex-col">
      <Header full-width />

      <div class="flex flex-col bg-white overflow-hidden lg:flex-row h-full">
        <div
          :class="[
            'w-full h-full lg:w-[530px] lg:flex-none lg:border-r lg:flex flex-1',
            { hidden: $route.params.id },
          ]"
        >
          <ConversationsTabs
            :class="[
              'fixed bottom-0 w-full z-20 border-t lg:relative lg:w-[80px] lg:border-r',
              { 'hidden lg:block': $stores.messaging.showFilters },
            ]"
          />
          <ConversationsListingResults
            :class="[
              'flex-1 min-w-0',
              { 'pb-[61px] lg:pb-0': !$stores.messaging.showFilters },
            ]"
          />
        </div>

        <NuxtPage class="lg:flex-1" />
      </div>

      <div id="teleport-drawer" class="relative z-20"></div>
      <div id="teleport-body-end"></div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import ConversationsListingResults from '@/components/messaging/ConversationsListingResults.vue'
import ConversationsTabs from '@/components/messaging/ConversationsTabs.vue'
import MixinUsetiful from '@/mixins/usetiful.client.js'
import MixinPlausible from '@/mixins/plausible.js'

export default {
  components: {
    Header,
    ConversationsListingResults,
    ConversationsTabs,
  },
  mixins: [MixinUsetiful, MixinPlausible],
  setup() {
    useHead({
      bodyAttrs: {
        class: 'full-height-layout',
      },
    })
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>
