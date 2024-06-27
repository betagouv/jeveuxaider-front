<template>
  <div class="container">
    <DsfrBreadcrumb
      :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Modification de mon profil' }]"
    />
    <div class="flex flex-col pb-12 gap-12">
      <BaseSectionHeading title="Mon profil">
        <template #action>
          <DsfrButton
            class="hidden lg:flex"
            size="lg"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="submitForm"
          >
            Enregistrer
          </DsfrButton>
        </template>
      </BaseSectionHeading>

      <UserProfileTabs selected-tab-key="profil">
        <FormUserProfile
          ref="form"
          :profile="profile"
          @change="formIsDirty = $event"
          @submit="fetchProfile"
        />
      </UserProfileTabs>
    </div>
  </div>
</template>

<script>
import FormUserProfile from '@/components/form/FormUserProfile.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'

export default defineNuxtComponent({
  components: {
    FormUserProfile,
    UserProfileTabs,
  },
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()
    const { data: profile, refresh: refreshProfile } = await useApiFetch(
      `/profiles/${$stores.auth.user.profile.id}`
    )

    return {
      profile,
      refreshProfile,
    }
  },
  data() {
    return {
      loading: false,
      formIsDirty: false,
    }
  },
  methods: {
    async fetchProfile() {
      await this.refreshProfile()
      this.formIsDirty = false
    },
    async submitForm() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit()
      this.loading = false
    },
  },
  beforeRouteLeave(to, from) {
    if (this.formIsDirty) {
      return window.confirm('Vous avez des modifications non enregistrées.\r\nQuitter quand-même ?')
    }
  },
})
</script>
