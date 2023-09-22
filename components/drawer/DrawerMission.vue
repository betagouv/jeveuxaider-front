<template>
  <BaseDrawer :is-open="Boolean(missionId)" @close="$emit('close')">
    <BaseAlertDialog
      v-if="mission"
      theme="danger"
      title="Supprimer la mission"
      :text="`Vous êtes sur le point de supprimer la mission ${mission.name}.`"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    />
    <template #title>
      <BaseHeading v-if="mission" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/missions/${missionId}`" class="hover:underline">
          {{ mission.name }}
        </nuxt-link>
      </BaseHeading>
    </template>
    <div v-if="loading">
      <LoadingIndicator class="mt-8" />
    </div>
    <div v-else>
      <OnlineIndicator
        :published="hasPageOnline"
        :link="`/missions-benevolat/${mission.id}/${mission.slug}`"
        class="mt-2"
      />
      <div class="flex flex-wrap gap-1 mt-4">
        <nuxt-link :to="`/admin/missions/${mission.id}`">
          <DsfrButton type="tertiary" icon="RiEyeLine" size="sm" tabindex="-1" icon-class="!mr-1">
            Détails
          </DsfrButton>
        </nuxt-link>

        <nuxt-link :to="`/admin/missions/${mission.id}/edit`">
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

        <ButtonMissionDuplicate
          v-if="$stores.auth.contextRole === 'responsable'"
          :mission-id="mission.id"
          :mission="mission"
          @duplicated="handleDuplicated($event)"
        />

        <DsfrButton
          v-if="['admin', 'responsable'].includes($stores.auth.contextRole)"
          type="tertiary"
          icon="RiDeleteBinLine"
          :icon-only="true"
          size="sm"
          @click="() => (showAlert = true)"
        />
      </div>
      <div class="border-t -mx-6 my-6" />
      <template v-if="['admin'].includes($stores.auth.contextRole) && mission.state == 'Validée'">
        <div class="text-sm uppercase font-semibold text-gray-600">État de la mission</div>
        <div class="mt-2">
          <p>
            La mission est actuellement
            <strong>{{ mission.is_active ? 'activée' : 'désactivée' }}</strong
            >.
          </p>
          <BaseLink class="!inline-flex" @click.native="showModalSwitchIsActive = true">
            {{ mission.is_active ? 'Désactiver la mission' : 'Activer la mission' }}
          </BaseLink>
          <ModalMissionToggleIsActive
            :mission="mission"
            :is-open="showModalSwitchIsActive"
            @cancel="showModalSwitchIsActive = false"
            @confirm="afterChangeIsActive()"
          />
        </div>

        <div class="border-t -mx-6 my-6" />
      </template>
      <div v-else-if="!mission.is_active" class="formatted-text">
        <p>
          <span aria-hidden="true" class="font-emoji text-2xl mr-2">⚠️</span> La mission
          <strong>a été désactivée</strong> par un membre du support car vous avez
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
        :responsable="mission.responsable"
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
import ButtonMissionDuplicate from '@/components/custom/ButtonMissionDuplicate.vue'
import BoxReferents from '@/components/section/BoxReferents.vue'
import HistoryStateChanges from '@/components/section/HistoryStateChanges.vue'
import LoadingIndicator from '@/components/custom/LoadingIndicator.vue'
import ModalMissionToggleIsActive from '@/components/modal/ModalMissionToggleIsActive.vue'

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
    ButtonMissionDuplicate,
    BoxReferents,
    HistoryStateChanges,
    ModalMissionToggleIsActive,
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
      showAlert: false,
      mission: null,
      missionStats: null,
      loading: false,
      showModalSwitchIsActive: false,
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
    async handleChangeState(option) {
      this.mission.state = option.key
      await apiFetch(`/missions/${this.missionId}`, {
        method: 'PUT',
        body: this.mission,
      }).catch(() => {})
      this.fetch()
      this.$emit('updated')
    },
    async handleConfirmDelete() {
      await apiFetch(`/missions/${this.missionId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          this.showAlert = false
          this.$emit('close')
          this.$emit('updated')
        })
        .catch(() => {})
    },
    afterChangeIsActive() {
      this.fetch()
      this.$emit('updated')
      this.showModalSwitchIsActive = false
    },
  },
})
</script>
