<template>
  <portal to="body-end">
    <Modal
      :key="`modal_alert_dialog_${uuid}`"
      v-scroll-lock="isOpen"
      :title="title"
      :is-open="isOpen"
      :theme="theme"
      @close="$emit('cancel')"
    >
      <div class="text-gray-700 space-y-4">
        <div v-html="text" />
        <div>
          <Gauge :percentage="progress" size="xl" class="rounded-full" color="green" />
          <div class="text-gray-500 text-xs">
            <template v-if="state == 'initial'">
              Progression : 0%
            </template>
            <template v-if="batch">
              <template v-if="state == 'processing'">
                Progression : {{ processedItemsCount }} traités sur {{ batch.totalJobs }}
              </template>
              <template v-if="state == 'cancelled'">
                Annulé : {{ processedItemsCount }} traités sur {{ batch.totalJobs }}
              </template>
              <template v-if="state == 'processed'">
                Terminé : {{ processedItemsCount }} traités sur {{ batch.totalJobs }}
              </template>
            </template>
          </div>
        </div>
        <slot />
      </div>
      <template #footer>
        <template v-if="state === 'initial'">
          <Button variant="primary" @click.native="handleExecute">
            {{ confirmLabel }}
          </Button>
        </template>
        <template v-if="state === 'processing'">
          <Button variant="white" @click.native="cancelBatch">
            {{ cancelLabel }}
          </Button>
        </template>
        <template v-if="['processed','cancelled'].includes(state)">
          <Button variant="white" @click.native="$emit('close')">
            {{ closeLabel }}
          </Button>
        </template>
      </template>
    </Modal>
  </portal>
</template>

<script>
import uuid from '@/mixins/uuid'

export default {
  components: {
  },
  mixins: [uuid],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'warning'
    },
    confirmLabel: {
      type: String,
      default: 'Exécuter'
    },
    closeLabel: {
      type: String,
      default: 'Fermer'
    },
    cancelLabel: {
      type: String,
      default: 'Arrêter l\'éxecution'
    },
    batchEndpoint: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      batchId: null,
      batch: null,
      progress: 0,
      state: 'initial' // initial, processing, processed, cancelled
    }
  },
  computed: {
    processedItemsCount () {
      return this.batch ? this.batch.totalJobs - (this.batch.pendingJobs + this.batch.failedJobs) : 0
    }
  },
  methods: {
    async handleExecute () {
      const { data: batchId } = await this.$axios.post(this.batchEndpoint)
      this.batchId = batchId
      this.state = 'processing'
      setInterval(() => this.refreshBatchProgress(), 1500)
    },
    async cancelBatch () {
      await this.$axios.post(`/batch/${this.batchId}/cancel`)
      this.state = 'cancelled'
    },
    async refreshBatchProgress () {
      if (this.state === 'processing') {
        const { data: batch } = await this.$axios.get(`/batch/${this.batchId}`)
        this.batch = batch
        this.progress = batch.progress
      }
    }
  }
}
</script>

<style>

</style>
