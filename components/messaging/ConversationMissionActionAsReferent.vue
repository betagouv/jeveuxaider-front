<template>
  <div class="p-4 lg:p-6 flex gap-4 lg:gap-6 justify-between items-center bg-jva-blue-500 text-white">
    <div class="text-lg lg:text-xl font-bold">
      {{ label }}
    </div>
    <div class="flex flex-shrink-0 gap-4 items-center">
      <Button
        v-if="canValidate"
        type="tertiary-no-outline"
        size="lg"
        class="hidden lg:flex"
        @click.native.stop="showValidateMissionModal = true"
      >
        Valider
      </Button>
      <Dropdown ref="dropdownActions" class="flex-none">
        <template #button>
          <Button
            type="transparent"
            size="lg"
            icon="RiArrowDownSLine"
            icon-position="right"
            class="hidden lg:flex hover:bg-jva-blue-300"
          >
            Autre
          </Button>
          <Button
            type="transparent"
            size="md"
            icon="RiMore2Line"
            icon-only
            class="flex lg:hidden hover:bg-jva-blue-300"
          />
        </template>

        <template #items>
          <div class="w-[300px] py-4">
            <DropdownOptionsItem v-if="canValidate" @click.native.stop="showValidateMissionModal = true">
              <div class="px-4 text-base font-medium">
                Valider cette mission
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="canSignal" @click.native.stop="showReportMissionModal = true">
              <div class="px-4 text-base font-medium">
                Signaler cette mission
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem @click.native.stop="$router.push(`/admin/missions/${mission.id}/edit`)">
              <div class="px-4 text-base font-medium">
                Modifier cette mission
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="canArchive" @click.native="handleArchive">
              <div class="px-4 text-base font-medium">
                Archiver la conversation
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="canUnarchive" @click.native.stop="handleUnarchive">
              <div class="px-4 text-base font-medium">
                Désarchiver la conversation
              </div>
            </DropdownOptionsItem>
          </div>
        </template>
      </Dropdown>
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
import Button from '@/components/dsfr/Button.vue'
import MixinConversationMission from '@/mixins/conversation/mission'
import ModalMissionValidate from '@/components/modal/ModalMissionValidate.vue'
import ModalMissionReport from '@/components/modal/ModalMissionReport.vue'

export default {
  components: {
    Button,
    ModalMissionValidate,
    ModalMissionReport
  },
  mixins: [MixinConversationMission],
  data () {
    return {
      showValidateMissionModal: false,
      showReportMissionModal: false
    }
  },
  computed: {
    label () {
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
        default:
          return this.mission.state
      }
    },
    canValidate () {
      return ['En attente de validation', 'En cours de traitement'].includes(this.mission.state)
    },
    canSignal () {
      return !['Signalée'].includes(this.mission.state)
    }
  },
  methods: {
    async handleValidateMission () {
      await this.$axios.put(`/missions/${this.mission.id}`, {
        ...this.mission,
        state: 'Validée'
      })
        .then(async (res) => {
          await this.$store.dispatch('messaging/refreshActiveConversation', this.conversation.id)
          this.showValidateMissionModal = false
        })
        .catch(() => {})
    },
    async handleReportMission () {
      await this.$axios.put(`/missions/${this.mission.id}`, {
        ...this.mission,
        state: 'Signalée'
      })
        .then(async (res) => {
          await this.$store.dispatch('messaging/refreshActiveConversation', this.conversation.id)
          this.showReportMissionModal = false
        })
        .catch(() => {})
    }
  }
}
</script>

<style>

</style>
