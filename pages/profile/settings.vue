<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Mon espace', to: '/profile' },
        { text: 'Mes paramètres de compte' },
      ]"
    />
    <ModalUnregisterUser :is-open="showAlertUnsubscribe" @cancel="showAlertUnsubscribe = false" @close="showAlertUnsubscribe = false" />

    <div class="flex flex-col pb-12 gap-12">
      <SectionHeading title="Mes paramètres de compte">
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

      <UserProfileTabs selected-tab-key="settings">
        <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
          <div class="grid grid-cols-1 gap-12 lg:gap-16">
            <div>
              <Heading as="h2" :level="2">
                Modification de votre mot de passe
              </Heading>
              <FormPassword ref="form" class="mt-8" @change="onChange($event)" />
            </div>
            <div class="pt-8 lg:pt-14">
              <div class="sm:border sm:p-8">
                <Heading as="h2" :level="2" class="mb-8">
                  Désinscription
                </Heading>
                <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:space-x-8">
                  <div class="flex-1 text-gray-600 mb-8 lg:mr-8">
                    Vous souhaitez désactiver votre compte&nbsp;?<br><br> Attention, cette action est irréversible et toutes vos données de la plateforme JeVeuxAider.gouv.fr seront anonymisées.
                  </div>
                  <div>
                    <Button type="secondary" size="lg" @click.native="() => showAlertUnsubscribe = true">
                      Je souhaite me désinscrire
                    </Button>
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
import ModalUnregisterUser from '~/components/modal/ModalUnregisterUser.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    FormPassword,
    ModalUnregisterUser,
    Breadcrumb,
    UserProfileTabs,
    Button
  },
  middleware: 'authenticated',
  data () {
    return {
      showAlertUnsubscribe: false,
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
