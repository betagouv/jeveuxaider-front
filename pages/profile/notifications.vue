<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Mon espace', to: '/profile' },
        { text: 'Mes préférences de notifications' },
      ]"
    />

    <div class="flex flex-col pb-12 gap-12">
      <BaseSectionHeading title="Préférences de notifications" />

      <UserProfileTabs selected-tab-key="notifications">
        <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
          <template v-if="['responsable'].includes($stores.auth.contextRole)">
            <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-16">
              <div>
                <BaseHeading as="h2" :level="2">
                  Notifications relatives aux participations et messages reçus
                </BaseHeading>
                <BaseAlert class="mt-8">
                  <span class="font-bold">Temps réel :</span> Recevez un mail dès qu’une nouvelle
                  action est réalisée sur la plateforme (une nouvelle candidature à une mission, par
                  exemple)<br />
                  <span class="font-bold">Résumé quotidien :</span> Recevez un mail unique par jour,
                  qui regroupe l’intégralité des actualités quotidiennes
                </BaseAlert>
                <div
                  class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12 mt-8"
                >
                  <div class="text-gray-600">
                    <p class="mb-4">Les notifications concernées comprennent notamment :</p>
                    <ul class="pl-8 list-disc">
                      <li>Les messages d’information pour toute nouvelle participation</li>
                      <li>Les nouveaux messages reçus dans la messagerie</li>
                      <li>Les relances relatives aux participations en attente</li>
                    </ul>
                  </div>
                  <div class="w-[400px]">
                    <BaseRadioGroup
                      v-model="form.notification__responsable_frequency"
                      :options="[
                        { key: 'realtime', label: 'Temps réel' },
                        { key: 'summary', label: 'Résumé quotidien' },
                      ]"
                      variant="tabs"
                      @update:modelValue="handleUpdateProfile"
                    />
                  </div>
                </div>
              </div>
              <div class="pt-8 lg:pt-14">
                <BaseHeading as="h2" :level="2"> Résumé mensuel de votre activité </BaseHeading>
                <div
                  class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12 mt-8"
                >
                  <div class="text-gray-600 max-w-[500px]">
                    Retrouvez chaque mois un résumé de l'activité liée à votre organisation ainsi
                    que vos actions en attente
                  </div>
                  <div class="w-[400px]">
                    <BaseRadioGroup
                      v-model="form.notification__responsable_bilan"
                      :options="[
                        { key: true, label: 'Activé' },
                        { key: false, label: 'Désactivé' },
                      ]"
                      variant="tabs"
                      @update:modelValue="handleUpdateProfile"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="['referent'].includes($stores.auth.contextRole)">
            <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-16">
              <div>
                <BaseHeading as="h2" :level="3" class="mb-8">
                  Notifications relatives aux missions/organisations en cours de modération et
                  messages reçus
                </BaseHeading>
                <BaseAlert class="mb-8">
                  <span class="font-bold">Temps réel :</span> Recevez un mail dès qu’une nouvelle
                  action est réalisée sur la plateforme (une nouvelle mission proposée, par
                  exemple)<br />
                  <span class="font-bold">Résumé bi-hebdomadaire :</span> Recevez deux mails par
                  semaine, regroupant l’intégralité des actualités de JeVeuxAider.gouv.fr sur votre
                  département
                </BaseAlert>
                <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12">
                  <div class="text-gray-600">
                    <p class="mb-4">Les notifications concernées comprennent notamment :</p>
                    <ul class="pl-8 list-disc">
                      <li>Les messages d’information pour toute nouvelle mission proposée</li>
                      <li>Les messages d’information pour toute nouvelle organisation inscrite</li>
                      <li>Les notifications relatives aux messages reçus via la messagerie</li>
                    </ul>
                  </div>
                  <div class="w-[400px]">
                    <BaseRadioGroup
                      v-model="form.notification__referent_frequency"
                      :options="[
                        { key: 'realtime', label: 'Temps réel' },
                        { key: 'summary', label: 'Résumé bi-hebdomadaire' },
                      ]"
                      variant="tabs"
                      @update:modelValue="handleUpdateProfile"
                    />
                  </div>
                </div>
              </div>
              <div class="pt-8 lg:pt-14">
                <BaseHeading as="h2" :level="3" class="mb-8">
                  Résumé mensuel de votre activité
                </BaseHeading>
                <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-12">
                  <div class="text-gray-600 max-w-[500px]">
                    Retrouvez chaque mois un résumé de l'activité liée à votre département ainsi que
                    vos actions en attente
                  </div>
                  <div class="w-[400px]">
                    <BaseRadioGroup
                      v-model="form.notification__referent_bilan"
                      :options="[
                        { key: true, label: 'Activé' },
                        { key: false, label: 'Désactivé' },
                      ]"
                      variant="tabs"
                      @update:modelValue="handleUpdateProfile"
                    />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </UserProfileTabs>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
    UserProfileTabs,
  },
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()

    if (!['referent', 'responsable'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }

    const { data: profile } = await useApiFetch(`/profiles/${$stores.auth.user.profile.id}`)

    return {
      form: profile,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async handleUpdateProfile() {
      console.log('handleUpdateProfile', this.form)
      if (this.loading) {
        return
      }
      this.loading = true
      await apiFetch(`/profiles/${this.form.id}`, {
        method: 'PUT',
        body: this.form,
      })
        .then(() => {
          this.$toast.success('Vos préférences ont été mises à jour !')
        })
        .catch((errors) => {
          console.log('errors', errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>

<style></style>
