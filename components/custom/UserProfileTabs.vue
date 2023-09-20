<template>
  <DsfrTabs name="NAME" :tabs="tabs" tabpanel-class="!p-0" :selected-tab-key="selectedTabKey">
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
          content: 'Mon profil',
          contentMobile: 'Profil',
          to: '/profile/edit',
        },
        {
          key: 'preferences',
          content: 'Mes préférences de missions',
          contentMobile: 'Préférences',
          to: '/profile/preferences',
        },
        ['referent', 'responsable'].includes(this.$stores.auth.contextRole)
          ? {
              key: 'notifications',
              content: 'Mes notifications',
              contentMobile: 'Notifications',
              to: '/profile/notifications',
            }
          : null,
        {
          key: 'settings',
          content: 'Mes paramètres de compte',
          contentMobile: 'Paramètres',
          to: '/profile/settings',
        },
      ]
    },
  },
})
</script>
