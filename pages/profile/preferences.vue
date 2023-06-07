<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Mon espace', to: '/profile' },
        { text: 'Mes préférences de missions' },
      ]"
    />
    <div class="flex flex-col pb-12 gap-12">
      <SectionHeading title="Mes préférences de missions" />

      <DsfrTabs
        name="NAME"
        :tabs="[
          { key: 'profil', content: 'Mon profil', to: '/profile/edit' },
          { key: 'preferences', content: 'Mes préférences de missions', to: '/profile/preferences' },
          { key: 'notifications', content: 'Mes notifications', to: '/profile/notifications' },
          { key: 'settings', content: 'Mes paramètres de compte', to: '/profile/settings' }
        ]"
        :selected-tab="1"
        tabpanel-class="!p-0"
      >
        <template slot="tab-1">
          <FormUserPreferences :profile="profile" />
        </template>
      </DsfrTabs>
    </div>
  </div>
</template>

<script>
import FormUserPreferences from '@/components/form/FormUserPreferences.vue'

import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import DsfrTabs from '@/components/dsfr/Tabs.vue'

export default {
  components: {
    FormUserPreferences,
    Breadcrumb,
    DsfrTabs
  },
  middleware: 'authenticated',
  async asyncData ({ $axios, error, store }) {
    const { data: profile } = await $axios.get(`/profiles/${store.state.auth.user.profile.id}`)

    return {
      profile
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {

  }
}
</script>
