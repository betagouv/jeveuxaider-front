<template>
  <div class="overflow-hidden h-full">
    <div class="h-full flex flex-col overflow-auto">
      <Header full-width />
      <div class="flex">
        <client-only>
          <div ref="wrapperColumns" class="h-full flex-1 overflow-hidden bg-white w-full lg:max-w-[492px]">
            <ConversationsListingResults class="overflow-auto divide-y" />
          </div>
        </client-only>
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
