<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Mon espace', to: '/profile' },
        { text: 'Modification de mon profil' },
      ]"
    />
    <div class="flex flex-col pb-12 gap-12">
      <SectionHeading title="Mon profil">
        <template #action>
          <Button
            class="hidden lg:flex"
            size="lg"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="handleSubmit($event)"
          >
            Mettre à jour
          </Button>
        </template>
      </SectionHeading>

      <UserProfileTabs selected-tab-key="profil">
        <FormUserProfile ref="form" :profile="profile" @change="onChange($event)" />
      </UserProfileTabs>
    </div>
  </div>
</template>

<script>
import FormUserProfile from '@/components/form/FormUserProfile.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    FormUserProfile,
    Breadcrumb,
    UserProfileTabs,
    Button
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
      loading: false,
      formIsDirty: false
    }
  },
  methods: {
    async handleSubmit (payload) {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit(payload)
      this.loading = false
    },
    onChange (formIsDirty) {
      this.formIsDirty = formIsDirty
    }
  }
}
</script>
