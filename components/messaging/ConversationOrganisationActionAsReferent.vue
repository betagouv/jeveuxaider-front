<template>
  <div
    class="p-4 lg:py-4 lg:px-6 flex gap-4 lg:gap-6 justify-between items-center bg-jva-blue-500 text-white"
  >
    <div class="text-base lg:text-xl font-bold truncate">
      {{ label }}
    </div>
    <div class="flex flex-shrink-0 gap-4 items-center">
      <DsfrButton
        v-if="canValidate"
        type="tertiary-no-outline"
        class="hidden lg:flex"
        @click.native.stop="showValidateOrganisationModal = true"
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
              @click.native.stop="showValidateOrganisationModal = true"
            >
              <div class="px-4 text-base font-medium">Valider cette organisation</div>
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem
              v-if="canSignal"
              @click.native.stop="showReportOrganisationModal = true"
            >
              <div class="px-4 text-base font-medium">Signaler cette organisation</div>
            </BaseDropdownOptionsItem>
            <BaseDropdownOptionsItem
              @click.native.stop="$router.push(`/admin/organisations/${organisation.id}/edit`)"
            >
              <div class="px-4 text-base font-medium">Modifier cette organisation</div>
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
import MixinConversationOrganisation from '@/mixins/conversation/organisation'

export default defineNuxtComponent({
  mixins: [MixinConversationOrganisation],
  data() {
    return {
      showValidateOrganisationModal: false,
      showReportOrganisationModal: false,
    }
  },
  computed: {
    label() {
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
    canValidate() {
      return ['En attente de validation', 'En cours de traitement'].includes(
        this.organisation.state
      )
    },
    canSignal() {
      return !['Signalée'].includes(this.organisation.state)
    },
  },
  methods: {
    async handleValidateOrganisation() {
      await apiFetch(`/structures/${this.organisation.id}`, {
        method: 'PUT',
        body: {
          ...this.organisation,
          state: 'Validée',
        },
      })
        .then(async (res) => {
          await this.$stores.messaging.refreshActiveConversation(this.conversation.id)
          this.showValidateOrganisationModal = false
        })
        .catch(() => {})
    },
    async handleReportOrganisation() {
      await apiFetch(`/structures/${this.organisation.id}`, {
        method: 'PUT',
        body: {
          ...this.organisation,
          state: 'Signalée',
        },
      })
        .then(async (res) => {
          await this.$stores.messaging.refreshActiveConversation(this.conversation.id)
          this.showReportOrganisationModal = false
        })
        .catch(() => {})
    },
  },
})
</script>
