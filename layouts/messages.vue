<template>
  <div class="overflow-hidden h-full">
    <div class="h-full flex flex-col">
      <Header full-width />
      <div class="flex h-full bg-white overflow-hidden">
        <ConversationsListingResults />

        <Nuxt />
      </div>
      <portal-target name="body-end" multiple />
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import ConversationsListingResults from '~/components/messaging/ConversationsListingResults.vue'

export default {
  name: 'MessagesLayout',
  components: {
    Header,
    ConversationsListingResults
  },
  middleware: 'authenticated',
  data () {
    return {}
  },
  head: {
    bodyAttrs: {
      class: 'full-height-layout'
    }
  }
}
</script>
