<template>
  <div class="flex flex-col bg-[#F9F6F2] text-xs text-center items-center justify-start">
    <div
      v-for="tab in tabs"
      :key="tab.key"
      :class="[
        'p-4 cursor-pointer w-full',
        {'bg-white': tab.key === $store.getters['messaging2/conversationsQueryParams']['filter[type]']}
      ]"
      @click="changeType(tab.key)"
    >
      <component
        :is="tab.icon"
        class="h-6 w-6 fill-current text-jva-blue-500 inline"
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
        { key: 'all', label: 'Tous', icon: 'RiMailFill' },
        { key: 'unread', label: 'Non lus', icon: 'RiMailUnreadLine' },
        { key: 'archived', label: 'Archivés', icon: 'RiEqualizerFill' },
        { key: 'participations_to_be_treated', label: 'À traiter', icon: 'RiFolderWarningLine' }
      ]
    }
  },
  methods: {
    changeType (type) {
      this.$store.commit('messaging2/setConversationsQueryParams', {
        ...this.$store.getters['messaging2/conversationsQueryParams'],
        'filter[type]': type,
        page: 1
      })

      this.$store.dispatch('messaging2/fetchConversations')
    }
  }
}
</script>

<style>

</style>
