<template>
  <div class="">
    <div class="container">
      <DsfrBreadcrumb :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Mon compte' }]" />
    </div>
    <HeaderAction title="Mon compte">
      <template #action="{ isPinned }">
        <DsfrButton
          class="hidden sm:flex"
          :size="isPinned ? 'md' : 'lg'"
          variant="primary"
          :loading="loading"
          :disabled="!formIsDirty"
          @click.native="submitForm"
        >
          Enregistrer
        </DsfrButton>
      </template>
    </HeaderAction>
    <BaseContainer2Cols
      class="mt-8"
      grid-class="grid gap-6 xl:gap-8 grid-cols-1 lg:grid-cols-18"
      class-left="lg:col-span-11 flex flex-col gap-6 xl:gap-8"
      class-right="lg:col-span-7 flex flex-col gap-6 xl:gap-8 lg:pt-12"
    >
      <template #left>
        <div class="flex flex-col lg:pb-12 gap-8 xl:gap-12">
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
        <BaseBox class="@container">
          <SectionProfileCommunicationPreferences :profile="profile" />
        </BaseBox>
        <HelpCenter />
      </template>
    </BaseContainer2Cols>
  </div>
</template>

<script>
import FormUserProfile from '@/components/form/FormUserProfile.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'
import BoxCompleteProfile from '@/components/section/profile/BoxCompleteProfile.vue'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import HeaderAction from '@/components/section/current-user/HeaderActions.vue'

export default defineNuxtComponent({
  components: {
    FormUserProfile,
    UserProfileTabs,
    BoxCompleteProfile,
    HelpCenter,
    HeaderAction,
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
