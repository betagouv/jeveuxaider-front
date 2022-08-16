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
      <slot v-if="state === 'initial'" name="initialState" :handleSubmit="handleSubmit" :endpoint="endpoint" />

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
          <slot name="submit">
            <Button @click.native="handleSubmit(endpoint)">
              Confirmer
            </Button>
          </slot>
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
    endpoint: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    models: {
      type: Array,
      required: true
    },
    modalTitle: {
      type: String,
      default: 'Opérations de masse'
    },
    isBulkAll: {
      type: Boolean,
      default: false
    },
    queryResult: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      progress: 0,
      interval: null,
      state: 'initial', // initial, processing, processed
      form: null
    }
  },
  computed: {
    modalTheme () {
      return this.state == 'initial' ? 'warning' : this.state == 'processed' ? 'success' : null
    },
    modelIds () {
      return this.models.map(model => model.id)
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
    },
    state: {
      handler (val) {
        this.$emit('state-changed', val)
      },
      immediate: true
    }
  },
  methods: {
    async handleSubmit (endpoint, payload = {}) {
      this.state = 'processing'
      const { data: batchId } = await this.$axios.post(endpoint, { ...payload, ids: this.modelIds, isBulkAll: this.isBulkAll, query: this.$route.query })
      this.interval = setInterval(() => this.refreshBatchProgress(batchId), 1500)
    },
    async refreshBatchProgress (batchId) {
      const { data } = await this.$axios.get(`/batch/${batchId}`)
      this.progress = data.progress
    }
  }
}
</script>
