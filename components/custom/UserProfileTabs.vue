<template>
  <DsfrTabs
    name="NAME"
    :tabs="tabs"
    tabpanel-class="!p-0 shadow-lg"
    :selected-tab-key="selectedTabKey"
    class="lg:pt-0.5"
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
  },
  computed: {
    tabs() {
      return [
        {
          key: 'profil',
          content: 'Profil',
          contentMobile: 'Profil',
          to: '/profile/edit',
        },
        {
          key: 'preferences',
          content: 'Préférences',
          contentMobile: 'Préférences',
          to: '/profile/preferences',
        },
        {
          key: 'notifications',
          content: 'Notifications',
          contentMobile: 'Notifications',
          to: '/profile/notifications',
        },
        {
          key: 'settings',
          content: 'Paramètres',
          contentMobile: 'Paramètres',
          to: '/profile/settings',
        },
      ]
    },
  },
})
</script>
