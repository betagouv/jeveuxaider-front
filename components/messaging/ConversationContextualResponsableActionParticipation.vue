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
      >
        Valider
      </Button>
      <Button
        v-if="canCancel"
        type="tertiary-no-outline"
        size="lg"
      >
        Annuler
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
            <DropdownOptionsItem v-if="canRefuse" @click.native="handleRefuseParticipation">
              <div class="px-4 text-base font-medium">
                Décliner la candidature
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="canCancel" @click.native="handleCancelParticipation">
              <div class="px-4 text-base font-medium">
                Annuler la candidature
              </div>
            </DropdownOptionsItem>
            <DropdownOptionsItem v-if="canArchive" @click.native="handleArchive">
              <div class="px-4 text-base font-medium">
                Archiver la conversation
              </div>
            </DropdownOptionsItem>
          </div>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    },
    participation () {
      return this.conversation.conversable
    },
    label () {
      if (this.canValidate) {
        return 'Souhaitez-vous valider cette candidature ?'
      }
      switch (this.participation.state) {
        case 'Validée':
          return 'La candidature est validée'
        case 'Refusée':
          return 'La candidature est déclinée'
        case 'Annulée':
          return 'La candidature est annulée'
        default:
          return ''
      }
    },
    canValidate () {
      return ['En attente de validation', 'En cours de traitement'].includes(this.participation.state)
    },
    canRefuse () {
      return !['Refusée'].includes(this.participation.state)
    },
    canCancel () {
      return !['Annulée'].includes(this.participation.state)
    },
    canArchive () {
      // @TODO
      return true
    }
  },
  methods: {
    handleRefuseParticipation () {
      // @TODO
    },
    handleCancelParticipation () {
      // @TODO
    },
    handleArchive () {
      // @TODO
    }
  }
}
</script>

<style>

</style>
