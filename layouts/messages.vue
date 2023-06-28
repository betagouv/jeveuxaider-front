<template>
  <div class="overflow-hidden h-full">
    <div class="h-full flex flex-col">
      <Header full-width />

      <div class="flex flex-col bg-white overflow-hidden lg:flex-row h-full">
        <div
          :class="[
            'w-full h-full lg:w-[530px] lg:flex-none lg:border-r lg:flex flex-1',
            {'hidden': $route.params.id}
          ]"
        >
          <ConversationsTabs class="fixed bottom-0 block w-full z-20 border-t lg:relative lg:block lg:w-[80px] lg:border-r" />
          <ConversationsListingResults class="flex-1 min-w-0 pb-[61px] lg:pb-0" />
        </div>

        <Nuxt v-if="$route.params.id" class="flex-1" />
      </div>
      <portal-target name="drawer" class="relative z-20" multiple />
      <portal-target name="body-end" multiple />
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import ConversationsListingResults from '@/components/messaging/ConversationsListingResults.vue'
import ConversationsTabs from '@/components/messaging/ConversationsTabs.vue'

export default {
  name: 'MessagesLayout',
  components: {
    Header,
    ConversationsListingResults,
    ConversationsTabs
  },
  middleware: 'authenticated',
  data () {
    return {}
  },
  head: {
    bodyAttrs: {
      class: 'full-height-layout'
    }
  },
  computed: {

  },
  methods: {

  }

}
</script>
