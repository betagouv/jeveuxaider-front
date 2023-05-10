<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Missions', to: '/admin/missions' },
        { text: mission.name },
      ]"
    />
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12">
      <div class="lg:col-span-3 space-y-6">
        <Presentation :mission="mission" />
        <PresentielOrDistance :mission="mission" />
        <Details :mission="mission" />
        <BoxNotes
          v-if="['admin','referent'].includes($store.getters.contextRole)"
          notable-type="missions"
          :notable-id="mission.id"
        />
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1" class="mb-4">
              Mission <span class=" font-normal text-gray-500 text-2xl">#{{ mission.id }}</span>
            </Heading>
            <div class="flex items-center space-x-4">
              <Badge :color="mission.state">
                {{ mission.state }}
              </Badge>
              <OnlineIndicator :published="hasPageOnline" :link="`/missions-benevolat/${mission.id}/${mission.slug}`" />
            </div>
          </div>
          <nuxt-link :to="`/admin/missions/${mission.id}/edit`">
            <Button icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
        </div>

        <Box v-if="!mission.is_active || (['admin'].includes($store.getters.contextRole) && mission.state == 'Validée')" variant="flat" :padding="false">
          <div class="px-4 py-4 xl:py-6 xl:px-6">
            <div class="formatted-text">
              <template v-if="!['admin'].includes($store.getters.contextRole)">
                <p>
                  <span aria-hidden="true" class="font-emoji text-2xl mr-2">⚠️</span> La mission <strong>a été désactivée</strong> par un membre du support car vous avez <strong>trop de participations non modérées</strong> (validées ou refusées). Elle n’est plus visible des bénévoles.
                </p>
                <p>
                  Pour toute information, veuillez contacter le support à l’adresse <Link href="\'mailto:support@jeveuxaider.beta.gouv.fr\'">
                    support@jeveuxaider.beta.gouv.fr
                  </Link>
                </p>
              </template>
              <p v-else>
                La mission est actuellement <strong>{{ mission.is_active ? 'activée' : 'désactivée' }}</strong>.
              </p>
            </div>

            <Link
              v-if="['admin'].includes($store.getters.contextRole)"
              class="text-jva-blue-500 mt-2"
              @click.native="showModalSwitchIsActive = true"
            >
              {{ mission.is_active ? 'Désactiver la mission' : 'Activer la mission' }}
            </Link>
            <ModalMissionToggleIsActive
              :mission="mission"
              :is-open="showModalSwitchIsActive"
              @cancel="showModalSwitchIsActive = false"
              @confirm="afterChangeIsActive"
            />
          </div>
        </Box>

        <client-only>
          <Tabs
            :tabs="[
              { name: 'Informations', to: '', icon: 'InformationCircleSolidIcon', current: !['#historique'].includes($route.hash) },
              { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash === '#historique' }
            ]"
          />
          <div v-if="!['#historique'].includes($route.hash)" class="space-y-8">
            <SelectMissionState
              v-if="canEditStatut"
              :value="mission.state"
              :mission="mission"
              :mission-stats="missionStats"
              @selected="handleChangeState($event)"
            />
            <BoxAideModeration v-if="['admin'].includes($store.getters.contextRole)" :mission="mission" />
            <BoxDates :mission="mission" />
            <BoxPlace :mission="mission" @updated="handleChangePlace($event)" />
            <BoxEnChiffre :mission="mission" />
            <BoxInformations :mission="mission" />
            <BoxReferents v-if="['admin'].includes($store.getters.contextRole)" class="mb-8" :department="mission.department" />

            <BoxResponsable
              v-if="mission.responsable"
              :responsable="mission.responsable"
              :conversable-id="mission.id"
              conversable-type="App\Models\Mission"
            />
            <BoxOrganisation :organisation="mission.structure" />
          </div>
          <template v-if="$route.hash === '#historique'">
            <HistoryStateChanges :model-id="mission.id" model-type="mission" />
            <History :model-id="mission.id" model-type="mission" />
          </template>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import PresentielOrDistance from '@/components/section/mission/PresentielOrDistance.vue'
import Presentation from '@/components/section/mission/Presentation.vue'
import Details from '@/components/section/mission/Details.vue'
import BoxPlace from '@/components/section/mission/BoxPlace.vue'
import BoxResponsable from '@/components/section/BoxResponsable.vue'
import BoxInformations from '@/components/section/mission/BoxInformations.vue'
import BoxEnChiffre from '@/components/section/mission/BoxEnChiffre.vue'
import BoxDates from '@/components/section/mission/BoxDates.vue'
import BoxOrganisation from '@/components/section/mission/BoxOrganisation.vue'
import BoxAideModeration from '@/components/section/mission/BoxAideModeration.vue'
import History from '@/components/section/History.vue'
import HistoryStateChanges from '@/components/section/HistoryStateChanges.vue'
import MixinMission from '@/mixins/mission'
import OnlineIndicator from '~/components/custom/OnlineIndicator'
import SelectMissionState from '@/components/custom/SelectMissionState'
import BoxReferents from '@/components/section/BoxReferents'
import BoxNotes from '@/components/custom/BoxNotes'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Link from '@/components/dsfr/Link.vue'
import ModalMissionToggleIsActive from '@/components/modal/ModalMissionToggleIsActive.vue'

export default {
  components: {
    PresentielOrDistance,
    Presentation,
    Details,
    BoxPlace,
    BoxResponsable,
    BoxInformations,
    BoxEnChiffre,
    BoxDates,
    BoxOrganisation,
    HistoryStateChanges,
    History,
    OnlineIndicator,
    SelectMissionState,
    BoxReferents,
    BoxNotes,
    Breadcrumb,
    BoxAideModeration,
    Link,
    ModalMissionToggleIsActive
  },
  mixins: [MixinMission],
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

    const { data: mission } = await $axios.get(`/missions/${params.id}`)
    if (!mission) {
      return error({ statusCode: 404 })
    }

    const { data: missionStats } = await $axios.get(`/statistics/missions/${params.id}`)

    if (store.getters.contextRole == 'responsable') {
      if (store.getters.contextableId != mission.structure_id) {
        return error({ statusCode: 403 })
      }
    }

    return {
      mission,
      missionStats
    }
  },
  data () {
    return {
      showModalSwitchIsActive: false
    }
  },
  methods: {
    async handleChangeState (event) {
      this.mission.state = event.key
      await this.$axios.put(`/missions/${this.mission.id}`, this.mission)
    },
    handleChangePlace (mission) {
      this.mission.participations_max = mission.participations_max
      this.mission.places_left = mission.places_left
      this.mission.is_registration_open = mission.is_registration_open
    },
    afterChangeIsActive (mission) {
      this.mission.is_active = mission.is_active
      this.showModalSwitchIsActive = false
    }
  }
}
</script>
