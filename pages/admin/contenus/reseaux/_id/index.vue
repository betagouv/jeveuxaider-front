<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Réseaux', link: $store.getters.contextRole === 'admin' ? '/admin/contenus/reseaux' : null },
        { label: reseau.name },
      ]"
    />
    <AlertDialog
      theme="danger"
      title="Supprimer le responsable"
      :text="`<strong>${memberSelected.full_name}</strong> ne sera plus responsable du réseau <strong>${reseau.name}</strong>`"
      :is-open="showAlertMemberDeleted"
      @confirm="handleConfirmDeleteMember"
      @cancel="showAlertMemberDeleted = false"
    />
    <Drawer :is-open="showDrawerInvitation" form-id="form-invitation" submit-label="Envoyer l'invitation" @close="showDrawerInvitation = false">
      <template #title>
        <Heading :level="3">
          Inviter un responsable
        </Heading>
      </template>
      <FormInvitation
        class="mt-8"
        role="responsable_reseau"
        :invitable-id="reseau.id"
        invitable-type="App\Models\Reseau"
        @submited="handleSubmitInvitation"
      />
    </Drawer>
    <div v-if="reseau" class="grid grid-cols-1 lg:grid-cols-5 gap-8 py-12">
      <div class="lg:col-span-3 space-y-6">
        <Box class="relative z-10">
          <img
            v-if="reseau.logo"
            :srcset="reseau.logo.urls.large"
            :alt="reseau.name"
            class="my-8 h-auto"
            style="max-width: 16rem; max-height: 120px"
          >
          <Heading as="h1" :level="1">
            {{ reseau.name }}
          </Heading>
          <TextFormatted v-if="reseau.description" :max-lines="2" :text="reseau.description" class="text-cool-gray-500 text-lg mt-4" />
        </Box>
        <Box :style="`background-color: ${reseau.color ? reseau.color : '#B91C1C'}`" class="text-white">
          <DomainsPublicsLinks :organisation="reseau" />
        </Box>
        <Box :padding="false">
          <iframe
            width="100%"
            height="100%"
            style="border: 0; min-height: 190px"
            loading="lazy"
            allowfullscreen
            :src="`https://www.google.com/maps/embed/v1/place?key=${$config.google.places}&q=${reseau.full_address}`"
          />
          <div class="text-sm px-6 py-4 flex justify-between items-center">
            <div class="font-bold text-gray-800 uppercase">
              Siège du réseau
            </div>
            <div class="text-gray-500">
              📍 {{ reseau.full_address }}
            </div>
          </div>
        </Box>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1" class="mb-4">
              Réseau <span v-if="['admin'].includes($store.getters.contextRole)" class=" font-normal text-gray-500 text-2xl">#{{ reseau.id }}</span>
            </Heading>
            <div class="flex items-center space-x-4">
              <OnlineIndicator :published="!!reseau.is_published" :link="reseau.full_url" />
            </div>
          </div>
          <nuxt-link v-if="['admin', 'tete_de_reseau'].includes($store.getters.contextRole)" :to="`/admin/contenus/reseaux/${reseau.id}/edit`">
            <Button icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
        </div>
        <client-only>
          <Tabs
            :tabs="[
              { name: 'Informations', to: '', icon: 'InformationCircleIcon', current: $route.hash === '' },
              { name: 'Responsables', to: '#responsables', icon: 'UsersIcon', current: $route.hash === '#responsables', count: reseau.responsables_count },
              { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash === '#historique' }
            ]"
          />
          <div v-if="$route.hash === ''">
            <div class="space-y-8">
              <BoxAntenne :reseau="reseau" :stats="stats" @updated="$fetch()" />
              <BoxInvitations v-if="queryInvitationsAntennes && queryInvitationsAntennes.data.length > 0" class="!mt-4" :invitations="queryInvitationsAntennes.data" @updated="$fetch()" />
              <div>
                <div class="text-sm flex justify-between px-2 mb-2 uppercase font-semibold text-gray-600">
                  Votre activité en chiffres
                </div>
                <Box variant="flat" :padding="!Boolean(stats) ? 'lg' : false" :loading="!Boolean(stats)" loading-text="Récupération de l'activité ..." class="!border-none">
                  <div v-if="stats" class="grid grid-cols-1 lg:grid-cols-2 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
                    <CardStatistic
                      :value="stats.places_left"
                      :title="`${$options.filters.pluralize(stats.places_left, 'Bénévole recherché', 'Bénévoles recherchés', false)}`"
                      :subtitle="stats.places_left_waiting ? `+${$options.filters.formatNumber(stats.places_left_waiting)} en cours de validation` : null"
                    />
                    <CardStatistic
                      :value="`${stats.places_occupation_rate}%`"
                      :gauge-percentage="stats.places_occupation_rate"
                      title="Taux de remplissage"
                    />
                    <CardStatistic
                      :value="stats.missions_actives"
                      :title="`${$options.filters.pluralize(stats.missions_actives, 'Missions en ligne', 'Missions en ligne', false)}`"
                      :subtitle="`sur ${$options.filters.formatNumber(stats.missions)} ${$options.filters.pluralize(stats.missions, 'mission', 'missions', false)}`"
                      :link="`/admin/missions?filter[structure.reseaux.id]=${reseau.id}&filter[structure.reseaux.name]=${reseau.name}`"
                      link-label="Missions"
                    />
                    <CardStatistic
                      :value="stats.participations_state['Validée']"
                      :title="`${$options.filters.pluralize(stats.participations_state['Validée'], 'Participation validée', 'Participations validées', false)}`"
                      :subtitle="`sur ${$options.filters.formatNumber(stats.participations)} ${$options.filters.pluralize(stats.participations, 'candidature', 'candidatures', false)}`"
                      :link="`/admin/participations?filter[ofReseau]=${reseau.id}&reseau_name=${reseau.name}`"
                      link-label="Participations"
                    />
                  </div>
                </Box>
              </div>
            </div>
          </div>
          <History v-if="$route.hash === '#historique'" :model-id="reseau.id" model-type="reseau" />
          <template v-if="$route.hash === '#responsables'">
            <div class="space-y-2">
              <BoxInvitations v-if="queryInvitations && queryInvitations.data.length > 0" :invitations="queryInvitations.data" @updated="$fetch()" />

              <Box v-for="responsable in reseau.responsables" :key="responsable.id" variant="flat" padding="xs">
                <div class="flex justify-between items-start">
                  <DescriptionList v-if="responsable">
                    <DescriptionListItem term="Nom" :description="responsable.full_name" />
                    <DescriptionListItem term="E-mail" :description="responsable.email" />
                    <DescriptionListItem term="Mobile" :description="responsable.mobile" />
                    <DescriptionListItemMasquerade v-if="$store.getters.contextRole === 'admin'" :profile="responsable" />
                  </DescriptionList>
                  <div class="text-sm flex mt-2 items-center cursor-pointer group hover:text-red-500" @click="handleDeleteMember(responsable)">
                    <div class="group-hover:block hidden">
                      Supprimer
                    </div>
                    <div><TrashIcon class="ml-2 h-5 w-5" /></div>
                  </div>
                </div>
              </Box>
              <Button variant="white" @click.native="showDrawerInvitation = true">
                <UsersIcon class="h-4 w-4 mr-2" /> Inviter un responsable
              </Button>
            </div>
          </template>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import MixinReseau from '@/mixins/reseau'
