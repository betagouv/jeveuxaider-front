<template>
  <BaseContainer2Cols
    class-left="flex flex-col lg:col-span-8 gap-8 lg:gap-12"
    class-right="lg:col-span-4 space-y-8 lg:space-y-12 lg:pt-12"
  >
    <template #breadcrumb>
      <DsfrBreadcrumb
        :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Modification de mon profil' }]"
      />
    </template>
    <template #header>
      <BaseSectionHeading :title="$stores.auth.user?.profile?.full_name">
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
    </template>
    <template #left>
      <div class="flex flex-col pb-12 gap-12">
        <UserProfileTabs selected-tab-key="profil">
          <FormUserProfile
            ref="form"
            :profile="profile"
            @change="formIsDirty = $event"
            @submit="fetchProfile"
          />
        </UserProfileTabs>
      </div>
    </template>
    <template #right>
      <BoxCompleteProfile title="Améliorez votre profil pour trouver une mission" />
      <HelpCenter />
    </template>
  </BaseContainer2Cols>
</template>

<script>
import FormUserProfile from '@/components/form/FormUserProfile.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'
import BoxCompleteProfile from '@/components/section/profile/BoxCompleteProfile.vue'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'

export default defineNuxtComponent({
  components: {
    FormUserProfile,
    UserProfileTabs,
    BoxCompleteProfile,
    HelpCenter,
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
