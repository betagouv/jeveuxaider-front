<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        v-scroll-lock="isOpen"
        :is-open="isOpen"
        :theme="modalTheme"
        :title="modalTitle"
        :prevent-click-outside="true"
        :hide-footer="state === 'processing'"
        :hide-close="true"
        @close="$emit('close')"
      >
        <slot
          v-if="state === 'initial'"
          name="initialState"
          :handleSubmit="handleSubmit"
          :endpoint="endpoint"
        />

        <template v-else-if="state === 'processing'">
          <BaseGauge :percentage="progress" size="xl" class="rounded-full" color="green" />
          <div class="text-gray-600 mt-2">Progression: {{ progress }}%</div>
        </template>

        <template #footer>
          <template v-if="state === 'initial'">
            <BaseButton class="mr-3" variant="white" @click.native="$emit('close')">
              Retour
            </BaseButton>
            <slot name="submit">
              <BaseButton @click.native="handleSubmit(endpoint)"> Confirmer </BaseButton>
            </slot>
          </template>

          <BaseButton
            v-else-if="state === 'processed'"
            variant="white"
            @click.native="
              () => {
                $emit('processed')
                $emit('close')
              }
            "
          >
            Fermer
          </BaseButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
export default defineNuxtComponent({
  props: {
    endpoint: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    operations: {
      type: Array,
      required: true,
    },
    modalTitle: {
      type: String,
      default: 'Opérations de masse',
    },
  },
  data() {
    return {
      progress: 0,
      interval: null,
      state: 'initial', // initial, processing, processed
      form: null,
    }
  },
  computed: {
    modalTheme() {
      return this.state == 'initial' ? 'warning' : this.state == 'processed' ? 'success' : null
    },
    modelIds() {
      return this.operations.map((model) => model.id)
    },
  },
  watch: {
    async progress(val) {
      if (val === 100) {
        clearInterval(this.interval)
        // Show the completed progressbar for a given time before continuing
        await new Promise((resolve) => setTimeout(resolve, 1500))
        this.state = 'processed'
      }
    },
    async isOpen(val) {
      if (!val) {
        // Avoid footer blink
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
      // Reset
      this.state = 'initial'
      this.progress = 0
    },
    state: {
      handler(val) {
        this.$emit('state-changed', val)
      },
      immediate: true,
    },
  },
  methods: {
    async handleSubmit(endpoint, payload = {}) {
      this.state = 'processing'
      const { data: batchId } = await apiFetch(endpoint, {
        method: 'POST',
        body: {
          ...payload,
          ids: this.modelIds,
        },
      })
      this.interval = setInterval(() => this.refreshBatchProgress(batchId), 1500)
    },
    async refreshBatchProgress(batchId) {
      const response = await apiFetch(`/batch/${batchId}`)
      this.progress = response.progress
    },
  },
})
</script>
