<template>
  <div
    v-if="organisation"
    class="container"
  >
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Organisations', link: '/admin/organisations' },
        { label: organisation && organisation.name },
      ]"
    />
    <AlertDialog
      theme="danger"
      title="Supprimer un membre de votre organisation"
      :text="`<strong>${memberSelected.full_name}</strong> ne fera plus partie de l'organisation <strong>${organisation.name}</strong>.<br /><br />Cette personne ne pourra plus gérer les missions proposées sur JeVeuxAider.gouv.fr.`"
      :is-open="showAlertMemberDeleted"
      @confirm="handleConfirmDeleteMember"
      @cancel="showAlertMemberDeleted = false"
    />
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
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 py-12">
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
          <TextFormatted v-if="organisation.description" :max-lines="2" :text="organisation.description" class="text-cool-gray-500 text-lg mt-4" />
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
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1" class="mb-4">
              Organisation <span class=" font-normal text-gray-500 text-2xl">#{{ organisation.id }}</span>
            </Heading>
            <div class="flex items-center space-x-4">
              <Badge :color="organisation.state">
                {{ organisation.state }}
              </Badge>
              <OnlineIndicator :published="hasPageOnline" :link="`/organisations/${organisation.slug}`" />
            </div>
          </div>
          <nuxt-link :to="`/admin/organisations/${organisation.id}/edit`">
            <Button icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
        </div>
        <Tabs
          :tabs="[
            { name: 'Informations', to: '', icon: 'InformationCircleIcon', current: !$route.hash },
            { name: 'Membres', to: '#membres', icon: 'UsersIcon', current: $route.hash == '#membres', count: organisation.members.length },
            { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash == '#historique' }
          ]"
        />
        <div v-if="!$route.hash" class="space-y-8">
          <SelectOrganisationState
            v-if="canEditStatut"
            :value="organisation.state"
            @selected="handleChangeState($event)"
          />

          <div>
            <div class="text-sm flex justify-between px-2 mb-2 uppercase font-semibold text-gray-600">
              Votre activité en chiffres
            </div>
            <Box variant="flat" :padding="!Boolean(organisationStats) ? 'lg' : false" :loading="!Boolean(organisationStats)" loading-text="Récupération de l'activité ..." class="!border-none">
              <div v-if="organisationStats" class="grid grid-cols-1 lg:grid-cols-2 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
                <CardStatistic
                  :value="organisationStats.places_left"
                  :title="`${$options.filters.pluralize(organisationStats.places_left, 'Bénévole recherché', 'Bénévoles recherchés', false)}`"
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
          <div v-if="organisationStats && organisationStats.response_ratio">
            <div class="px-2 mb-2 text-sm uppercase font-semibold text-gray-600">
              Vos échanges avec les bénévoles
            </div>
            <Box variant="flat" :padding="!Boolean(organisationStats) ? 'lg' : false" :loading="!Boolean(organisationStats)" loading-text="Récupération de l'activité ..." class="!border-none">
              <div v-if="organisationStats" class="grid grid-cols-1 lg:grid-cols-2 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
                <CardStatistic
                  :value="`${organisationStats.response_ratio}%`"
                  title="Taux de réponse"
                  subtitle="aux participations"
                />
                <CardStatistic
                  :value="`${(organisationStats.response_time / (60 * 60 * 24)).toFixed(0)} jours`"
                  title="Temps de réponse"
                  subtitle="aux participations"
                />
                <div class="col-span-2 bg-white">
                  <CardStatistic
                    :value="`${organisationStats.score_response_time}/100`"
                    title="Score de réactivité"
                  />
                  <div class="text-xs text-gray-700 font-medium text-center px-12 -mt-3 mb-4">
                    🏆 Améliorez votre visibilité sur la plateforme<br> en améliorant votre réactivité ›
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
        <template v-if="$route.hash == '#membres'">
          <div class="space-y-2">
            <BoxInvitations
              v-if="queryInvitations && queryInvitations.data.length > 0"
              :invitations="queryInvitations.data"
              @updated="$fetch()"
            />

            <Box v-for="responsable in organisation.members" :key="responsable.id" variant="flat" padding="xs">
              <div class="flex justify-between items-start">
                <DescriptionList v-if="responsable">
                  <DescriptionListItem term="Nom" :description="responsable.full_name" />
                  <DescriptionListItem term="E-mail" :description="responsable.email" />
                  <DescriptionListItem term="Mobile" :description="responsable.mobile" />
                  <DescriptionListItemMasquerade v-if="$store.getters.contextRole === 'admin'" :profile="responsable" />
                </DescriptionList>
                <div v-if="responsable.id !== $store.state.auth.user.profile.id && organisation.members.length > 1" class="text-sm flex mt-2 items-center cursor-pointer group hover:text-red-500" @click="handleDeleteMember(responsable)">
                  <div class="group-hover:block hidden">
                    Supprimer
                  </div>
                  <div><TrashIcon class="ml-2 h-5 w-5" /></div>
                </div>
              </div>
            </Box>
            <Button variant="white" @click.native="showDrawerInvitation = true">
              <UsersIcon class="h-4 w-4 mr-2" /> Inviter un membre
            </Button>
          </div>
        </template>
        <History v-if="$route.hash == '#historique'" :model-id="organisation.id" model-type="structure" />
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History'
import MixinOrganisation from '@/mixins/organisation'
import DomainsPublicsLinks from '@/components/section/organisation/DomainsPublicsLinks'
import BoxInformations from '@/components/section/organisation/BoxInformations'
import OnlineIndicator from '~/components/custom/OnlineIndicator'
import CardStatistic from '@/components/card/CardStatistic'
import FormInvitation from '@/components/form/FormInvitation'
import BoxInvitations from '@/components/section/BoxInvitations'
import SelectOrganisationState from '@/components/custom/SelectOrganisationState'

