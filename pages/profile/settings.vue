<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Mon espace', to: '/profile' },
        { text: 'Mes paramètres' },
      ]"
    />
    <ModalUnregisterUser :is-open="showAlert" @cancel="showAlert = false" @close="showAlert = false" />

    <div class="flex flex-col pb-12 gap-12">
      <SectionHeading title="Mes paramètres" />

      <DsfrTabs
        name="NAME"
        :tabs="[
          { key: 'profil', content: 'Mon profil', to: '/profile/edit' },
          { key: 'preferences', content: 'Mes préférences de missions', to: '/profile/preferences' },
          { key: 'notifications', content: 'Mes notifications', to: '/profile/notifications' },
          { key: 'settings', content: 'Mes paramètres', to: '/profile/settings' }
        ]"
        :selected-tab="3"
        tabpanel-class="!p-0"
      >
        <template slot="tab-3">
          <div class="grid gap-8">
            <Box>
              <Heading as="h2" :level="3" class="mb-8">
                Modification de votre mot de passe
              </Heading>
              <FormPassword />
            </Box>
            <Box>
              <Heading as="h3" :level="3" class="mb-8">
                Désinscription
              </Heading>
              <div class="text-gray-600 mb-8">
                Vous souhaitez désactiver votre compte&nbsp;?<br><br> Attention, cette action est irréversible et toutes vos données de la plateforme JeVeuxAider.gouv.fr seront anonymisées.
              </div>
              <div class="ml-auto">
                <Button variant="white" size="lg" type="submit" @click.native="() => showAlert = true">
                  Je souhaite me désinscrire
                </Button>
              </div>
            </Box>
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

export default {
  components: {
    FormPassword,
    ModalUnregisterUser,
    Breadcrumb,
    DsfrTabs
  },
  middleware: 'authenticated',
  data () {
    return {
      showAlert: false
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
