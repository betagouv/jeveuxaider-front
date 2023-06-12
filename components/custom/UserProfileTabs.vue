<template>
  <DsfrTabs
    name="NAME"
    :tabs="tabs"
    tabpanel-class="!p-0"
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
    }
  },
  computed: {
    tabs () {
      return [
        { key: 'profil', content: 'Mon profil', contentMobile: 'Profil', to: '/profile/edit' },
        { key: 'preferences', content: 'Mes préférences de missions', contentMobile: 'Préférences', to: '/profile/preferences' },
        [
          'referent',
          'responsable'
        ].includes(this.$store.getters.contextRole)
          ? { key: 'notifications', content: 'Mes notifications', contentMobile: 'Notifications', to: '/profile/notifications' }
          : null,
        { key: 'settings', content: 'Mes paramètres de compte', contentMobile: 'Paramètres', to: '/profile/settings' }
      ]
    }
  }
}
</script>
