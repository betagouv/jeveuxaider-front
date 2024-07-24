<template>
  <div class="flex lg:flex-col bg-[#F9F6F2] text-xs text-center items-center justify-start">
    <div
      v-for="tab in computedTabs"
      :key="tab.key"
      :class="[
        'text-gray-600 py-2 lg:py-4 cursor-pointer w-full hover:bg-white',
        {
          'bg-white text-jva-blue-500': isMessageLinkActive(tab),
        },
      ]"
      @click="changeType(tab.key)"
    >
      <component :is="tab.icon" class="h-6 w-6 fill-current inline" />
      <div>{{ tab.label }}</div>
    </div>
    <nuxt-link
      no-prefetch
      to="/messages/modeles"
      v-if="canUseMessageTemplate"
      :class="[
        'hidden lg:block text-gray-600 py-2 lg:py-4 cursor-pointer w-full hover:bg-white',
        {
          'bg-white text-jva-blue-500': isMessageTemplateLinkActive(),
        },
      ]"
    >
      <RiTodoLine class="h-6 w-6 fill-current inline" />
      <div>Modèles</div>
    </nuxt-link>
  </div>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {
      tabs: [
        { key: 'all', label: 'Tous', icon: 'RiMessage3Line' },
        { key: 'unread', label: 'Non lus', icon: 'RiMailUnreadLine' },
        { key: 'archived', label: 'Archivés', icon: 'RiArchiveLine' },
      ],
    }
  },
  computed: {
    canUseMessageTemplate() {
      return ['responsable', 'referent', 'admin'].includes(this.$stores.auth.contextRole)
    },
    computedTabs() {
      if (this.$stores.auth.contextRole === 'responsable') {
        return [
          { key: 'all', label: 'Tous', icon: 'RiMessage3Line' },
          { key: 'unread', label: 'Non lus', icon: 'RiMailUnreadLine' },
          {
            key: 'participations_to_be_treated',
            label: 'Prioritaires',
            icon: 'RiFolderWarningLine',
          },
          { key: 'archived', label: 'Archivés', icon: 'RiArchiveLine' },
        ]
      } else {
        return this.tabs
      }
    },
  },
  methods: {
    changeType(type) {
      if (['messages-modeles', 'messages-modeles-add'].includes(this.$route.name)) {
        this.$router.push('/messages')
      }
      this.$stores.messaging.conversationsQueryParams = {
        'filter[type]': type,
        page: 1,
      }
      this.$stores.messaging.showFilters = false
      this.$stores.messaging.fetchConversations()
    },
    isMessageLinkActive(tab) {
      if (
        tab.key === this.$stores.messaging.conversationsQueryParams['filter[type]'] &&
        ['messages', 'messages-id'].includes(this.$route.name)
      ) {
        return true
      }

      return false
    },
    isMessageTemplateLinkActive() {
      return ['messages-modeles', 'messages-modeles-add'].includes(this.$route.name)
    },
  },
})
</script>
