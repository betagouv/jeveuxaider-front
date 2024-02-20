<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :key="`modal_alert_dialog_${uuid}`"
        :title="title"
        :is-open="isOpen"
        :theme="theme"
        :prevent-click-outside="true"
        @close="$emit('close')"
      >
        <div class="text-gray-700 space-y-4">
          <div v-html="text" />
          <div>
            <BaseGauge :percentage="progress" size="xl" class="rounded-full" color="green" />
            <div class="text-gray-500 text-xs">
              <template v-if="state == 'initial'"> Progression : 0% </template>
              <template v-if="batch">
                <template v-if="state == 'processing'">
                  Progression : {{ processedItemsCount }} traités sur
                  {{ batch.totalJobs }}
                </template>
                <template v-if="state == 'cancelled'">
                  Annulé : {{ processedItemsCount }} traités sur
                  {{ batch.totalJobs }}
                </template>
                <template v-if="state == 'processed'">
                  Terminé : {{ processedItemsCount }} traités sur
                  {{ batch.totalJobs }}
                </template>
              </template>
            </div>
          </div>
          <slot />
        </div>
        <template #footer>
          <template v-if="state === 'initial'">
            <DsfrButton @click="handleExecute">
              {{ confirmLabel }}
            </DsfrButton>
          </template>
          <template v-if="state === 'processing'">
            <DsfrButton type="secondary" @click="cancelBatch">
              {{ cancelLabel }}
            </DsfrButton>
          </template>
          <template v-if="['processed', 'cancelled'].includes(state)">
            <DsfrButton type="secondary" @click="handleBatchEnd">
              {{ closeLabel }}
            </DsfrButton>
          </template>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default defineNuxtComponent({
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'warning',
    },
    confirmLabel: {
      type: String,
      default: 'Exécuter',
    },
    closeLabel: {
      type: String,
      default: 'Fermer',
    },
    cancelLabel: {
      type: String,
      default: "Arrêter l'éxecution",
    },
    batchEndpoint: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      batchId: null,
      batch: null,
      progress: 0,
      state: 'initial', // initial, processing, processed, cancelled
      uuid: uuidv4(),
    }
  },
  computed: {
    processedItemsCount() {
      return this.batch
        ? this.batch.totalJobs - (this.batch.pendingJobs + this.batch.failedJobs)
        : 0
    },
    isBatchOver() {
      if (!this.batch) {
        return false
      }
      return this.batch.pendingJobs === 0
    },
  },
  methods: {
    async handleExecute() {
      const { data: batchId } = await apiFetch(this.batchEndpoint, {
        method: 'POST',
      })
      this.batchId = batchId
      this.state = 'processing'
      setInterval(() => this.refreshBatchProgress(), 1500)
    },
    async cancelBatch() {
      await apiFetch(`/batch/${this.batchId}/cancel`, {
        method: 'POST',
      })
      this.state = 'cancelled'
    },
    async refreshBatchProgress() {
      if (this.state === 'processing') {
        const batch = await apiFetch(`/batch/${this.batchId}`)
        this.batch = batch
        this.progress = batch.progress
        if (this.isBatchOver) {
          this.progress = 100
          this.state = 'processed'
        }
      }
    },
    handleBatchEnd() {
      this.$emit('close')
      this.$emit('batch-end')
    },
  },
})
</script>
