<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Mon espace', to: '/profile' },
        { text: 'Modification de mon profil' },
      ]"
    />
    <div class="flex flex-col pb-12 gap-12">
      <SectionHeading title="Mon profil" />

      <UserProfileTabs selected-tab-key="profil">
        <FormUserProfile :profile="profile" />
      </UserProfileTabs>
    </div>
  </div>
</template>

<script>
import FormUserProfile from '@/components/form/FormUserProfile.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'

export default {
  components: {
    FormUserProfile,
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
