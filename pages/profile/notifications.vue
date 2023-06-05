<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Mon espace', to: '/profile' },
        { text: 'Mes préférences de notifications' },
      ]"
    />

    <div class="flex flex-col pb-12 gap-12">
      <SectionHeading
        title="Préférences de notifications"
      />

      <DsfrTabs
        name="NAME"
        :tabs="[
          { key: 'profil', content: 'Mon profil', to: '/profile/edit' },
          { key: 'preferences', content: 'Mes préférences de missions', to: '/profile/preferences' },
          { key: 'notifications', content: 'Mes notifications', to: '/profile/notifications' },
          { key: 'settings', content: 'Mes paramètres', to: '/profile/settings' }
        ]"
        :selected-tab="2"
        tabpanel-class="!p-0"
      >
        <template slot="tab-2">
          <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
            <template v-if="['responsable'].includes($store.getters.contextRole)">
              <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-16">
                <div class="">
                  <Heading as="h2" :level="2">
                    Notifications relatives aux participations et messages reçus
                  </Heading>
                  <Alert class="mt-8">
                    <span class="font-bold">Temps réel :</span> Recevez un mail dès qu’une nouvelle action est réalisée sur la plateforme (une nouvelle candidature à une mission, par exemple)<br>
                    <span class="font-bold">Résumé quotidien :</span> Recevez un mail unique par jour, qui regroupe l’intégralité des actualités quotidiennes
                  </Alert>
                  <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12 mt-8">
                    <div class="text-gray-600">
                      <p class="mb-4">
                        Les notifications concernées comprennent notamment :
                      </p>
                      <ul class="pl-8 list-disc">
                        <li>Les messages d’information pour toute nouvelle participation</li>
                        <li>Les nouveaux messages reçus dans la messagerie</li>
                        <li>Les relances relatives aux participations en attente</li>
                      </ul>
                    </div>
                    <div class="w-[400px]">
                      <RadioGroup
                        v-model="form.notification__responsable_frequency"
                        :options="[{key: 'realtime', label: 'Temps réel'}, { key: 'summary', label: 'Résumé quotidien'}]"
                        variant="tabs"
                        @updated="handleUpdateProfile"
                      />
                    </div>
                  </div>
                </div>
                <div class="pt-8 lg:pt-14">
                  <Heading as="h2" :level="2">
                    Résumé mensuel de votre activité
                  </Heading>
                  <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12 mt-8">
                    <div class="text-gray-600 max-w-[500px]">
                      Retrouvez chaque mois un résumé de l'activité liée à votre organisation ainsi que vos actions en attente
                    </div>
                    <div class="w-[400px]">
                      <RadioGroup
                        v-model="form.notification__responsable_bilan"
                        :options="[{key: true, label: 'Activé'}, { key: false, label: 'Désactivé'}]"
                        variant="tabs"
                        @updated="handleUpdateProfile"
                      />
                    </div>
                  </div>
                  </Box>
                </div>
              </div>
            </template>
            <template v-if="['referent'].includes($store.getters.contextRole)">
              <Box>
                <Heading as="h2" :level="3" class="mb-8">
                  Notifications relatives aux missions/organisations en cours de modération et messages reçus
                </Heading>
                <Alert class="mb-8">
                  <span class="font-bold">Temps réel :</span> Recevez un mail dès qu’une nouvelle action est réalisée sur la plateforme (une nouvelle mission proposée, par exemple)<br>
                  <span class="font-bold">Résumé bi-hebdomadaire :</span> Recevez deux mails par semaine, regroupant l’intégralité des actualités de JeVeuxAider.gouv.fr sur votre département
                </Alert>
                <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12">
                  <div class="text-gray-600">
                    <p class="mb-4">
                      Les notifications concernées comprennent notamment :
                    </p>
                    <ul class="pl-8 list-disc">
                      <li>Les messages d’information pour toute nouvelle mission proposée</li>
                      <li>Les messages d’information pour toute nouvelle organisation inscrite</li>
                      <li>Les notifications relatives aux messages reçus via la messagerie</li>
                    </ul>
                  </div>
                  <div class="w-[400px]">
                    <RadioGroup
                      v-model="form.notification__referent_frequency"
                      :options="[{key: 'realtime', label: 'Temps réel'}, { key: 'summary', label: 'Résumé bi-hebdomadaire'}]"
                      variant="tabs"
                      @updated="handleUpdateProfile"
                    />
                  </div>
                </div>
              </Box>
              <Box>
                <Heading as="h2" :level="3" class="mb-8">
                  Résumé mensuel de votre activité
                </Heading>
                <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12">
                  <div class="text-gray-600 max-w-[500px]">
                    Retrouvez chaque mois un résumé de l'activité liée à votre département ainsi que vos actions en attente
                  </div>
                  <div class="w-[400px]">
                    <RadioGroup
                      v-model="form.notification__referent_bilan"
                      :options="[{key: true, label: 'Activé'}, { key: false, label: 'Désactivé'}]"
                      variant="tabs"
                      @updated="handleUpdateProfile"
                    />
                  </div>
                </div>
              </Box>
            </template>
          </div>
        </template>
      </DsfrTabs>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import DsfrTabs from '@/components/dsfr/Tabs.vue'

export default {
  components: {
    Breadcrumb,
    DsfrTabs
  },
  middleware: 'authenticated',
  async asyncData ({ $axios, params, error, store }) {
    if (
      ![
        'referent',
        'responsable'
      ].includes(store.getters.contextRole)
    ) {
      return error({ statusCode: 403 })
    }

    const { data: profile } = await $axios.get(`/profiles/${store.state.auth.user.profile.id}`)

    return {
      form: profile
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async handleUpdateProfile () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$axios.put(`/profiles/${this.form.id}`, this.form).then(() => {
        this.$toast.success('Vos préférences ont été mises à jour !')
      })
        .catch((errors) => {
          console.log('errors', errors)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>

</style>
