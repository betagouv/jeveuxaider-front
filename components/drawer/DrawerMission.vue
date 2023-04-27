<template>
  <Drawer :is-open="Boolean(missionId)" @close="$emit('close')">
    <AlertDialog
      v-if="mission"
      theme="danger"
      title="Supprimer la mission"
      :text="`Vous êtes sur le point de supprimer la mission ${mission.name}.`"
      :is-open="showAlert"
      @confirm="handleConfirmDelete()"
      @cancel="showAlert = false"
    />
    <template #title>
      <Heading v-if="mission" :level="3" class="text-jva-blue-500">
        <nuxt-link :to="`/admin/missions/${missionId}`" class="hover:underline">
          {{ mission.name }}
        </nuxt-link>
      </Heading>
    </template>
    <div v-if="loading">
      <LoadingIndicator class="mt-8" />
    </div>
    <div v-else>
      <OnlineIndicator :published="hasPageOnline" :link="`/missions-benevolat/${mission.id}/${mission.slug}`" class="mt-2" />
      <div class="flex flex-wrap gap-1 mt-4">
        <nuxt-link :to="`/admin/missions/${mission.id}`">
          <Button
            type="tertiary"
            icon="RiEyeLine"
            size="sm"
            tabindex="-1"
          >
            Détails
          </Button>
        </nuxt-link>

        <nuxt-link :to="`/admin/missions/${mission.id}/edit`">
          <Button
            type="tertiary"
            icon="RiPencilLine"
            size="sm"
            tabindex="-1"
          >
            Modifier
          </Button>
        </nuxt-link>

        <ButtonMissionDuplicate
          v-if="$store.getters.contextRole === 'responsable'"
          :mission-id="mission.id"
          :mission="mission"
          @duplicated="handleDuplicated($event)"
        />

        <Button
          v-if="['admin','responsable'].includes($store.getters.contextRole)"
          type="tertiary"
          icon="RiDeleteBinLine"
          :icon-only="true"
          size="sm"
          @click="() => showAlert = true"
        />
      </div>
      <div class="border-t -mx-6 my-6" />
      <template v-if="['admin'].includes($store.getters.contextRole) && mission.state == 'Validée'">
        <div class="text-sm uppercase font-semibold text-gray-600">
          État de la mission
        </div>
        <div class="mt-2">
          <p>La mission est actuellement <strong>{{ mission.is_active ? 'activée' : 'désactivée' }}</strong>.</p>
          <Link
            class="!inline-flex"
            @click.native="handleChangeIsActive(!mission.is_active)"
          >
            {{ mission.is_active ? 'Désactiver la mission' : 'Activer la mission' }}
          </Link>
        </div>

        <div class="border-t -mx-6 my-6" />
      </template>
      <div class="text-sm uppercase font-semibold text-gray-600">
        Statut de la mission
      </div>
      <SelectMissionState
        v-if="canEditStatut"
        :value="mission.state"
        :mission-stats="missionStats"
        class="mt-4"
        @selected="handleChangeState($event)"
      />
      <div v-else class="mt-4 font-medium text-gray-800">
        {{ mission.state }}
      </div>
      <div class="border-t -mx-6 my-6" />
      <BoxDates class="mb-8" :mission="mission" />
      <BoxPlace class="mb-8" :mission="mission" @updated="$fetch" />
      <BoxInformations class="mb-8" :mission="mission" />
      <HistoryStateChanges v-if="['admin','referent'].includes($store.getters.contextRole)" :model-id="mission.id" model-type="mission" class="mb-8" />
      <BoxReferents v-if="['admin'].includes($store.getters.contextRole)" :key="mission.department" :department="mission.department" class="mb-8" />
      <BoxResponsable
        class="mb-8"
        :responsable="mission.responsable"
        :conversable-id="mission.id"
        conversable-type="App\Models\Mission"
      />
      <BoxOrganisation class="mb-8" :organisation="mission.structure" />

      <div class="flex justify-center mb-10">
        <Link :to="`/admin/missions/${mission.id}`" class="uppercase font-semibold text-sm hover:underline">
          Détails de la mission
        </Link>
      </div>
    </div>
  </Drawer>
</template>

<script>
import SelectMissionState from '@/components/custom/SelectMissionState'
import BoxDates from '@/components/section/mission/BoxDates'
import BoxPlace from '@/components/section/mission/BoxPlace'
import BoxResponsable from '@/components/section/BoxResponsable'
import BoxOrganisation from '@/components/section/mission/BoxOrganisation'
import BoxInformations from '@/components/section/mission/BoxInformations'
import MixinMission from '@/mixins/mission'
import OnlineIndicator from '@/components/custom/OnlineIndicator'
import ButtonMissionDuplicate from '@/components/custom/ButtonMissionDuplicate'
import BoxReferents from '@/components/section/BoxReferents'
import Button from '@/components/dsfr/Button.vue'
import HistoryStateChanges from '@/components/section/HistoryStateChanges.vue'
import LoadingIndicator from '@/components/custom/LoadingIndicator'

export default {
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
    Button,
    HistoryStateChanges
  },
  mixins: [MixinMission],
  props: {
    missionId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      showAlert: false,
      mission: null,
      missionStats: null,
      loading: false
    }
  },
  async fetch () {
    this.loading = true
    if (!this.missionId) {
      return
    }
    const { data } = await this.$axios.get(`/missions/${this.missionId}`)
    this.mission = data
    this.loading = false
    this.$axios.get(`/statistics/missions/${this.missionId}`).then(({ data }) => {
      this.missionStats = data
    })
  },
  watch: {
    missionId: '$fetch'
  },
  methods: {
    handleDuplicated (mission) {
      this.$emit('close')
      this.$emit('updated')
    },
    async handleChangeState (option) {
      this.mission.state = option.key
      await this.$axios.put(`/missions/${this.missionId}`, this.mission).catch(() => {})
      this.$fetch()
      this.$emit('updated')
    },
    async handleConfirmDelete () {
      await this.$axios.delete(`/missions/${this.missionId}`).then((res) => {
        this.showAlert = false
        this.$emit('close')
        this.$emit('updated')
      }).catch(() => {})
    },
    async handleChangeIsActive (value) {
      await this.$axios.put(`/missions/${this.mission.id}`, { ...this.mission, is_active: value }).catch(() => {})
      this.$toast.success(value ? 'La mission est désormais active' : 'La mission a été désactivée')
      this.$fetch()
      this.$emit('updated')
    }
  }
}
</script>
