<template>
  <BaseContainer2Cols
    class-left="flex flex-col lg:col-span-8 gap-8 lg:gap-12"
    class-right="lg:col-span-4 space-y-8 lg:space-y-12 lg:pt-12"
  >
    <template #breadcrumb>
      <DsfrBreadcrumb
        :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Mes paramètres de compte' }]"
      />
    </template>
    <template #header>
      <BaseHeading :level="1"> Mes paramètres de compte </BaseHeading>
    </template>
    <template #left>
      <ModalUnregisterUser
        :is-open="showAlertUnsubscribe"
        @cancel="showAlertUnsubscribe = false"
        @close="showAlertUnsubscribe = false"
      />
      <UserProfileTabs selected-tab-key="settings">
        <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
          <div class="grid grid-cols-1 gap-12 lg:gap-16">
            <div>
              <FormUserEmail />
            </div>
            <div class="pt-8 lg:pt-14">
              <div class="sm:border sm:p-8">
                <BaseHeading as="h3" :level="2" class="mb-8"> Désinscription </BaseHeading>
                <div class="flex flex-col">
                  <div class="flex-1 text-[#666666] mb-8 lg:mr-8">
                    Vous souhaitez désactiver votre compte ? Attention, cette action est
                    irréversible et toutes vos données de la plateforme JeVeuxAider.gouv.fr seront
                    anonymisées.
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
        </div>
      </UserProfileTabs>
    </template>
    <template #right>
      <HelpCenter />
    </template>
  </BaseContainer2Cols>
</template>

<script>
import FormPassword from '@/components/form/FormPassword.vue'
import FormUserEmail from '@/components/form/FormUserEmail.vue'
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
      canSubmitForm: false,
    }
  },
  methods: {
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$refs.form.handleSubmit()
      this.loading = false
    },
    onChange($event) {
      this.formIsDirty = $event.isDirty
      this.canSubmitForm = $event.isValid
    },
  },
})
</script>
