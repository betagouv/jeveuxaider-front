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
        @click.native.stop="showValidateOrganisationModal = true"
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
            <DropdownOptionsItem v-if="canValidate" @click.native.stop="showValidateOrganisationModal = true">
              <div class="px-4 text-base font-medium">
                Valider cette organisation
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="canSignal" @click.native.stop="showReportOrganisationModal = true">
              <div class="px-4 text-base font-medium">
                Signaler cette organisation
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem @click.native.stop="$router.push(`/admin/organisations/${organisation.id}/edit`)">
              <div class="px-4 text-base font-medium">
                Modifier cette organisation
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
    <!-- <AlertDialog
      theme="warning"
      title="Changement de statut"
      text="Vous êtes sur le point de passer la candidature en cours de traitement"
      :is-open="showInProgressParticipationModal"
      @confirm="handleInProgressParticipation()"
      @cancel="showInProgressParticipationModal = false"
    /> -->
    <ModalOrganisationValidate
      :organisation="organisation"
      :is-open="showValidateOrganisationModal"
      @cancel="showValidateOrganisationModal = false"
      @confirm="handleValidateOrganisation()"
    />
    <ModalOrganisationReport
      :organisation="organisation"
      :is-open="showReportOrganisationModal"
      @cancel="showReportOrganisationModal = false"
      @confirm="handleReportOrganisation()"
    />
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import MixinConversationOrganisation from '@/mixins/conversation/organisation'
import ModalOrganisationValidate from '@/components/modal/ModalOrganisationValidate.vue'
import ModalOrganisationReport from '@/components/modal/ModalOrganisationReport.vue'

export default {
  components: {
    Button,
    ModalOrganisationValidate,
    ModalOrganisationReport
  },
  mixins: [MixinConversationOrganisation],
  data () {
    return {
      showValidateOrganisationModal: false,
      showReportOrganisationModal: false
    }
  },
  computed: {
    label () {
      switch (this.organisation.state) {
        case 'Brouillon':
          return 'L’organisation est en brouillon'
        case 'Validée':
          return 'L’organisation est validée'
        case 'Signalée':
          return 'L’organisation est signalée'
        case 'En attente de validation':
          return 'L’organisation est en attente de validation'
        case 'En cours de traitement':
          return 'L’organisation est en cours de traitement'
        default:
          return this.organisation.state
      }
    },
    canValidate () {
      return ['En attente de validation', 'En cours de traitement'].includes(this.organisation.state)
    },
    canSignal () {
      return !['Signalée'].includes(this.organisation.state)
    }
  },
  methods: {
    async handleValidateOrganisation () {
      await this.$axios.put(`/structures/${this.organisation.id}`, {
        ...this.organisation,
        state: 'Validée'
      })
        .then(async (res) => {
          await this.$store.dispatch('messaging2/refreshActiveConversation', this.conversation.id)
          this.showValidateOrganisationModal = false
        })
        .catch(() => {})
    },
    async handleReportOrganisation () {
      await this.$axios.put(`/structures/${this.organisation.id}`, {
        ...this.organisation,
        state: 'Signalée'
      })
        .then(async (res) => {
          await this.$store.dispatch('messaging2/refreshActiveConversation', this.conversation.id)
          this.showReportOrganisationModal = false
        })
        .catch(() => {})
    }
  }
}
</script>

<style>

</style>
