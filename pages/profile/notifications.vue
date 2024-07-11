<template>
  <BaseContainer2Cols
    class-left="flex flex-col lg:col-span-8 gap-8 lg:gap-12"
    class-right="lg:col-span-4 space-y-8 lg:space-y-12 lg:pt-12"
  >
    <template #breadcrumb>
      <DsfrBreadcrumb
        :links="[
          { text: 'Mon espace', to: '/profile' },
          { text: 'Mes préférences de notifications' },
        ]"
      />
    </template>
    <template #header>
      <BaseSectionHeading
        title="Ravi de vous retrouver 👋"
        :secondary-title="`Bonjour ${$stores.auth.user?.profile?.first_name}`"
      >
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
      </BaseSectionHeading>
    </template>
    <template #left>
      <UserProfileTabs selected-tab-key="notifications">
        <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
          <div class="pt-8 lg:pt-14">
            <div class="flex lg:space-x-10 items-center">
              <div class="hidden lg:block w-[90px]">
                <img src="/images/icons/send-mail.svg" alt="" data-not-lazy />
              </div>
              <div>
                <div class="block font-bold mb-2 relative text-xl normal-case text-black">
                  Recevoir des propositions de missions par les organisations
                </div>
                <div class="text-[#3A3A3A]">
                  Recevez par e-mail des suggestions de missions de bénévolat
                </div>
              </div>
              <div>
                <BaseToggle v-model="form.is_visible" size="xl" />
              </div>
            </div>
          </div>
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
    </template>
    <template #right>
      <BoxCompleteProfile title="Améliorez votre profil pour trouver une mission" />
      <HelpCenter />
    </template>
  </BaseContainer2Cols>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import UserProfileTabs from '@/components/custom/UserProfileTabs.vue'
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import BoxUserProfileBenevole from '@/components/section/profile/BoxUserProfileBenevole.vue'
import BoxUserWaitingParticipations from '@/components/section/profile/BoxUserWaitingParticipations.vue'
import BoxCompleteProfile from '@/components/section/profile/BoxCompleteProfile.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
    UserProfileTabs,
    HelpCenter,
    BoxUserProfileBenevole,
    BoxUserWaitingParticipations,
    BoxCompleteProfile,
  },
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()

    const { data: profile } = await useApiFetch(`/profiles/${$stores.auth.user.profile.id}`)

    return {
      form: profile,
    }
  },
  data() {
    return {
      loading: false,
      formIsDirty: false,
    }
  },
  methods: {
    async submitForm() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.handleUpdateProfile()
      this.loading = false
    },
    async handleUpdateProfile() {
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
