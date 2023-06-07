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
      <SectionHeading title="Mes paramètres de compte" />

      <DsfrTabs
        name="NAME"
        :tabs="[
          { key: 'profil', content: 'Mon profil', to: '/profile/edit' },
          { key: 'preferences', content: 'Mes préférences de missions', to: '/profile/preferences' },
          { key: 'notifications', content: 'Mes notifications', to: '/profile/notifications' },
          { key: 'settings', content: 'Mes paramètres de compte', to: '/profile/settings' }
        ]"
        :selected-tab="3"
        tabpanel-class="!p-0"
      >
        <template slot="tab-3">
          <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
            <div class="grid grid-cols-1 gap-12 lg:gap-16">
              <div>
                <Heading as="h2" :level="2">
                  Modification de votre mot de passe
                </Heading>
                <FormPassword class="mt-8" />
              </div>
              <div class="pt-8 lg:pt-14">
                <div class="border p-8">
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
        </template>
      </DsfrTabs>
    </div>
  </div>
</template>

<script>
import FormPassword from '@/components/form/FormPassword.vue'
import ModalUnregisterUser from '~/components/modal/ModalUnregisterUser.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import DsfrTabs from '@/components/dsfr/Tabs.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    FormPassword,
    ModalUnregisterUser,
    Breadcrumb,
    DsfrTabs,
    Button
  },
  middleware: 'authenticated',
  data () {
    return {
      showAlertUnsubscribe: false
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
