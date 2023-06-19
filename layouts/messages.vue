<template>
  <div class="overflow-hidden h-full">
    <div class="h-full flex flex-col">
      <Header full-width />
      <div class="flex h-full bg-white overflow-hidden">
        <div class="w-full md:max-w-[530px] flex md:flex-none md:border-r">
          <ConversationsTabs class="w-[80px] border-r" />
          <ConversationsListingResults class="flex-1 min-w-0" />
        </div>

        <Nuxt class="flex-1" />
      </div>
      <portal-target name="body-end" multiple />
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import ConversationsListingResults from '~/components/messaging/ConversationsListingResults.vue'
import ConversationsTabs from '~/components/messaging/ConversationsTabs.vue'

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
