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
    <HeaderAction title="Notifications">
      <template #action>
        <DsfrButton
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
      grid-class="grid gap-6 xl:gap-8 grid-cols-1 lg:grid-cols-18"
      class-left="lg:col-span-11 flex flex-col gap-6 xl:gap-8"
      class-right="lg:col-span-7 flex flex-col gap-6 xl:gap-8 lg:pt-12"
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
