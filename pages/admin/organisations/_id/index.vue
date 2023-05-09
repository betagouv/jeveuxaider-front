<template>
  <div
    v-if="organisation"
    class="container"
  >
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Organisations', to: ['admin','referent','referent_regional','tete_de_reseau'].includes($store.getters.contextRole) ? '/admin/organisations' : null },
        { text: organisation && organisation.name },
      ]"
    />
    <Drawer :is-open="showDrawerAddResponsable" form-id="form-add-responsable" submit-label="Ajouter ce membre" @close="showDrawerAddResponsable = false">
      <template #title>
        <Heading :level="3">
          Ajouter un membre
        </Heading>
      </template>
      <FormAddResponsable
        class="mt-8"
        :endpoint="`/structures/${organisation.id}/responsables`"
        @submited="handleSubmitAddResponsable"
      />
    </Drawer>
    <Drawer :is-open="showDrawerInvitation" form-id="form-invitation" submit-label="Envoyer l'invitation" @close="showDrawerInvitation = false">
      <template #title>
        <Heading :level="3">
          Inviter un nouveau membre
        </Heading>
      </template>
      <FormInvitation
        class="mt-8"
        role="responsable_organisation"
        :invitable-id="organisation.id"
        invitable-type="App\Models\Structure"
        @submited="handleSubmitInvitation"
      />
    </Drawer>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12">
      <div class="lg:col-span-3 space-y-6">
        <Box class="relative z-10">
          <img
            v-if="organisation.logo"
            :srcset="organisation.logo.urls.large"
            :alt="organisation.name"
            class="my-8 h-auto"
            style="max-width: 16rem; max-height: 120px"
          >
          <Heading as="h1" :level="1">
            {{ organisation.name }}
          </Heading>
          <TextFormatted
            v-if="organisation.description && !['Collectivité', 'Organisation publique'].includes(organisation.statut_juridique)"
            :text="organisation.description"
            :max-lines="2"
            class="text-cool-gray-500 text-lg mt-4"
          />
        </Box>
        <BoxInformations class="mb-8" :organisation="organisation" :show-title="false" box-variant="shadow" box-padding="lg" />
        <Box :style="`background-color: ${organisation.color ? organisation.color : '#B91C1C'}`" class="text-white">
          <DomainsPublicsLinks :organisation="organisation" />
        </Box>
        <Box :padding="false">
          <iframe
            width="100%"
            height="100%"
            style="border: 0; min-height: 190px"
            loading="lazy"
            allowfullscreen
            :src="`https://www.google.com/maps/embed/v1/place?key=${$config.google.places}&q=${organisation.full_address}`"
          />
          <div class="text-sm px-6 py-4 flex justify-between items-center">
            <div class="font-bold text-gray-800 uppercase">
              Siège de l'organisation
            </div>
            <div class="text-gray-500">
              📍 {{ organisation.full_address }}
            </div>
          </div>
        </Box>
        <BoxNotes
          v-if="['admin','referent'].includes($store.getters.contextRole)"
          notable-type="structures"
          :notable-id="organisation.id"
        />
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1" class="mb-4">
              Organisation <span v-if="['admin'].includes($store.getters.contextRole)" class=" font-normal text-gray-500 text-2xl">#{{ organisation.id }}</span>
            </Heading>
            <div class="flex items-center space-x-4">
              <Badge :color="organisation.state">
                {{ organisation.state }}
              </Badge>
              <OnlineIndicator v-if="organisation.statut_juridique === 'Association'" :published="hasPageOnline" :link="hasPageOnline ? `/organisations/${organisation.slug}` : null" />
            </div>
          </div>
          <nuxt-link v-if="organisation?.permissions?.canUpdate" :to="`/admin/organisations/${organisation.id}/edit`">
            <Button icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
        </div>

        <client-only>
          <Tabs
            :tabs="[
              { name: 'Informations', to: '', icon: 'InformationCircleSolidIcon', current: !['#membres','#historique'].includes($route.hash) },
              organisation?.permissions?.canUpdate ? { name: 'Membres', to: '#membres', icon: 'UsersIcon', current: $route.hash === '#membres', count: organisation.members.length } : null,
              { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash === '#historique' }
            ]"
          />
          <div v-if="!['#membres','#historique'].includes($route.hash)" class="space-y-8">
            <SelectOrganisationState
              v-if="canEditStatut"
              :value="organisation.state"
              @selected="handleChangeState($event)"
            />

            <BoxAideModeration v-if="['admin'].includes($store.getters.contextRole)" :organisation="organisation" />

            <div>
              <div class="text-sm flex justify-between px-2 mb-2 uppercase font-semibold text-gray-600">
                Votre activité en chiffres
              </div>
              <Box variant="flat" :padding="!Boolean(organisationStats) ? 'lg' : false" :loading="!Boolean(organisationStats)" loading-text="Récupération de l'activité ..." class="!border-none">
                <div v-if="organisationStats" class="grid grid-cols-1 lg:grid-cols-2 border bg-gray-200 gap-[1px]">
                  <CardStatistic
                    :value="organisationStats.places_left"
                    :title="`${$options.filters.pluralize(organisationStats.places_left, 'Bénévole recherché', 'Bénévoles recherchés', false)}`"
                    :subtitle="organisationStats.places_left_waiting ? `+${$options.filters.formatNumber(organisationStats.places_left_waiting)} places à venir` : null"
                  />
                  <CardStatistic
                    :value="`${organisationStats.places_occupation_rate}%`"
                    :gauge-percentage="organisationStats.places_occupation_rate"
                    title="Taux de remplissage"
                  />
                  <CardStatistic
                    :value="organisationStats.missions_available"
                    :title="`${$options.filters.pluralize(organisationStats.missions_available, 'Missions en ligne', 'Missions en ligne', false)}`"
                    :subtitle="`sur ${$options.filters.formatNumber(organisationStats.missions_total)} ${$options.filters.pluralize(organisationStats.missions_total, 'mission', 'missions', false)}`"
                    :link="`/admin/missions?context_name=${organisation.name}&filter[structure.id]=${organisation.id}`"
                    link-label="Missions"
                  />
                  <CardStatistic
                    :value="organisationStats.participations_state['Validée']"
                    :title="`${$options.filters.pluralize(organisationStats.participations_state['Validée'], 'Participation validée', 'Participations validées', false)}`"
                    :subtitle="`sur ${$options.filters.formatNumber(organisationStats.participations_total)} ${$options.filters.pluralize(organisationStats.participations_total, 'candidature', 'candidatures', false)}`"
                    :link="`/admin/participations?filter[mission.structure.name]=${organisation.name}&filter[mission.structure.id]=${organisation.id}`"
                    link-label="Participations"
                  />
                </div>
              </Box>
            </div>
            <div>
              <div class="text-sm flex justify-between px-2 mb-2 uppercase font-semibold text-gray-600">
                Votre visibilité
              </div>
              <BoxScore :variant="false" :padding="false" :structure-id="organisation.id" />
            </div>

            <BoxReseau v-for="reseau in organisation.reseaux" :key="reseau.id" class="mb-8" :reseau="reseau" />
            <BoxReferents v-if="['admin'].includes($store.getters.contextRole)" class="mb-8" :department="organisation.department" />
          </div>
          <template v-if="$route.hash === '#membres'">
            <div class="space-y-2">
              <BoxInvitations
                v-if="queryInvitations && queryInvitations.data.length > 0"
                :invitations="queryInvitations.data"
                @updated="$fetch()"
              />
              <BoxMember
                v-for="responsable in responsables"
                :key="responsable.id"
                :responsable="responsable.profile"
                :organisation="organisation"
                @updated="$fetch"
                @removed="$fetch"
              />
              <div class="space-x-2">
                <Button variant="white" @click.native="showDrawerInvitation = true">
                  <UsersIcon class="h-4 w-4 mr-2" /> Inviter un membre
                </Button>
                <Button v-if="['admin'].includes($store.getters.contextRole)" variant="white" @click.native="showDrawerAddResponsable = true">
                  <PlusIcon class="h-4 w-4 mr-2" /> Ajouter un membre
                </Button>
              </div>
            </div>
          </template>
          <template v-if="$route.hash === '#historique'">
            <HistoryStateChanges :model-id="organisation.id" model-type="structure" />
            <History :model-id="organisation.id" model-type="structure" />
          </template>
        </client-only>
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
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import BoxScore from '@/components/section/organisation/BoxScore.vue'
import BoxAideModeration from '@/components/section/organisation/BoxAideModeration.vue'