import History from '@/components/section/History'
import DomainsPublicsLinks from '@/components/section/organisation/DomainsPublicsLinks'
import FormInvitation from '@/components/form/FormInvitation'
import OnlineIndicator from '@/components/custom/OnlineIndicator'
import BoxInvitations from '@/components/section/BoxInvitations'
import CardStatistic from '@/components/card/CardStatistic'
import BoxAntenne from '@/components/section/reseau/BoxAntenne'

export default {
  components: {
    History,
    DomainsPublicsLinks,
    OnlineIndicator,
    FormInvitation,
    BoxInvitations,
    CardStatistic,
    BoxAntenne
  },
  mixins: [MixinReseau],
  middleware: 'authenticated',
  async asyncData ({ $axios, params, error, store }) {
    if (!['admin', 'tete_de_reseau'].includes(store.getters.contextRole)) {
      return error({ statusCode: 403 })
    }
    const { data: reseau } = await $axios.get(`/reseaux/${params.id}`)
    if (!reseau) {
      return error({ statusCode: 404 })
    }

    if (store.getters.contextRole === 'tete_de_reseau') {
      if (store.state.auth.user.profile.tete_de_reseau_id !== reseau.id) {
        return error({ statusCode: 403 })
      }
    }

    return {
      reseau
    }
  },
  data () {
    return {
      stats: null,
      showDrawerInvitation: false,
      queryInvitations: null,
      queryInvitationsAntennes: null,
      memberSelected: {},
      showAlertMemberDeleted: false
    }
  },
  async fetch () {
    const { data: stats } = await this.$axios.get(`/statistics/reseaux/${this.reseau.id}`)
    this.stats = stats

    const { data: queryInvitations } = await this.$axios.get('/invitations', {
      params: {
        'filter[of_reseau]': this.reseau.id,
        pagination: 999
      }
    })
    this.queryInvitations = queryInvitations

    const { data: queryInvitationsAntennes } = await this.$axios.get('/invitations', {
      params: {
        'filter[of_reseau_and_role_antenne]': this.reseau.id,
        pagination: 999
      }
    })
    this.queryInvitationsAntennes = queryInvitationsAntennes
  },
  methods: {
    handleSubmitInvitation () {
      this.showDrawerInvitation = false
      this.$fetch()
    },
    handleDeleteMember (member) {
      this.memberSelected = member
      this.showAlertMemberDeleted = true
    },
    async handleConfirmDeleteMember () {
      await this.$axios.delete(`/reseaux/${this.reseau.id}/responsables/${this.memberSelected.id}`)
      const { data: reseau } = await this.$axios.get(`/reseaux/${this.reseau.id}`)
      this.reseau = reseau
      this.memberSelected = {}
      this.showAlertMemberDeleted = false
    }
  }
}
</script>
