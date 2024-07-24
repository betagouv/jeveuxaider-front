<template>
  <DsfrTabs
    :name="name"
    :tabs="tabs"
    :tabpanel-class="tabpanelClass"
    :selected-tab-key="selectedTabKey"
  >
    <template #[`tab-${selectedTabKey}`]>
      <slot />
    </template>
  </DsfrTabs>
</template>

<script>
export default defineNuxtComponent({
  props: {
    selectedTabKey: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'tabs-with-router',
    },
    tabs: {
      type: Array,
      required: true,
    },
    tabpanelClass: {
      type: String,
      default: '!p-0',
    },
  },
})
</script>
