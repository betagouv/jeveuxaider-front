<template>
  <div class="container">
    <DsfrBreadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Missions', to: '/admin/missions' },
        { text: mission.name },
      ]"
    />
    <ModalMissionToggleIsActive
      v-if="['admin'].includes($stores.auth.contextRole)"
      :mission="mission"
      :is-open="showModalSwitchIsOnline"
      @cancel="showModalSwitchIsOnline = false"
      @confirm="afterChangeIsActive"
    />
  </div>
  <HeaderActions
    :mission="mission"
    :missionStats="missionStats"
    @showModalSwitchIsOnline="showModalSwitchIsOnline = true"
    @updated="refreshMission()"
  />

  <div class="container">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12">
      <div class="lg:col-span-3 space-y-6">
        <Presentation :mission="mission" />
        <PresentielOrDistance :mission="mission" />
        <Details :mission="mission" />
        <BoxNotes
          v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
          notable-type="missions"
          :notable-id="mission.id"
        />
      </div>
      <div class="lg:col-span-2 space-y-8">
        <BaseBox
          v-if="!mission.is_online && mission.state == 'Validée'"
          variant="flat"
          :padding="false"
        >
          <div class="px-4 py-4 xl:py-6 xl:px-6">
            <div class="formatted-text">
              <p>
                <span aria-hidden="true" class="font-emoji text-2xl mr-2">⚠️</span>
                La mission <strong>a été mise hors ligne</strong> par un membre du support car vous
                avez <strong>trop de participations non modérées</strong> (validées ou refusées).
                Elle n’est plus visible des bénévoles.
              </p>
              <p>
                Pour toute information, veuillez contacter le support à l’adresse
                <Link href="\'mailto:support@jeveuxaider.beta.gouv.fr\'">
                  support@jeveuxaider.beta.gouv.fr
                </Link>
              </p>
            </div>

            <Link
              v-if="['admin'].includes($stores.auth.contextRole)"
              class="text-jva-blue-500 mt-2"
              @click.native="showModalSwitchIsOnline = true"
            >
              {{
                mission.is_online ? 'Mettre hors ligne la mission' : 'Mettre en ligne la mission'
              }}
            </Link>
          </div>
        </BaseBox>

        <ClientOnly>
          <BaseTabs
            :tabs="[
              {
                name: 'Informations',
                to: '#infos',
                icon: 'RiInformationFill',
                current: !['#historique'].includes($route.hash),
              },
              {
                name: 'Historique',
                to: '#historique',
                icon: 'RiTimeFill',
                current: $route.hash === '#historique',
              },
            ]"
          />
          <div v-if="!['#historique'].includes($route.hash)" class="space-y-8">
            <BoxAideModeration
              v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
              :mission="mission"
            />
            <BoxDates :mission="mission" />
            <BoxPlace :mission="mission" @updated="handleChangePlace($event)" />
            <BoxEnChiffre :mission="mission" />
            <BoxInformations :mission="mission" />
            <BoxReferents
              v-if="['admin'].includes($stores.auth.contextRole)"
              class="mb-8"
              :department="mission.department"
            />
            <template v-for="responsable in mission.responsables" :key="responsable.id">
              <BoxResponsable
                :responsable="responsable"
                :conversable-id="mission.id"
                conversable-type="App\Models\Mission"
                :conversable="mission"
                @updated="refresh()"
              />
            </template>
            <BoxOrganisation :organisation="mission.structure" />
          </div>
          <template v-if="$route.hash === '#historique'">
            <HistoryStateChanges :model-id="mission.id" model-type="mission" />
            <History :model-id="mission.id" model-type="mission" />
          </template>
        </ClientOnly>
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
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'
import BoxReferents from '@/components/section/BoxReferents.vue'
import BoxNotes from '@/components/custom/BoxNotes.vue'
import ModalMissionToggleIsActive from '@/components/modal/ModalMissionToggleIsActive.vue'
import HeaderActions from '@/components/section/mission/HeaderActions.vue'

export default defineNuxtComponent({
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
    BoxReferents,
    BoxNotes,
    BoxAideModeration,
    ModalMissionToggleIsActive,
    HeaderActions,
  },
  mixins: [MixinMission],
  async setup() {
    definePageMeta({
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })

    const { $stores } = useNuxtApp()
    const route = useRoute()

    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable'].includes(
        $stores.auth.contextRole
      )
    ) {
      return showError({ statusCode: 403 })
    }

    const { data: mission, refresh: refreshMission } = await useApiFetch(
      `/missions/${route.params.id}`
    )

    if (!mission) {
      return showError({ statusCode: 404 })
    }

    const missionStats = await apiFetch(`/statistics/missions/${route.params.id}`)
    if ($stores.auth.contextRole == 'responsable') {
      if ($stores.auth.contextableId != mission.value.structure_id) {
        return showError({ statusCode: 403 })
      }
    }

    return {
      mission: toRef(mission),
      missionStats,
      refreshMission,
    }
  },
  data() {
    return {
      showModalSwitchIsOnline: false,
      showModalDelete: false,
      isPinned: false,
    }
  },
  methods: {
    async handleChangeState(event) {
      this.mission.state = event.key
      const mission = await apiFetch(`/missions/${this.mission.id}`, {
        method: 'PUT',
        body: this.mission,
      })
      this.mission.is_online = mission.is_online
      this.refreshMission()
    },
    handleChangePlace(mission) {
      this.mission.participations_max = mission.participations_max
      this.mission.places_left = mission.places_left
      this.mission.is_registration_open = mission.is_registration_open
    },
    afterChangeIsActive() {
      this.refreshMission()
      this.showModalSwitchIsOnline = false
    },
    // handleDuplicated(mission) {
    //   console.log('new mission', mission)
    // },
  },
})
</script>
