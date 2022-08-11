<template>
  <portal to="body-end">
    <Modal
      v-scroll-lock="isOpen"
      :is-open="isOpen"
      :theme="modalTheme"
      :title="modalTitle"
      :prevent-click-outside="true"
      :hide-footer="state === 'processing'"
      :hide-close="true"
      @close="$emit('close')"
    >
      <p v-if="state === 'initial'" class="text-gray-600">
        {{ participationNames }}
      </p>

      <template v-else-if="state === 'processing'">
        <Gauge :percentage="progress" size="xl" class="rounded-full" color="green" />
        <div class=" text-gray-600 mt-2">
          Progression: {{ progress }}%
        </div>
      </template>

      <template #footer>
        <template v-if="state === 'initial'">
          <Button class="mr-3" variant="white" @click.native="$emit('close')">
            Retour
          </Button>
          <Button @click.native="handleSubmit">
            Confirmer
          </Button>
        </template>

        <Button
          v-else-if="state === 'processed'"
          variant="white"
          @click.native="() => { $emit('processed'); $emit('close') }"
        >
          Fermer
        </Button>
      </template>
    </Modal>
  </portal>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    participations: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      progress: 0,
      interval: null,
      state: 'initial' // initial, processing, processed
    }
  },
  computed: {
    participationIds () {
      return this.participations.map(participation => participation.id)
    },
    participationNames () {
      const names = this.participations.slice(0, 5).map(participation => participation.profile?.full_name).join(', ')
      return this.participations.length > 5 ? `${names}... (+${this.participations.length - 5})` : names
    },
    modalTheme () {
      return this.state == 'initial' ? 'warning' : this.state == 'processed' ? 'success' : null
    },
    modalTitle () {
      switch (this.state) {
        case 'processing':
          return 'En cours de traitement'
        case 'processed':
          return this.$options.filters.pluralize(
            this.participations.length,
            'participation a été validée',
            'participations ont été validées'
          )
        default:
          return `Vous êtes sur le point de valider ${this.$options.filters.pluralize(this.participations.length, 'participation')}`
      }
    }
  },
  watch: {
    async progress (val) {
      if (val === 100) {
        clearInterval(this.interval)
        // Show the completed progressbar for a given time before continuing
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.state = 'processed'
      }
    },
    async isOpen (val) {
      if (!val) {
        // Avoid footer blink
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      // Reset
      this.state = 'initial'
      this.progress = 0
    }
  },
  methods: {
    async handleSubmit () {
      this.state = 'processing'
      const { data: batchId } = await this.$axios.post('bulk-operation/participations/validate', {
        ids: this.participationIds
      })
      this.interval = setInterval(() => this.refreshBatchProgress(batchId), 1500)
    },
    async refreshBatchProgress (batchId) {
      const { data } = await this.$axios.get(`/batch/${batchId}`)
      this.progress = data.progress
    }
  }
}
</script>
