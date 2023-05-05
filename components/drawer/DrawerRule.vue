<template>
  <Drawer :is-open="Boolean(ruleId)" @close="$emit('close')">
    <AlertDialog
      v-if="rule"
      theme="danger"
      title="Supprimer la règle"
      :text="`Vous êtes sur le point de supprimer la règle' ${rule.name}.`"
      :is-open="showAlertDelete"
      @confirm="handleConfirmDelete()"
      @cancel="showAlertDelete = false"
    />
    <BatchDialog
      v-if="rule"
      title="Exécuter la règle"
      :text="`Vous êtes sur le point de traiter ${rule.pendingItemsCount} élément(s) pour la règle ${rule.name}.`"
      :is-open="showAlertExecute"
      :batch-endpoint="`/rules/${ruleId}/batch`"
      @close="showAlertExecute = false"
      @batch-end="handleBatchEnd"
    />
    <template #title>
      <Heading v-if="rule" :level="3" class="text-jva-blue-500">
        {{ rule.name }}
      </Heading>
    </template>
    <template v-if="rule">
      <OnlineIndicator :published="rule.is_active" class="mt-2" published-label="Activée" unpublished-label="Désactivée" />
      <div class="flex gap-2 mt-4">
        <Button
          variant="white"
          size="sm"
          icon="RiPlayCircleLine"
          :disabled="rule.pendingItemsCount === 0"
          @click.native="() => showAlertExecute = true"
        >
          Exécuter
        </Button>
        <nuxt-link :to="`/admin/settings/rules/${rule.id}/edit`" class="inline-flex">
          <Button variant="white" size="sm" icon="PencilIcon">
            Modifier
          </Button>
        </nuxt-link>
        <Button variant="white" size="sm" icon="TrashIcon" @click.native="() => showAlertDelete = true" />
      </div>
      <div class="border-t -mx-6 my-6" />
      <div class="mb-8">
        <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
          Informations
        </div>
        <Box variant="flat" padding="xs">
          <DescriptionList>
            <DescriptionListItem term="Crée le" :description="$dayjs(rule.created_at).format('D MMMM YYYY à HH:mm')" />
            <DescriptionListItem term="Modifié le" :description="$dayjs(rule.updated_at).format('D MMMM YYYY à HH:mm')" />
            <DescriptionListItem term="Nom" :description="rule.name" />
            <DescriptionListItem term="Déclencheur" :description="rule.event | label('rule_events')" />
            <DescriptionListItem term="Dernière éxecution" :description="rule.last_triggered_at ? $dayjs(rule.last_triggered_at).fromNow() : '-'" />
            <DescriptionListItem term="# Exécutions" :description="`${rule.triggers_count ?? 0} fois`" />
          </DescriptionList>
        </Box>
      </div>
      <div class="">
        <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
          Résultats
        </div>
        <Box variant="flat" padding="xs">
          <DescriptionList v-if="rule.totalItems !== false">
            <DescriptionListItem term="# Résultats" :description="rule.totalItemsCount" />
            <DescriptionListItem term="# À traiter" :description="rule.pendingItemsCount" />
          </DescriptionList>
          <div v-else class="">
            Les conditions semblent invalides
          </div>
        </Box>
      </div>
    </template>
  </Drawer>
</template>

<script>
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'
import BatchDialog from '@/components/custom/BatchDialog.vue'

export default {
  components: {
    OnlineIndicator,
    BatchDialog
  },
  props: {
    ruleId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      rule: null,
      showAlertDelete: false,
      showAlertExecute: false,
      progress: 0,
      interval: null
    }
  },
  async fetch () {
    if (!this.ruleId) {
      return null
    }
    const { data: rule } = await this.$axios.get(`/rules/${this.ruleId}?appends=totalItemsCount,pendingItemsCount`)
    this.rule = rule
    this.$emit('loaded', rule)
  },
  watch: {
    ruleId: '$fetch'
  },
  methods: {
    // async handleSubmit (endpoint, payload = {}) {
    //   this.state = 'processing'
    //   const { data: batchId } = await this.$axios.post(endpoint, { ...payload, ids: this.modelIds })
    //   this.interval = setInterval(() => this.refreshBatchProgress(batchId), 1500)
    // },
    // async handleConfirmExecute () {
    //   await this.$axios.post(`/rules/${this.ruleId}/batch`).then(({ data: batchId }) => {
    //     console.log('handleConfirmExecute batchId', batchId)
    //     setInterval(() => this.refreshBatchProgress(batchId), 1500)
    //     // this.showAlertExecute = false
    //     // this.$emit('close')
    //     // this.$emit('refetch')
    //     // this.$toast.success('La règle a bien été exécutée !')
    //   }).catch(() => {})
    // },
    async handleConfirmDelete () {
      await this.$axios.delete(`/rules/${this.ruleId}`).then((res) => {
        this.showAlertDelete = false
        this.$emit('close')
        this.$emit('refetch')
        this.$toast.success('La règle a bien été supprimée !')
      }).catch(() => {})
    },
    handleBatchEnd () {
      this.$emit('close')
      this.$emit('refetch')
    }
  }
}
</script>
