<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Missions', to: '/admin/missions' },
        { text: mission.name },
      ]"
    />
    <ModalMissionToggleIsActive
      v-if="['admin'].includes($stores.auth.contextRole)"
      :mission="mission"
      :is-open="showModalSwitchIsActive"
      @cancel="showModalSwitchIsActive = false"
      @confirm="afterChangeIsActive"
    />
    <div class="flex justify-between pb-8 mb-8 border-b">
      <div>
        <BaseHeading :level="1" class="mb-4">
          Mission
          <span class="font-normal text-gray-500 text-2xl">#{{ mission.id }}</span>
        </BaseHeading>
        <div class="flex items-center space-x-4">
          <OnlineIndicator
            :published="mission.is_active"
            :link="`/missions-benevolat/${mission.id}/${mission.slug}`"
          />
          <BaseBadge :color="mission.state">
            {{ mission.state }}
          </BaseBadge>
          <BaseBadge
            v-if="mission.state == 'Validée'"
            :color="mission.is_registration_open ? 'gray-light' : 'orange'"
          >
            {{ mission.is_registration_open ? 'Inscriptions ouvertes' : 'Inscriptions fermées' }}
          </BaseBadge>
        </div>
      </div>
      <div class="flex space-x-3">
        <nuxt-link no-prefetch :to="`/admin/missions/${mission.id}/edit`">
          <DsfrButton type="primary" class="text-white">
            <RiPencilLine class="h-5 w-5 fill-current" /> Modifier
          </DsfrButton>
        </nuxt-link>
        <SelectMissionState
          v-if="canEditStatut"
          :mission="mission"
          :mission-stats="missionStats"
          @selected="handleChangeState($event)"
        />
        <BaseDropdown>
          <template #button>
            <DsfrButton type="tertiary" class="!text-gray-800">
              <RiMoreFill class="h-5 w-5 fill-current" />
            </DsfrButton>
          </template>
          <template #items>
            <BaseDropdownOptionsItem
              v-if="['admin'].includes($stores.auth.contextRole) && mission.state == 'Validée'"
              @click.native="showModalSwitchIsActive = true"
            >
              <div class="flex items-center">
                <div
                  :class="[
                    'h-3 w-3 rounded-full mr-3',
                    mission.is_active ? 'bg-jva-red-500' : 'bg-jva-green-500',
                  ]"
                />
                {{ mission.is_active ? 'Dépublier' : 'Publier' }}
              </div>
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem
              v-if="mission.places_left > 0 && mission.is_active && mission.state == 'Validée'"
              @click.native="handleChangeIsRegistrationOpen(!mission.is_registration_open)"
            >
              <div
                v-if="mission.is_registration_open"
                class="flex items-center"
                v-tooltip="{
                  content: 'La mission reste en ligne. Les bénévoles ne peuvent plus postuler.',
                }"
              >
                <RiUserUnfollow class="h-4 w-4 mr-2 fill-current text-gray-600" />Fermer les
                inscriptions
              </div>
              <div
                v-else
                class="flex items-center"
                v-tooltip="{
                  content: 'La mission reste en ligne. Les bénévoles ne peuvent plus postuler.',
                }"
              >
                <RiUserFollow class="h-4 w-4 mr-2 fill-current text-gray-600" />Ouvrir les
                inscriptions
              </div>
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem v-if="mission.places_left > 0 && mission.is_active">
              <NuxtLink
                :to="`/admin/missions/${mission.id}/trouver-des-benevoles`"
                class="flex items-center"
              >
                <RiUserSearch class="h-4 w-4 mr-2 fill-current text-gray-600" /> Trouver des
                bénévoles
              </NuxtLink>
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem>
              <div class="flex items-center">
                <RiFileCopyLine class="h-4 w-4 mr-2 fill-current text-gray-600" /> Dupliquer
              </div>
            </BaseDropdownOptionsItem>
          </template>
        </BaseDropdown>
      </div>
    </div>

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
          v-if="!mission.is_active && mission.state == 'Validée'"
          variant="flat"
          :padding="false"
        >
          <div class="px-4 py-4 xl:py-6 xl:px-6">
            <div class="formatted-text">
              <p>
                <span aria-hidden="true" class="font-emoji text-2xl mr-2">⚠️</span>
                La mission <strong>a été désactivée</strong> par un membre du support car vous avez
                <strong>trop de participations non modérées</strong> (validées ou refusées). Elle
                n’est plus visible des bénévoles.
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
              @click.native="showModalSwitchIsActive = true"
            >
              {{ mission.is_active ? 'Dépublier la mission' : 'Publier la mission' }}
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

            <BoxResponsable
              v-if="mission.responsable"
              :responsable="mission.responsable"
              :conversable-id="mission.id"
              conversable-type="App\Models\Mission"
              :conversable="mission"
            />
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
import SelectMissionState from '@/components/custom/SelectMissionState.vue'
import BoxReferents from '@/components/section/BoxReferents.vue'
import BoxNotes from '@/components/custom/BoxNotes.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Link from '@/components/dsfr/Link.vue'
import ModalMissionToggleIsActive from '@/components/modal/ModalMissionToggleIsActive.vue'

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
    SelectMissionState,
    BoxReferents,
    BoxNotes,
    Breadcrumb,
    BoxAideModeration,
    Link,
    ModalMissionToggleIsActive,
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
      showModalSwitchIsActive: false,
    }
  },
  methods: {
    async handleChangeState(event) {
      this.mission.state = event.key
      await apiFetch(`/missions/${this.mission.id}`, {
        method: 'PUT',
        body: this.mission,
      })
    },
    handleChangePlace(mission) {
      this.mission.participations_max = mission.participations_max
      this.mission.places_left = mission.places_left
      this.mission.is_registration_open = mission.is_registration_open
    },
    afterChangeIsActive() {
      this.refreshMission()
      this.showModalSwitchIsActive = false
    },
  },
})
</script>
