<template>
  <div v-if="organisation" class="container">
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
    <BaseDrawer
      :is-open="showDrawerAddResponsable"
      form-id="form-add-responsable"
      submit-label="Ajouter ce membre"
      @close="showDrawerAddResponsable = false"
    >
      <template #title>
        <BaseHeading :level="3"> Ajouter un membre </BaseHeading>
      </template>
      <FormAddResponsable
        class="mt-8"
        :endpoint="`/structures/${organisation.id}/responsables`"
        @submited="handleSubmitAddResponsable"
      />
    </BaseDrawer>
    <BaseDrawer
      :is-open="showDrawerInvitation"
      form-id="form-invitation"
      submit-label="Envoyer l'invitation"
      @close="showDrawerInvitation = false"
    >
      <template #title>
        <BaseHeading :level="3"> Inviter un nouveau membre </BaseHeading>
      </template>
      <FormInvitation
        class="mt-8"
        role="responsable_organisation"
        :invitable-id="organisation.id"
        invitable-type="App\Models\Structure"
        @submited="handleSubmitInvitation"
      />
    </BaseDrawer>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12">
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
        <div class="flex items-start justify-between">
          <div>
            <BaseHeading :level="1" class="mb-4">
              Organisation
              <span
                v-if="['admin'].includes($stores.auth.contextRole)"
                class="font-normal text-gray-500 text-2xl"
                >#{{ organisation.id }}</span
              >
            </BaseHeading>
            <div class="flex items-center space-x-4">
              <BaseBadge :color="organisation.state">
                {{ organisation.state }}
              </BaseBadge>
              <OnlineIndicator
                v-if="organisation.statut_juridique === 'Association'"
                :published="hasPageOnline"
                :link="hasPageOnline ? `/organisations/${organisation.slug}` : null"
              />
            </div>
          </div>
          <nuxt-link
            v-if="organisation?.permissions?.canUpdate"
            :to="`/admin/organisations/${organisation.id}/edit`"
          >
            <BaseButton icon="RiPencilLine"> Modifier </BaseButton>
          </nuxt-link>
        </div>

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
            <SelectOrganisationState
              v-if="canEditStatut"
              :organisation="organisation"
              @selected="handleChangeState($event)"
            />

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
                    :link="`/admin/missions?context_name=${organisation.name}&filter[structure.id]=${organisation.id}`"
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
                    :link="`/admin/participations?filter[mission.structure.name]=${organisation.name}&filter[mission.structure.id]=${organisation.id}`"
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
            <div class="space-y-2">
              <BoxInvitations
                v-if="queryInvitations && queryInvitations.data.length > 0"
                :invitations="queryInvitations.data"
                @updated="fetch"
              />
              <BoxMember
                v-for="responsable in responsables"
                :key="responsable.id"
                :responsable="responsable.profile"
                :organisation="organisation"
                @updated="fetch"
                @removed="fetch"
              />
              <div class="space-x-2">
                <BaseButton variant="white" @click.native="showDrawerInvitation = true">
                  <RiUserFill class="h-4 w-4 mr-2" /> Inviter un membre
                </BaseButton>
                <BaseButton
                  v-if="['admin'].includes($stores.auth.contextRole)"
                  variant="white"
                  @click.native="showDrawerAddResponsable = true"
                >
                  <RiAddLine class="h-4 w-4 mr-2" /> Ajouter un membre
                </BaseButton>
              </div>
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
import History from '@/components/section/History'
import HistoryStateChanges from '@/components/section/HistoryStateChanges.vue'
import MixinOrganisation from '@/mixins/organisation'
import DomainsPublicsLinks from '@/components/section/organisation/DomainsPublicsLinks'
import BoxInformations from '@/components/section/organisation/BoxInformations'
import OnlineIndicator from '~/components/custom/OnlineIndicator'
import CardStatistic from '@/components/card/CardStatistic'
import FormInvitation from '@/components/form/FormInvitation'
import FormAddResponsable from '@/components/form/FormAddResponsable'
import BoxInvitations from '@/components/section/BoxInvitations'
import SelectOrganisationState from '@/components/custom/SelectOrganisationState'
import BoxReferents from '@/components/section/BoxReferents'
import BoxReseau from '@/components/section/organisation/BoxReseau'
import BoxNotes from '@/components/custom/BoxNotes'
import BoxMember from '@/components/section/BoxMember'
import BoxScore from '@/components/section/organisation/BoxScore.vue'
import BoxAideModeration from '@/components/section/organisation/BoxAideModeration.vue'

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
    SelectOrganisationState,
    BoxReferents,
    BoxReseau,
    BoxNotes,
    BoxMember,
    BoxScore,
    BoxAideModeration,
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

    const organisation = await apiFetch(`/structures/${route.params.id}`)

    if (!organisation) {
      return showError({ statusCode: 404 })
    }

    return {
      organisation: toRef(organisation),
      googlePlacesKey: runtimeConfig.public.google.places,
    }
  },
  data() {
    return {
      organisationStats: null,
      showDrawerInvitation: false,
      showDrawerAddResponsable: false,
      queryInvitations: null,
      responsables: [],
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

      apiFetch('/invitations', {
        params: {
          'filter[of_structure]': this.organisation.id,
          pagination: 999,
        },
      }).then((response) => {
        this.queryInvitations = response
      })

      apiFetch(`/structures/${route.params.id}/responsables`).then((response) => {
        this.responsables = response
      })
    },
    async refetch() {
      const organisation = await apiFetch(`/structures/${this.organisation.id}`)
      this.organisation = organisation
      const responsables = await apiFetch(`/structures/${this.organisation.id}/responsables`)
      this.responsables = responsables
    },
    async handleChangeState(event) {
      await apiFetch(`/structures/${this.organisation.id}`, {
        method: 'PUT',
        body: {
          ...this.organisation,
          state: event.key,
        },
      })
        .then(() => {
          this.organisation.state = event.key
        })
        .catch(() => {})
    },
    handleSubmitInvitation() {
      this.showDrawerInvitation = false
      this.fetch()
    },
    handleSubmitAddResponsable() {
      this.showDrawerAddResponsable = false
      this.refetch()
    },
  },
})
</script>
