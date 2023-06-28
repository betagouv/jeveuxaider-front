<template>
  <DsfrTabs
    :name="name"
    :tabs="tabs"
    :tabpanel-class="tabpanelClass"
    :selected-tab-key="selectedTabKey"
  >
    <template :slot="`tab-${selectedTabKey}`">
      <slot />
    </template>
  </DsfrTabs>
</template>

<script>
import DsfrTabs from '@/components/dsfr/Tabs.vue'

export default {
  components: {
    DsfrTabs
  },
  props: {
    selectedTabKey: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'tabs-with-router'
    },
    tabs: {
      type: Array,
      required: true
    },
    tabpanelClass: {
      type: String,
      default: '!p-0'
    }
  }
}
</script>
