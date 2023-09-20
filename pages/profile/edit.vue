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
            Mettre à jour
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
import MixinFormDirtyState from '@/mixins/form/dirty-state.js'

export default defineNuxtComponent({
  components: {
    FormUserProfile,
    UserProfileTabs,
  },
  mixins: [MixinFormDirtyState],
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()
    const profile = await apiFetch(`/profiles/${$stores.auth.user.profile.id}`)

    return {
      profile,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async fetchProfile() {
      const profile = await apiFetch(`/profiles/${this.$stores.auth.user.profile.id}`)
      this.profile = profile
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
})
</script>
