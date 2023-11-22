<template>
  <div class="container">
    <DsfrBreadcrumb
      :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Mes paramètres de compte' }]"
    />
    <ModalUnregisterUser
      :is-open="showAlertUnsubscribe"
      @cancel="showAlertUnsubscribe = false"
      @close="showAlertUnsubscribe = false"
    />

    <div class="flex flex-col pb-12 gap-12">
      <BaseSectionHeading title="Mes paramètres de compte">
        <template #action>
          <DsfrButton
            class="hidden lg:flex"
            size="lg"
            variant="primary"
            :loading="loading"
            :disabled="!canSubmitForm"
            @click.native="handleSubmit"
          >
            Mettre à jour
          </DsfrButton>
        </template>
      </BaseSectionHeading>

      <UserProfileTabs selected-tab-key="settings">
        <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
          <div class="grid grid-cols-1 gap-12 lg:gap-16">
            <div>
              <BaseHeading as="h2" :level="2"> Modification de votre mot de passe </BaseHeading>
              <FormPassword ref="form" class="mt-8" @change="onChange" />
            </div>
            <div class="pt-8 lg:pt-14">
              <div class="sm:border sm:p-8">
                <BaseHeading as="h2" :level="2" class="mb-8"> Désinscription </BaseHeading>
                <div
                  class="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:space-x-8"
                >
                  <div class="flex-1 text-gray-600 mb-8 lg:mr-8">
                    Vous souhaitez désactiver votre compte&nbsp;?<br /><br />
                    Attention, cette action est irréversible et toutes vos données de la plateforme
                    JeVeuxAider.gouv.fr seront anonymisées.
                  </div>
                  <div>
                    <DsfrButton
                      type="secondary"
                      size="lg"
                      @click.native="() => (showAlertUnsubscribe = true)"
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
    </div>
  </div>
</template>

<script>
import FormPassword from '@/components/form/FormPassword.vue'
import ModalUnregisterUser from '@/components/modal/ModalUnregisterUser.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'

export default defineNuxtComponent({
  components: {
    FormPassword,
    ModalUnregisterUser,
    UserProfileTabs,
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
