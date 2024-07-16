<template>
  <BaseContainer2Cols
    grid-class="grid gap-6 xl:gap-8 grid-cols-1 lg:grid-cols-18"
    class-left="lg:col-span-11 flex flex-col gap-6 xl:gap-8"
    class-right="lg:col-span-7 flex flex-col gap-6 xl:gap-8 lg:pt-12"
  >
    <template #breadcrumb>
      <DsfrBreadcrumb
        :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Mes paramètres de compte' }]"
      />
    </template>
    <template #header>
      <DsfrHeading as="h1" size="2xl"> Paramètres </DsfrHeading>
    </template>
    <template #left>
      <ModalUnregisterUser
        :is-open="showAlertUnsubscribe"
        @cancel="showAlertUnsubscribe = false"
        @close="showAlertUnsubscribe = false"
      />
      <UserProfileTabs selected-tab-key="settings">
        <div class="bg-white px-6 py-8 lg:p-10">
          <div class="grid grid-cols-1 gap-8 lg:gap-10">
            <FormUserEmail @submitted="onEmailChanged" />
            <hr />
            <FormUserPassword @submitted="onPasswordChanged" />
            <hr />
            <div class="border p-8">
              <DsfrHeading size="lg" class="mb-6"> Désinscription </DsfrHeading>
              <div class="flex flex-col">
                <div class="flex-1 text-[#666666] mb-8 lg:mr-8">
                  Vous souhaitez désactiver votre compte ? Attention, cette action est irréversible
                  et toutes vos données de la plateforme JeVeuxAider.gouv.fr seront anonymisées.
                </div>
                <div>
                  <DsfrButton
                    type="tertiary"
                    @click.native="() => (showAlertUnsubscribe = true)"
                    :disabled="$stores.auth.contextRole === 'admin'"
                    class="text-[#CE0500]"
                  >
                    Je souhaite me désinscrire
                  </DsfrButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserProfileTabs>
    </template>
    <template #right>
      <BaseBox class="@container">
        <SectionProfileCommunicationPreferences :profile="$stores.auth.profile" />
      </BaseBox>
      <HelpCenter />
    </template>
  </BaseContainer2Cols>
</template>

<script>
import FormPassword from '@/components/form/FormPassword.vue'
import FormUserEmail from '@/components/form/FormUserEmail.vue'
import FormUserPassword from '@/components/form/FormUserPassword.vue'
import ModalUnregisterUser from '@/components/modal/ModalUnregisterUser.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import BoxCompleteProfile from '@/components/section/profile/BoxCompleteProfile.vue'

export default defineNuxtComponent({
  components: {
    FormPassword,
    ModalUnregisterUser,
    UserProfileTabs,
    BoxCompleteProfile,
    HelpCenter,
    FormUserEmail,
    FormUserPassword,
  },
  setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })
  },
  data() {
    return {
      showAlertUnsubscribe: false,
      loading: false,
      // canSubmitForm: false,
    }
  },
  methods: {
    async onEmailChanged() {
      await this.$stores.auth.fetchUser()
      this.$toast.success('Votre e-mail a bien été modifié !')
    },
    async onPasswordChanged() {
      await this.$stores.auth.fetchUser()
      this.$toast.success('Votre mot de passe a bien été modifié !')
    },
    // async handleSubmit() {
    //   if (this.loading) {
    //     return
    //   }
    //   this.loading = true
    //   await this.$refs.form.handleSubmit()
    //   this.loading = false
    // },
    // onChange($event) {
    //   this.formIsDirty = $event.isDirty
    //   this.canSubmitForm = $event.isValid
    // },
  },
})
</script>
