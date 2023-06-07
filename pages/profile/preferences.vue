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

      <UserProfileTabs selected-tab-key="preferences">
        <FormUserPreferences :profile="profile" />
      </UserProfileTabs>
    </div>
  </div>
</template>

<script>
import FormUserPreferences from '@/components/form/FormUserPreferences.vue'

import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'

export default {
  components: {
    FormUserPreferences,
    Breadcrumb,
    UserProfileTabs
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
