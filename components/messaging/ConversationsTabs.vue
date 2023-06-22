<template>
  <div class="flex lg:flex-col bg-[#F9F6F2] text-xs text-center items-center justify-start">
    <div
      v-for="tab in computedTabs"
      :key="tab.key"
      :class="[
        'py-2 lg:py-4 cursor-pointer w-full hover:bg-white',
        {'bg-white text-jva-blue-500': tab.key === $store.getters['messaging/conversationsQueryParams']['filter[type]']},
        {'text-gray-600': tab.key !== $store.getters['messaging/conversationsQueryParams']['filter[type]']}
      ]"
      @click="changeType(tab.key)"
    >
      <component
        :is="tab.icon"
        class="h-6 w-6 fill-current inline"
      />
      <div>{{ tab.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        { key: 'all', label: 'Tous', icon: 'RiMessage3Line' },
        { key: 'unread', label: 'Non lus', icon: 'RiMailUnreadLine' },
        { key: 'archived', label: 'Archivés', icon: 'RiArchiveLine' }
      ]
    }
  },
  computed: {
    computedTabs () {
      if (this.$store.getters.contextRole === 'responsable') {
        return this.tabs.concat({ key: 'participations_to_be_treated', label: 'À traiter', icon: 'RiFolderWarningLine' })
      } else {
        return this.tabs
      }
    }
  },
  methods: {
    changeType (type) {
      this.$store.commit('messaging/setConversationsQueryParams', {
        'filter[type]': type,
        page: 1
      })
      this.$store.commit('messaging/setShowFilters', false)
      this.$store.dispatch('messaging/fetchConversations')
    }
  }
}
</script>

<style>

</style>