export default {
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
    Breadcrumb,
    BoxScore,
    BoxAideModeration
  },
  mixins: [MixinOrganisation],
  middleware: ['authenticated', 'agreedResponsableTerms'],
  async asyncData ({ $axios, params, error, store }) {
    if (
      ![
        'admin',
        'referent',
        'referent_regional',
        'tete_de_reseau',
        'responsable'
      ].includes(store.getters.contextRole)
    ) {
      return error({ statusCode: 403 })
    }

    if (store.getters.contextRole == 'responsable') {
      if (store.getters.contextableId != params.id) {
        return error({ statusCode: 403 })
      }
    }

    const { data: organisation } = await $axios.get(`/structures/${params.id}`)
    if (!organisation) {
      return error({ statusCode: 404 })
    }

    return {
      organisation
    }
  },
  data () {
    return {
      organisationStats: null,
      showDrawerInvitation: false,
      showDrawerAddResponsable: false,
      queryInvitations: null,
      responsables: []
    }
  },
  async fetch () {
    const { data: stats } = await this.$axios.get(`/statistics/organisations/${this.organisation.id}`)
    this.organisationStats = stats

    const { data: queryInvitations } = await this.$axios.get('/invitations', {
      params: {
        'filter[of_structure]': this.organisation.id,
        pagination: 999
      }
    })
    this.queryInvitations = queryInvitations

    const { data: responsables } = await this.$axios.get(`/structures/${this.organisation.id}/responsables`)
    this.responsables = responsables
  },
  methods: {
    async refetch () {
      const { data: organisation } = await this.$axios.get(`/structures/${this.organisation.id}`)
      this.organisation = organisation
      const { data: responsables } = await this.$axios.get(`/structures/${this.organisation.id}/responsables`)
      this.responsables = responsables
    },
    async handleChangeState (event) {
      await this.$axios.put(`/structures/${this.organisation.id}`, {
        ...this.organisation,
        state: event.key
      }).then(() => {
        this.organisation.state = event.key
      }).catch(() => {})
    },
    handleSubmitInvitation () {
      this.showDrawerInvitation = false
      this.$fetch()
    },
    handleSubmitAddResponsable () {
      this.showDrawerAddResponsable = false
      this.refetch()
    }
  }
}
</script>
