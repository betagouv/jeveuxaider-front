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
        @click.native.stop="showValidateParticipationModal = true"
      >
        Valider
      </Button>
      <Button
        v-if="canRefuse"
        type="tertiary-no-outline"
        size="lg"
        class="hidden lg:flex"
        @click.native.stop="showRefuseParticipationModal = true"
      >
        Refuser
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
            <DropdownOptionsItem v-if="!['En cours de traitement'].includes(participation.state)" @click.native.stop="showInProgressParticipationModal = true">
              <div class="px-4 text-base font-medium">
                Passer en cours de traitement
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="!['Validée'].includes(participation.state)" @click.native.stop="showValidateParticipationModal = true">
              <div class="px-4 text-base font-medium">
                Valider la participation
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="!['Refusée'].includes(participation.state)" @click.native.stop="showRefuseParticipationModal = true">
              <div class="px-4 text-base font-medium">
                Refuser la participation
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="!['Annulée'].includes(participation.state)" @click.native.stop="showCancelParticipationModal = true">
              <div class="px-4 text-base font-medium">
                Annuler la participation
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
    <AlertDialog
      theme="warning"
      title="Changement de statut"
      text="Vous êtes sur le point de passer la candidature en cours de traitement"
      :is-open="showInProgressParticipationModal"
      @confirm="handleInProgressParticipation()"
      @cancel="showInProgressParticipationModal = false"
    />
    <AlertDialog
      theme="warning"
      title="Changement de statut"
      text="Vous êtes sur le point de valider la candidature"
      :is-open="showValidateParticipationModal"
      @confirm="handleValidateParticipation()"
      @cancel="showValidateParticipationModal = false"
    />

    <AlertDialog
      theme="warning"
      title="Changement de statut"
      text="Vous êtes sur le point d'annuler la candidature"
      :is-open="showCancelParticipationModal"
      @confirm="handleCancelParticipation()"
      @cancel="showCancelParticipationModal = false"
    />

    <ModalParticipationDeclineByResponsable
      :participation="participation"
      :is-open="showRefuseParticipationModal"
      @cancel="showRefuseParticipationModal = false"
      @confirm="handleRefuseParticipation"
    />
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import MixinConversationParticipation from '@/mixins/conversation/participation'
import ModalParticipationDeclineByResponsable from '@/components/modal/ModalParticipationDeclineByResponsable.vue'

export default {
  components: {
    Button,
    ModalParticipationDeclineByResponsable
  },
  mixins: [MixinConversationParticipation],
  data () {
    return {
      showInProgressParticipationModal: false,
      showCancelParticipationModal: false,
      showValidateParticipationModal: false,
      showRefuseParticipationModal: false
    }
  },
  computed: {
    label () {
      if (this.canValidate) {
        return 'Souhaitez-vous valider cette participation ?'
      }
      switch (this.participation.state) {
        case 'Validée':
          return 'La participation est validée'
        case 'Refusée':
          return 'La participation est refusée'
        case 'Annulée':
          return 'La participation est annulée'
        default:
          return ''
      }
    },
    canValidate () {
      return ['En attente de validation', 'En cours de traitement'].includes(this.participation.state)
    },
    canRefuse () {
      return !['Refusée', 'Validée', 'Annulée'].includes(this.participation.state)
    },
    canCancel () {
      return !['Annulée'].includes(this.participation.state)
    }
  },
  methods: {
    handleInProgressParticipation () {
      this.$axios.put(`/participations/${this.participation.id}`, {
        ...this.participation,
        state: 'En cours de traitement'
      })
        .catch(() => {})
        .then(async (res) => {
          await this.$store.dispatch('messaging/refreshActiveConversation', this.conversation.id)
          await this.$store.dispatch('messaging/fetchNewConversationMessages', this.conversation.id)
          this.showInProgressParticipationModal = false
        })
    },
    handleRefuseParticipation (payload) {
      this.$axios.put(`/participations/${this.participation.id}/decline`, payload)
        .catch(() => {})
        .then(async (res) => {
          await this.$store.dispatch('messaging/refreshActiveConversation', this.conversation.id)
          await this.$store.dispatch('messaging/fetchNewConversationMessages', this.conversation.id)
          this.showRefuseParticipationModal = false
        })
    },
    handleCancelParticipation () {
      this.$axios.put(`/participations/${this.participation.id}`, {
        ...this.participation,
        state: 'Annulée'
      })
        .catch(() => {})
        .then(async (res) => {
          await this.$store.dispatch('messaging/refreshActiveConversation', this.conversation.id)
          await this.$store.dispatch('messaging/fetchNewConversationMessages', this.conversation.id)
          this.showCancelParticipationModal = false
        })
    },
    handleValidateParticipation () {
      this.$axios.put(`/participations/${this.participation.id}`, {
        ...this.participation,
        state: 'Validée'
      })
        .catch(() => {})
        .then(async (res) => {
          await this.$store.dispatch('messaging/refreshActiveConversation', this.conversation.id)
          await this.$store.dispatch('messaging/fetchNewConversationMessages', this.conversation.id)
          this.showValidateParticipationModal = false
        })
    }
  }
}
</script>

<style>

</style>