export default {
  components: {
    History,
    DomainsPublicsLinks,
    OnlineIndicator,
    BoxInformations,
    CardStatistic,
    FormInvitation,
    BoxInvitations,
    SelectOrganisationState
  },
  mixins: [MixinOrganisation],
  middleware: 'authenticated',
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

    const { data: organisation } = await $axios.get(`/structures/${params.id}`)
    if (!organisation) {
      return error({ statusCode: 404 })
    }

    if (store.getters.contextRole == 'responsable') {
      if (store.getters.contextableId != organisation.id) {
        return error({ statusCode: 403 })
      }
    }

    return {
      organisation
    }
  },
  data () {
    return {
      organisationStats: null,
      showDrawerInvitation: false,
      queryInvitations: null,
      memberSelected: {},
      showAlertMemberDeleted: false
    }
  },
  async fetch () {
    const { data: stats } = await this.$axios.get(`/statistics/organisations/${this.organisation.id}`)
    this.organisationStats = stats

    const { data: queryInvitations } = await this.$axios.get('/invitations', {
      params: {
        'filter[of_structure]': this.organisation.id
      }
    })
    this.queryInvitations = queryInvitations
  },
  methods: {
    async handleChangeState (event) {
      this.organisation.state = event.key
      await this.$axios.put(`/structures/${this.organisation.id}`, this.organisation)
    },
    handleSubmitInvitation () {
      this.showDrawerInvitation = false
      this.$fetch()
    },
    handleDeleteMember (member) {
      this.memberSelected = member
      this.showAlertMemberDeleted = true
    },
    async handleConfirmDeleteMember () {
      await this.$axios.delete(`/structures/${this.organisation.id}/members/${this.memberSelected.id}`)
      const { data: organisation } = await this.$axios.get(`/structures/${this.organisation.id}`)
      this.organisation = organisation
      this.memberSelected = {}
      this.showAlertMemberDeleted = false
    }
  }
}
</script>
