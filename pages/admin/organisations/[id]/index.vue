<template>
  <div class="container">
    <DsfrBreadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        {
          text: 'Organisations',
          to: ['admin', 'referent', 'referent_regional', 'tete_de_reseau'].includes(
            $stores.auth.contextRole
          )
            ? '/admin/organisations'
            : null,
        },
        { text: organisation && organisation.name },
      ]"
    />
  </div>
  <HeaderActions
    :organisation="organisation"
    @updated="closeDrawerAndRefreshOrganisation"
    @isPinned="(event) => (this.isPinned = event)"
  />
  <div class="container">
    <BaseDrawer
      :is-open="showDrawerAddResponsable"
      form-id="form-add-responsable"
      submit-label="Ajouter ce membre"
      @close="showDrawerAddResponsable = false"
      :classContainer="isPinned ? 'pt-[80px]' : undefined"
    >
      <template #title>
        <BaseHeading :level="3"> Ajouter un membre </BaseHeading>
      </template>
      <FormAddResponsable
        class="mt-8"
        :endpoint="`/structures/${organisation.id}/responsables`"
        @submited="closeDrawerAndRefreshOrganisation"
      />
    </BaseDrawer>
    <BaseDrawer
      :is-open="showDrawerInvitation"
      form-id="form-invitation"
      submit-label="Envoyer l'invitation"
      @close="showDrawerInvitation = false"
      :classContainer="isPinned ? 'pt-[80px]' : undefined"
    >
      <template #title>
        <BaseHeading :level="3"> Inviter un nouveau membre </BaseHeading>
      </template>
      <FormInvitation
        class="mt-8"
        role="responsable_organisation"
        :invitable-id="organisation.id"
        invitable-type="App\Models\Structure"
        @submited="closeDrawerAndRefreshOrganisation"
      />
    </BaseDrawer>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-20">
      <div class="lg:col-span-3 space-y-6">
        <BaseBox class="relative z-10">
          <img
            v-if="organisation.logo"
            :srcset="organisation.logo.urls.large"
            :alt="organisation.name"
            class="my-8 h-auto"
            style="max-width: 16rem; max-height: 120px"
          />
          <BaseHeading as="h1" :level="1">
            {{ organisation.name }}
          </BaseHeading>
          <BaseTextFormatted
            v-if="
              organisation.description &&
              !['Collectivité', 'Organisation publique'].includes(organisation.statut_juridique)
            "
            :text="organisation.description"
            :max-lines="2"
            class="text-cool-gray-500 text-lg mt-4"
          />
        </BaseBox>
        <BoxInformations
          class="mb-8"
          :organisation="organisation"
          :show-title="false"
          box-variant="shadow"
          box-padding="lg"
        />
        <BaseBox
          :style="`background-color: ${organisation.color ? organisation.color : '#B91C1C'}`"
          class="text-white"
        >
          <DomainsPublicsLinks :organisation="organisation" />
        </BaseBox>
        <BaseBox :padding="false">
          <iframe
            width="100%"
            height="100%"
            style="border: 0; min-height: 190px"
            loading="lazy"
            allowfullscreen
            :src="`https://www.google.com/maps/embed/v1/place?key=${googlePlacesKey}&q=${organisation.full_address}`"
          />
          <div class="text-sm px-6 py-4 flex justify-between items-center">
            <div class="font-bold text-gray-800 uppercase">Siège de l'organisation</div>
            <div class="text-gray-500">📍 {{ organisation.full_address }}</div>
          </div>
        </BaseBox>
        <BoxNotes
          v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
          notable-type="structures"
          :notable-id="organisation.id"
        />
      </div>
      <div class="lg:col-span-2 space-y-8">
        <ClientOnly>
          <BaseTabs
            :tabs="[
              {
                name: 'Informations',
                to: '#infos',
                icon: 'RiInformationFill',
                current: $route.hash === '#infos' || !$route.hash,
              },
              organisation?.permissions?.canUpdate
                ? {
                    name: 'Membres',
                    to: '#membres',
                    icon: 'RiUserFill',
                    current: $route.hash === '#membres',
                    count: organisation.members.length,
                  }
                : null,
              {
                name: 'Historique',
                to: '#historique',
                icon: 'RiTimeFill',
                current: $route.hash === '#historique',
              },
            ]"
          />
          <div v-if="$route.hash === '#infos' || !$route.hash" class="space-y-8">
            <BoxAideModeration
              v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
              :organisation="organisation"
            />

            <div>
              <div
                class="text-sm flex justify-between px-2 mb-2 uppercase font-semibold text-gray-600"
              >
                Votre activité en chiffres
              </div>
              <BaseBox
                variant="flat"
                :padding="!Boolean(organisationStats) ? 'lg' : false"
                :loading="!Boolean(organisationStats)"
                loading-text="Récupération de l'activité ..."
                class="!border-none"
              >
                <div
                  v-if="organisationStats"
                  class="grid grid-cols-1 lg:grid-cols-2 border bg-gray-200 gap-[1px]"
                >
                  <CardStatistic
                    :value="organisationStats.places_left"
                    :title="`${$filters.pluralize(
                      organisationStats.places_left,
                      'Bénévole recherché',
                      'Bénévoles recherchés',
                      false
                    )}`"
                    :subtitle="
                      organisationStats.places_left_waiting
                        ? `+${$numeral(organisationStats.places_left_waiting)} places à venir`
                        : null
                    "
                  />
                  <CardStatistic
                    :value="`${organisationStats.places_occupation_rate}%`"
                    :gauge-percentage="organisationStats.places_occupation_rate"
                    title="Taux de remplissage"
                  />
                  <CardStatistic
                    :value="organisationStats.missions_available"
                    :title="`${$filters.pluralize(
                      organisationStats.missions_available,
                      'Missions en ligne',
                      'Missions en ligne',
                      false
                    )}`"
                    :subtitle="`sur ${$numeral(
                      organisationStats.missions_total
                    )} ${$filters.pluralize(
                      organisationStats.missions_total,
                      'mission',
                      'missions',
                      false
                    )}`"
                    :link="`/admin/missions?organisation_name=${organisation.name}&filter[structure.id]=${organisation.id}`"
                    link-label="Missions"
                  />
                  <CardStatistic
                    :value="organisationStats.participations_state['Validée']"
                    :title="`${$filters.pluralize(
                      organisationStats.participations_state['Validée'],
                      'Participation validée',
                      'Participations validées',
                      false
                    )}`"
                    :subtitle="`sur ${$numeral(
                      organisationStats.participations_total
                    )} ${$filters.pluralize(
                      organisationStats.participations_total,
                      'candidature',
                      'candidatures',
                      false
                    )}`"
                    :link="`/admin/participations?organisation_name=${organisation.name}&filter[mission.structure.id]=${organisation.id}`"
                    link-label="Participations"
                  />
                </div>
              </BaseBox>
            </div>
            <div>
              <div
                class="text-sm flex justify-between px-2 mb-2 uppercase font-semibold text-gray-600"
              >
                Votre visibilité
              </div>
              <BoxScore :variant="false" :padding="false" :structure-id="organisation.id" />
            </div>

            <BoxReseau
              v-for="reseau in organisation.reseaux"
              :key="reseau.id"
              class="mb-8"
              :reseau="reseau"
            />
            <BoxReferents
              v-if="['admin'].includes($stores.auth.contextRole)"
              class="mb-8"
              :department="organisation.department"
            />
          </div>
          <template v-if="$route.hash === '#membres'">
            <div class="space-y-8">
              <BoxInvitations
                :title="`${$filters.pluralize(invitations.length, 'invitation')} en attente`"
                v-if="invitations && invitations.length > 0"
                :invitations="invitations"
                @updated="fetch"
              />

              <BoxOrganisationMembers
                :title="$filters.pluralize(responsables.length, 'membre')"
                :responsables="responsables"
                :organisation="organisation"
                :conversable="organisation"
                @updated="fetch"
                @removed="fetch"
              />
            </div>
          </template>
          <template v-if="$route.hash === '#historique'">
            <HistoryStateChanges :model-id="organisation.id" model-type="structure" />
            <History :model-id="organisation.id" model-type="structure" />
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History.vue'
import HistoryStateChanges from '@/components/section/HistoryStateChanges.vue'
import MixinOrganisation from '@/mixins/organisation'
import DomainsPublicsLinks from '@/components/section/organisation/DomainsPublicsLinks.vue'
import BoxInformations from '@/components/section/organisation/BoxInformations.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'
import CardStatistic from '@/components/card/CardStatistic.vue'
import FormInvitation from '@/components/form/FormInvitation.vue'
import FormAddResponsable from '@/components/form/FormAddResponsable.vue'
import BoxInvitations from '@/components/section/BoxInvitations.vue'
import BoxReferents from '@/components/section/BoxReferents.vue'
import BoxReseau from '@/components/section/organisation/BoxReseau.vue'
import BoxNotes from '@/components/custom/BoxNotes.vue'
import BoxOrganisationMembers from '@/components/section/BoxOrganisationMembers.vue'
import BoxScore from '@/components/section/organisation/BoxScore.vue'
import BoxAideModeration from '@/components/section/organisation/BoxAideModeration.vue'
import HeaderActions from '@/components/section/organisation/HeaderActions.vue'

export default defineNuxtComponent({
  components: {
    History,
    HistoryStateChanges,
    DomainsPublicsLinks,
    OnlineIndicator,
    BoxInformations,
    CardStatistic,
    FormInvitation,
    FormAddResponsable,
    BoxInvitations,
    BoxReferents,
    BoxReseau,
    BoxNotes,
    BoxOrganisationMembers,
    BoxScore,
    BoxAideModeration,
    HeaderActions,
  },
  mixins: [MixinOrganisation],
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })

    const { $stores } = useNuxtApp()
    const route = useRoute()
    const runtimeConfig = useRuntimeConfig()

    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable'].includes(
        $stores.auth.contextRole
      )
    ) {
      return showError({ statusCode: 403 })
    }

    if ($stores.auth.contextRole == 'responsable') {
      if ($stores.auth.contextableId != route.params.id) {
        return showError({ statusCode: 403 })
      }
    }

    const { data: organisation, refresh: refreshOrganisation } = await useApiFetch(
      `/structures/${route.params.id}`
    )

    if (!organisation) {
      return showError({ statusCode: 404 })
    }

    return {
      organisation: toRef(organisation),
      refreshOrganisation,
      googlePlacesKey: runtimeConfig.public.google.places,
    }
  },
  data() {
    return {
      organisationStats: null,
      showDrawerInvitation: false,
      showDrawerAddResponsable: false,
      invitations: null,
      responsables: [],
      isPinned: false,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const route = useRoute()
      apiFetch(`/statistics/organisations/${route.params.id}`).then((response) => {
        this.organisationStats = response
      })

      if (['admin', 'responsable', 'tete_de_reseau'].includes(this.$stores.auth.contextRole)) {
        apiFetch(`/structures/${route.params.id}/invitations`).then((response) => {
          this.invitations = response
        })
      }

      apiFetch(`/structures/${route.params.id}/responsables`).then((response) => {
        this.responsables = response
      })

      this.refreshOrganisation()
    },
    closeDrawerAndRefreshOrganisation() {
      this.showDrawerInvitation = false
      this.showDrawerAddResponsable = false
      this.fetch()
    },
  },
})
</script>
