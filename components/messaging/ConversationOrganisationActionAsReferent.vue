<template>
  <div class="p-4 lg:p-6 flex justify-between items-center bg-jva-blue-500 text-white">
    <div class="text-xl font-bold">
      {{ label }}
    </div>
    <div class="flex space-x-4 items-center">
      <Button
        v-if="canValidate"
        type="tertiary-no-outline"
        size="lg"
        @click.native.stop="showValidateParticipationModal = true"
      >
        Valider
      </Button>
      <Dropdown ref="dropdownUser">
        <template #button>
          <Button
            type="transparent"
            size="lg"
            icon="RiArrowDownSLine"
            icon-position="right"
            class="hover:bg-jva-blue-300"
          >
            Autre
          </Button>
        </template>

        <template #items>
          <div class="w-[300px] py-4">
            <DropdownOptionsItem v-if="canValidate" @click.native.stop="">
              <div class="px-4 text-base font-medium">
                Valider cette organisation
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="canSignal" @click.native.stop="">
              <div class="px-4 text-base font-medium">
                Signaler cette organisation
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
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'
import MixinConversationOrganisation from '@/mixins/conversation/organisation'

export default {
  components: {
    Button
  },
  mixins: [MixinConversationOrganisation],
  data () {
    return {
      // showInProgressParticipationModal: false,
      // showCancelParticipationModal: false,
      // showValidateParticipationModal: false,
      // showRefuseParticipationModal: false
    }
  },
  computed: {
    label () {
      switch (this.organisation.state) {
        case 'Validée':
          return 'L’organisation est validée'
        case 'Signalée':
          return 'L’organisation est signalée'
        case 'En attente de validation':
          return 'L’organisation est en attente de validation'
        case 'En cours de traitement':
          return 'L’organisation est en cours de traitement'
        default:
          return ''
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
    // handleInProgressParticipation () {
    //   this.$axios.put(`/participations/${this.participation.id}`, {
    //     ...this.participation,
    //     state: 'En cours de traitement'
    //   })
    //     .catch(() => {})
    //     .then(async (res) => {
    //       await this.$store.dispatch('messaging2/refreshActiveConversation', this.conversation.id)
    //       await this.$store.dispatch('messaging2/fetchNewConversationMessages', this.conversation.id)
    //       this.showInProgressParticipationModal = false
    //     })
    // },
  }
}
</script>

<style>

</style>
