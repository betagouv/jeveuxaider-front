<template>
  <div
    class="p-4 lg:py-4 lg:px-6 flex gap-4 lg:gap-6 justify-between items-center bg-jva-blue-500 text-white"
  >
    <div class="text-base lg:text-xl font-bold truncate">{{ label }}</div>
    <div class="flex flex-shrink-0 gap-4 items-center">
      <DsfrButton
        v-if="canValidate"
        type="tertiary-no-outline"
        size="lg"
        class="hidden lg:flex"
        @click.native.stop="showValidateMissionModal = true"
      >
        Valider
      </DsfrButton>
      <BaseDropdown ref="dropdownActions" class="flex-none">
        <template #button>
          <DsfrButton
            type="transparent"
            icon="RiArrowDownSLine"
            icon-position="right"
            class="hidden lg:flex hover:bg-jva-blue-300"
          >
            Autre
          </DsfrButton>
          <DsfrButton
            type="transparent"
            icon="RiMore2Line"
            icon-only
            class="flex lg:hidden hover:bg-jva-blue-300"
          />
        </template>

        <template #items>
          <div class="w-[300px] py-4">
            <BaseDropdownOptionsItem
              v-if="canValidate"
              @click.native.stop="showValidateMissionModal = true"
            >
              <div class="px-4 text-base font-medium">Valider cette mission</div>
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem
              v-if="canSignal"
              @click.native.stop="showReportMissionModal = true"
            >
              <div class="px-4 text-base font-medium">Signaler cette mission</div>
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem
              @click.native.stop="$router.push(`/admin/missions/${mission.id}/edit`)"
            >
              <div class="px-4 text-base font-medium">Modifier cette mission</div>
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem v-if="canArchive" @click.native="handleArchive">
              <div class="px-4 text-base font-medium">Archiver la conversation</div>
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem v-if="canUnarchive" @click.native.stop="handleUnarchive">
              <div class="px-4 text-base font-medium">Désarchiver la conversation</div>
            </BaseDropdownOptionsItem>
          </div>
        </template>
      </BaseDropdown>
    </div>
    <ModalMissionValidate
      :mission="mission"
      :is-open="showValidateMissionModal"
      @cancel="showValidateMissionModal = false"
      @confirm="handleValidateMission()"
    />
    <ModalMissionReport
      :mission="mission"
      :is-open="showReportMissionModal"
      @cancel="showReportMissionModal = false"
      @confirm="handleReportMission()"
    />
  </div>
</template>

<script>
import MixinConversationMission from '@/mixins/conversation/mission'

export default defineNuxtComponent({
  mixins: [MixinConversationMission],
  data() {
    return {
      showValidateMissionModal: false,
      showReportMissionModal: false,
    }
  },
  computed: {
    label() {
      switch (this.mission.state) {
        case 'Brouillon':
          return 'La mission est en brouillon'
        case 'Validée':
          return 'La mission est validée'
        case 'Signalée':
          return 'La mission est signalée'
        case 'En attente de validation':
          return 'La mission est en attente de validation'
        case 'En cours de traitement':
          return 'La mission est en cours de traitement'
        case 'Terminée':
          return 'La mission est terminée'
        default:
          return this.mission.state
      }
    },
    canValidate() {
      return ['En attente de validation', 'En cours de traitement'].includes(this.mission.state)
    },
    canSignal() {
      return !['Signalée'].includes(this.mission.state)
    },
  },
  methods: {
    async handleValidateMission() {
      await apiFetch(`/missions/${this.mission.id}`, {
        method: 'PUT',
        body: {
          ...this.mission,
          state: 'Validée',
        },
      })
        .then(async (res) => {
          await this.$stores.messaging.refreshActiveConversation(this.conversation.id)
          this.showValidateMissionModal = false
        })
        .catch(() => {})
    },
    async handleReportMission() {
      await apiFetch(`/missions/${this.mission.id}`, {
        method: 'PUT',
        body: {
          ...this.mission,
          state: 'Signalée',
        },
      })
        .then(async (res) => {
          await this.$stores.messaging.refreshActiveConversation(this.conversation.id)
          this.showReportMissionModal = false
        })
        .catch(() => {})
    },
  },
})
</script>
