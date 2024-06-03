<template>
  <BaseDrawer :is-open="Boolean(missionId)" @close="$emit('close')">
    <template #title>
      <BaseHeading v-if="mission" :level="3" class="text-jva-blue-500">
        <nuxt-link no-prefetch :to="`/admin/missions/${missionId}`" class="hover:underline">
          {{ mission.name ?? 'Titre à définir' }}
        </nuxt-link>
      </BaseHeading>
    </template>
    <div v-if="loading">
      <LoadingIndicator class="py-12" />
    </div>
    <div v-else>
      <template v-if="mission">
        <ModalMissionToggleIsActive
          :mission="mission"
          :is-open="showModalSwitchIsOnline"
          @cancel="showModalSwitchIsOnline = false"
          @confirm="afterChangeIsActive()"
        />
        <DsfrLink
          :to="`/missions-benevolat/${mission.id}/${mission.slug}`"
          :is-external="true"
          class="text-xs font-normal"
        >
          Voir la mission
        </DsfrLink>
        <Badges class="mt-5" :mission="mission" />
        <div class="flex flex-wrap gap-1 mt-6">
          <nuxt-link no-prefetch :to="`/admin/missions/${mission.id}`">
            <DsfrButton type="tertiary" icon="RiEyeLine" size="sm" tabindex="-1" icon-class="!mr-1">
              Détails
            </DsfrButton>
          </nuxt-link>

          <nuxt-link no-prefetch :to="`/admin/missions/${mission.id}/title`">
            <DsfrButton
              type="tertiary"
              icon="RiPencilLine"
              size="sm"
              tabindex="-1"
              icon-class="!mr-1"
            >
              Modifier
            </DsfrButton>
          </nuxt-link>

          <Actions
            :mission="mission"
            @showModalSwitchIsOnline="showModalSwitchIsOnline = true"
            @missionDeleted="handleDeleted()"
            @updated="handleUpdated()"
            buttonSize="sm"
          />
        </div>
        <div class="border-t -mx-6 my-6" />
        <template
          v-if="
            ['admin'].includes($stores.auth.contextRole) &&
            mission.state == 'Validée' &&
            mission.is_online == false
          "
        >
          <div class="text-sm uppercase font-semibold text-gray-600">Visibilité de la mission</div>
          <div class="mt-2">
            <p>La mission est actuellement hors ligne</p>
            <BaseLink class="!inline-flex" @click.native="showModalSwitchIsOnline = true">
              Mettre en ligne la mission
            </BaseLink>
          </div>

          <div class="border-t -mx-6 my-6" />
        </template>
        <div v-else-if="!mission.is_online && mission.state == 'Validée'" class="formatted-text">
          <p>
            <span aria-hidden="true" class="font-emoji text-2xl mr-2">⚠️</span> La mission
            <strong>a été mise hors ligne</strong> par un membre du support car vous avez
            <strong>trop de participations non modérées</strong> (validées ou refusées). Elle n’est
            plus visible des bénévoles.
          </p>
          <p>
            Pour toute information, veuillez contacter le support :
            <DsfrLink href="\'mailto:support@jeveuxaider.beta.gouv.fr\'">
              support@jeveuxaider.beta.gouv.fr
            </DsfrLink>
          </p>
          <div class="border-t -mx-6 my-6" />
        </div>
        <div class="text-sm uppercase font-semibold text-gray-600">Statut de la mission</div>
        <SelectMissionState
          v-if="canEditStatut"
          :mission="mission"
          :mission-stats="missionStats"
          class="mt-4"
          @selected="handleChangeState($event)"
          @updated="$emit('updated')"
        />

        <div v-else class="mt-4 font-medium text-gray-800">
          {{ mission.state }}
        </div>

        <div class="border-t -mx-6 my-6" />
        <BoxDates class="mb-8" :mission="mission" />
        <BoxPlace class="mb-8" :mission="mission" @updated="fetch" />
        <BoxInformations class="mb-8" :mission="mission" />
        <HistoryStateChanges
          v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
          :model-id="mission.id"
          model-type="mission"
          class="mb-8"
        />
        <BoxReferents
          v-if="['admin'].includes($stores.auth.contextRole)"
          :key="mission.department"
          :department="mission.department"
          class="mb-8"
        />
        <BoxResponsable
          class="mb-8"
          v-for="responsable in mission.responsables"
          :responsable="responsable"
          :conversable-id="mission.id"
          :conversable="mission"
          conversable-type="App\Models\Mission"
          @updated="$emit('updated')"
        />
        <BoxOrganisation class="mb-8" :organisation="mission.structure" />

        <div class="flex justify-center mb-10">
          <BaseLink
            :to="`/admin/missions/${mission.id}`"
            class="uppercase font-semibold text-sm hover:underline"
          >
            Détails de la mission
          </BaseLink>
        </div>
      </template>
    </div>
  </BaseDrawer>
</template>

<script>
import SelectMissionState from '@/components/custom/SelectMissionState.vue'
import BoxDates from '@/components/section/mission/BoxDates.vue'
import BoxPlace from '@/components/section/mission/BoxPlace.vue'
import BoxResponsable from '@/components/section/BoxResponsable.vue'
import BoxOrganisation from '@/components/section/mission/BoxOrganisation.vue'
import BoxInformations from '@/components/section/mission/BoxInformations.vue'
import MixinMission from '@/mixins/mission'
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'
import BoxReferents from '@/components/section/BoxReferents.vue'
import HistoryStateChanges from '@/components/section/HistoryStateChanges.vue'
import LoadingIndicator from '@/components/custom/LoadingIndicator.vue'
import ModalMissionToggleIsActive from '@/components/modal/ModalMissionToggleIsActive.vue'
import Badges from '@/components/section/mission/Badges.vue'
import Actions from '@/components/section/mission/Actions.vue'

export default defineNuxtComponent({
  components: {
    LoadingIndicator,
    SelectMissionState,
    BoxDates,
    BoxPlace,
    BoxResponsable,
    BoxOrganisation,
    BoxInformations,
    OnlineIndicator,
    BoxReferents,
    HistoryStateChanges,
    ModalMissionToggleIsActive,
    Badges,
    Actions,
  },
  mixins: [MixinMission],
  props: {
    missionId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      mission: null,
      missionStats: null,
      loading: false,
      showModalSwitchIsOnline: false,
    }
  },
  watch: {
    missionId: 'fetch',
  },
  methods: {
    async fetch() {
      this.loading = true
      if (!this.missionId) {
        return
      }
      const mission = await apiFetch(`/missions/${this.missionId}`)
      this.mission = mission
      this.loading = false
      apiFetch(`/statistics/missions/${this.missionId}`).then((response) => {
        this.missionStats = response
      })
    },
    handleDuplicated(mission) {
      this.$emit('close')
      this.$emit('updated')
    },
    afterChangeIsActive() {
      this.fetch()
      this.$emit('updated')
      this.showModalSwitchIsOnline = false
    },
    handleDeleted() {
      this.$emit('close')
      this.$emit('updated')
    },
    handleUpdated() {
      this.$emit('updated')
    },
  },
})
</script>
