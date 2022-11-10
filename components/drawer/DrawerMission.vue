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
    <div v-if="mission">
      <OnlineIndicator :published="hasPageOnline" :link="`/missions-benevolat/${mission.id}/${mission.slug}`" class="mt-2" />
      <div class="flex flex-wrap gap-1 mt-4">
        <Button
          type="tertiary"
          icon="RiEyeLine"
          size="sm"
          @click="$router.push(`/admin/missions/${mission.id}`)"
        >
          Détails
        </Button>

        <Button
          type="tertiary"
          icon="RiPencilLine"
          size="sm"
          @click="$router.push(`/admin/missions/${mission.id}/edit`)"
        >
          Modifier
        </Button>

        <ButtonMissionDuplicate
          v-if="$store.getters.contextRole === 'responsable'"
          :mission-id="mission.id"
          :mission="mission"
          @duplicated="handleDuplicated($event)"
        >
          Dupliquer
        </ButtonMissionDuplicate>

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
      <div class="text-sm  uppercase font-semibold text-gray-600">
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

export default {
  components: {
    SelectMissionState,
    BoxDates,
    BoxPlace,
    BoxResponsable,
    BoxOrganisation,
    BoxInformations,
    OnlineIndicator,
    ButtonMissionDuplicate,
    BoxReferents,
    Button
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
      missionStats: null
    }
  },
  async fetch () {
    if (!this.missionId) {
      return
    }
    const { data } = await this.$axios.get(`/missions/${this.missionId}`)
    this.mission = data
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
        this.$emit('refetch')
      }).catch(() => {})
    }
  }
}
</script>
