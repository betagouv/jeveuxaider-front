<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        {
          text: 'Réseaux',
          to: $stores.auth.contextRole === 'admin' ? '/admin/contenus/reseaux' : null,
        },
        { text: reseau.name },
      ]"
    />
    <BaseAlertDialog
      icon="RiErrorWarningLine"
      title="Supprimer le responsable"
      :is-open="showAlertMemberDeleted"
      @confirm="handleConfirmDeleteMember"
      @cancel="showAlertMemberDeleted = false"
    >
      <strong>{{ memberSelected.full_name }}</strong> ne sera plus responsable du réseau
      <strong>{{ reseau.name }}</strong>
    </BaseAlertDialog>
    <BaseDrawer
      :is-open="showDrawerAddResponsable"
      form-id="form-add-responsable"
      submit-label="Ajouter ce responsable"
      @close="showDrawerAddResponsable = false"
    >
      <template #title>
        <BaseHeading :level="3"> Ajouter un responsable </BaseHeading>
      </template>
      <FormAddResponsable
        class="mt-8"
        :endpoint="`/reseaux/${reseau.id}/responsables`"
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
        <BaseHeading :level="3"> Inviter un responsable </BaseHeading>
      </template>
      <FormInvitation
        class="mt-8"
        role="responsable_reseau"
        :invitable-id="reseau.id"
        invitable-type="App\Models\Reseau"
        @submited="handleSubmitInvitation"
      />
    </BaseDrawer>
    <div v-if="reseau" class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12">
      <div class="lg:col-span-3 space-y-6">
        <BaseBox class="relative z-10">
          <img
            v-if="reseau.logo"
            :srcset="reseau.logo.urls.large"
            :alt="reseau.name"
            class="my-8 h-auto"
            style="max-width: 16rem; max-height: 120px"
          />
          <BaseHeading as="h1" :level="1">
            {{ reseau.name }}
          </BaseHeading>
          <BaseTextFormatted
            v-if="reseau.description"
            :max-lines="2"
            :text="reseau.description"
            class="text-cool-gray-500 text-lg mt-4"
          />
        </BaseBox>
        <BaseBox
          :style="`background-color: ${reseau.color ? reseau.color : '#B91C1C'}`"
          class="text-white"
        >
          <DomainsPublicsLinks :organisation="reseau" />
        </BaseBox>
        <BaseBox :padding="false">
          <iframe
            width="100%"
            height="100%"
            style="border: 0; min-height: 190px"
            loading="lazy"
            allowfullscreen
            :src="`https://www.google.com/maps/embed/v1/place?key=${googlePlacesKey}&q=${reseau.full_address}`"
          />
          <div class="text-sm px-6 py-4 flex justify-between items-center">
            <div class="font-bold text-gray-800 uppercase">Siège du réseau</div>
            <div class="text-gray-500">📍 {{ reseau.full_address }}</div>
          </div>
        </BaseBox>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <BaseHeading :level="1" class="mb-4">
              Réseau
              <span
                v-if="['admin'].includes($stores.auth.contextRole)"
                class="font-normal text-gray-500 text-2xl"
                >#{{ reseau.id }}</span
              >
            </BaseHeading>
            <div class="flex items-center space-x-4">
              <OnlineIndicator :published="!!reseau.is_published" :link="reseau.full_url" />
            </div>
          </div>
          <nuxt-link
            no-prefetch
            v-if="['admin'].includes($stores.auth.contextRole)"
            :to="`/admin/contenus/reseaux/${reseau.id}/edit`"
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
              {
                name: 'Responsables',
                to: '#responsables',
                icon: 'RiUserFill',
                current: $route.hash === '#responsables',
                count: reseau.responsables_count,
              },
              {
                name: 'Historique',
                to: '#historique',
                icon: 'RiTimeFill',
                current: $route.hash === '#historique',
              },
            ]"
          />
          <div v-if="$route.hash === '#infos' || !$route.hash">
            <div class="space-y-8">
              <BoxAntenne :reseau="reseau" :stats="stats" @updated="fetch()" />
              <BoxInvitations
                v-if="queryInvitationsAntennes && queryInvitationsAntennes.length > 0"
                class="!mt-4"
                :invitations="queryInvitationsAntennes"
                @updated="fetch()"
              />
              <div>
                <div
                  class="text-sm flex justify-between px-2 mb-2 uppercase font-semibold text-gray-600"
                >
                  Votre activité en chiffres
                </div>
                <BaseBox
                  variant="flat"
                  :padding="!Boolean(stats) ? 'lg' : false"
                  :loading="!Boolean(stats)"
                  loading-text="Récupération de l'activité ..."
                  class="!border-none"
                >
                  <div
                    v-if="stats"
                    class="grid grid-cols-1 lg:grid-cols-2 border bg-gray-200 gap-[1px]"
                  >
                    <CardStatistic
                      :value="stats.places_left"
                      :title="`${$filters.pluralize(
                        stats.places_left,
                        'Bénévole recherché',
                        'Bénévoles recherchés',
                        false
                      )}`"
                      :subtitle="
                        stats.places_left_waiting
                          ? `+${$numeral(stats.places_left_waiting)} places à venir`
                          : null
                      "
                    />
                    <CardStatistic
                      :value="`${stats.places_occupation_rate}%`"
                      :gauge-percentage="stats.places_occupation_rate"
                      title="Taux de remplissage"
                    />
                    <CardStatistic
                      :value="stats.missions_actives"
                      :title="`${$filters.pluralize(
                        stats.missions_actives,
                        'Missions en ligne',
                        'Missions en ligne',
                        false
                      )}`"
                      :subtitle="`sur ${$numeral(stats.missions)} ${$filters.pluralize(
                        stats.missions,
                        'mission',
                        'missions',
                        false
                      )}`"
                      :link="`/admin/missions?filter[structure.reseaux.id]=${reseau.id}&filter[structure.reseaux.name]=${reseau.name}`"
                      link-label="Missions"
                    />
                    <CardStatistic
                      :value="stats.participations_state['Validée']"
                      :title="`${$filters.pluralize(
                        stats.participations_state['Validée'],
                        'Participation validée',
                        'Participations validées',
                        false
                      )}`"
                      :subtitle="`sur ${$numeral(stats.participations)} ${$filters.pluralize(
                        stats.participations,
                        'candidature',
                        'candidatures',
                        false
                      )}`"
                      :link="`/admin/participations?filter[ofReseau]=${reseau.id}&reseau_name=${reseau.name}`"
                      link-label="Participations"
                    />
                  </div>
                </BaseBox>
              </div>
            </div>
          </div>
          <History v-if="$route.hash === '#historique'" :model-id="reseau.id" model-type="reseau" />
          <template v-if="$route.hash === '#responsables'">
            <div class="space-y-2">
              <BoxInvitations
                v-if="queryInvitations && queryInvitations.length > 0"
                :invitations="queryInvitations"
                @updated="fetch()"
              />
              <BaseBox
                v-for="responsable in reseau.responsables"
                :key="responsable.id"
                variant="flat"
                padding="xs"
              >
                <template #header>
                  <div class="flex justify-between items-center mb-4">
                    <BaseHeading as="h3" :level="5">
                      {{ responsable.profile.full_name }}
                    </BaseHeading>
                    <div
                      class="text-sm flex items-center cursor-pointer group hover:text-red-500"
                      @click="handleDeleteMember(responsable)"
                    >
                      <div class="group-hover:block hidden">Supprimer</div>
                      <div>
                        <RiDeleteBinLine class="ml-2 h-5 w-5 fill-current" />
                      </div>
                    </div>
                  </div>
                </template>
                <BaseDescriptionList v-if="responsable">
                  <BaseDescriptionListItem term="E-mail" :description="responsable.profile.email" />
                  <BaseDescriptionListItem
                    term="Mobile"
                    :description="responsable.profile.mobile"
                  />
                  <BaseDescriptionListItemMasquerade
                    v-if="$stores.auth.contextRole === 'admin'"
                    :profile="responsable.profile"
                  />
                </BaseDescriptionList>
              </BaseBox>
              <div class="space-x-2">
                <BaseButton variant="white" @click.native="showDrawerInvitation = true">
                  <RiUserFill class="h-4 w-4 mr-2" /> Inviter un responsable
                </BaseButton>
                <BaseButton
                  v-if="['admin'].includes($stores.auth.contextRole)"
                  variant="white"
                  @click.native="showDrawerAddResponsable = true"
                >
                  <RiAddLine class="h-4 w-4 mr-2" /> Ajouter un responsable
                </BaseButton>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script>
import MixinReseau from '@/mixins/reseau'
import History from '@/components/section/History.vue'
import DomainsPublicsLinks from '@/components/section/organisation/DomainsPublicsLinks.vue'
import FormInvitation from '@/components/form/FormInvitation.vue'
import FormAddResponsable from '@/components/form/FormAddResponsable.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'
import BoxInvitations from '@/components/section/BoxInvitations.vue'
import CardStatistic from '@/components/card/CardStatistic.vue'
import BoxAntenne from '@/components/section/reseau/BoxAntenne.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    History,
    DomainsPublicsLinks,
    OnlineIndicator,
    FormInvitation,
    FormAddResponsable,
    BoxInvitations,
    CardStatistic,
    BoxAntenne,
    Breadcrumb,
  },
  mixins: [MixinReseau],
  async setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })
    const { $stores } = useNuxtApp()
    const route = useRoute()
    const runtimeConfig = useRuntimeConfig()

    if (!['admin', 'tete_de_reseau'].includes($stores.auth.contextRole)) {
      return showError({ statusCode: 403 })
    }

    if ($stores.auth.contextRole == 'tete_de_reseau') {
      if ($stores.auth.contextableId != route.params.id) {
        return showError({ statusCode: 403 })
      }
    }

    const { data: reseau } = await useApiFetch(`/reseaux/${route.params.id}`)
    if (!reseau) {
      return showError({ statusCode: 404 })
    }

    return {
      reseau: toRef(reseau),
      googlePlacesKey: runtimeConfig.public.google.places,
    }
  },
  data() {
    return {
      stats: null,
      showDrawerInvitation: false,
      showDrawerAddResponsable: false,
      queryInvitations: null,
      queryInvitationsAntennes: null,
      memberSelected: {},
      showAlertMemberDeleted: false,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await Promise.all([
        this.fetchStatistics(),
        this.fetchReseauInvitations(),
        this.fetchReseauAntennesInvitations(),
      ]).finally(() => {
        // this.loading = false
      })
    },
    async fetchStatistics() {
      const stats = await apiFetch(`/statistics/reseaux/${this.reseau.id}`)
      this.stats = stats
    },
    async fetchReseauInvitations() {
      const queryInvitations = await apiFetch(`/reseaux/${this.reseau.id}/invitations-responsables`)
      this.queryInvitations = queryInvitations
    },
    async fetchReseauAntennesInvitations() {
      const queryInvitationsAntennes = await apiFetch(
        `/reseaux/${this.reseau.id}/invitations-antennes`
      )
      this.queryInvitationsAntennes = queryInvitationsAntennes
    },
    async refetch() {
      const reseau = await apiFetch(`/reseaux/${this.reseau.id}`)
      this.reseau = reseau
    },
    handleSubmitInvitation() {
      this.showDrawerInvitation = false
      this.fetch()
    },
    handleDeleteMember(member) {
      this.memberSelected = member
      this.showAlertMemberDeleted = true
    },
    async handleConfirmDeleteMember() {
      await apiFetch(`/reseaux/${this.reseau.id}/responsables/${this.memberSelected.id}`, {
        method: 'DELETE',
      })
      this.refetch()
      this.memberSelected = {}
      this.showAlertMemberDeleted = false
    },
    handleSubmitAddResponsable() {
      this.showDrawerAddResponsable = false
      this.refetch()
    },
  },
})
</script>
