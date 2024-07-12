<template>
  <div class="">
    <div class="container">
      <DsfrBreadcrumb
        :links="[
          { text: 'Mon espace', to: '/profile' },
          { text: 'Mes préférences de notifications' },
        ]"
      />
    </div>
    <HeaderAction title="Préférences de notifications">
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
    </HeaderAction>
    <BaseContainer2Cols
      class="mt-8"
      class-left="flex flex-col lg:col-span-8 gap-8 lg:gap-12"
      class-right="lg:col-span-4 space-y-8 lg:space-y-12 lg:pt-12"
    >
      <template #left>
        <UserProfileTabs selected-tab-key="notifications">
          <FormUserNotifications
            ref="form"
            :profile="profile"
            @change="formIsDirty = $event"
            @submit="fetchProfile"
          />
        </UserProfileTabs>
      </template>
      <template #right>
        <BoxCompleteProfile title="Améliorez votre profil pour trouver une mission" />
        <HelpCenter />
      </template>
    </BaseContainer2Cols>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import BoxUserProfileBenevole from '@/components/section/profile/BoxUserProfileBenevole.vue'
import BoxUserWaitingParticipations from '@/components/section/profile/BoxUserWaitingParticipations.vue'
import BoxCompleteProfile from '@/components/section/profile/BoxCompleteProfile.vue'
import HeaderAction from '@/components/section/current-user/HeaderActions.vue'
import FormUserNotifications from '@/components/form/FormUserNotifications.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
    UserProfileTabs,
    HelpCenter,
    BoxUserProfileBenevole,
    BoxUserWaitingParticipations,
    BoxCompleteProfile,
    HeaderAction,
    FormUserNotifications,
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
})
</script>

<style></style>
