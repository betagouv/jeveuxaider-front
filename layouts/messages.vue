<template>
  <div class="overflow-hidden h-full">
    <div class="h-full flex flex-col overflow-auto">
      <Header full-width />

      <client-only>
        <div ref="wrapperColumns" class="h-full flex-1 overflow-hidden bg-white">
          <ConversationsColumn class="overflow-auto divide-y" />
        </div>
      </client-only>

      <portal-target name="body-end" multiple />
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import ConversationsColumn from '@/components/messaging/ConversationsColumn.vue'

export default {
  name: 'MessagesLayout',
  components: {
    Header,
    ConversationsColumn
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
