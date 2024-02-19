<template>
  <BaseDrawer :is-open="Boolean(ruleId)" @close="$emit('close')">
    <BaseAlertDialog
      v-if="rule"
      icon="RiErrorWarningLine"
      title="Supprimer la règle"
      :is-open="showAlertDelete"
      @confirm="handleConfirmDelete()"
      @cancel="showAlertDelete = false"
    >
      Vous êtes sur le point de supprimer la règle {{ rule.name }}.
    </BaseAlertDialog>
    <BatchDialog
      v-if="rule"
      title="Exécuter la règle"
      :text="`Vous êtes sur le point de traiter ${rule.pendingItemsCount} élément(s) pour la règle ${rule.name}. Cela peut prendre plusieurs minutes.`"
      :is-open="showAlertExecute"
      :batch-endpoint="`/rules/${ruleId}/batch`"
      @close="showAlertExecute = false"
      @batch-end="handleBatchEnd"
    />
    <template #title>
      <BaseHeading v-if="rule" :level="3" class="text-jva-blue-500">
        {{ rule.name }}
      </BaseHeading>
    </template>
    <template v-if="rule">
      <OnlineIndicator
        :published="rule.is_active"
        class="mt-2"
        published-label="Activée"
        unpublished-label="Désactivée"
      />
      <div class="flex gap-2 mt-4">
        <BaseButton
          variant="white"
          size="sm"
          icon="RiPlayCircleLine"
          :disabled="rule.pendingItemsCount === 0"
          @click.native="() => (showAlertExecute = true)"
        >
          Exécuter
        </BaseButton>
        <nuxt-link no-prefetch :to="`/admin/settings/rules/${rule.id}/edit`" class="inline-flex">
          <BaseButton variant="white" size="sm" icon="RiPencilLine"> Modifier </BaseButton>
        </nuxt-link>
        <BaseButton
          variant="white"
          size="sm"
          icon="RiDeleteBinLine"
          @click.native="() => (showAlertDelete = true)"
        />
      </div>
      <div class="border-t -mx-6 my-6" />
      <div class="mb-8">
        <div class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">Informations</div>
        <BaseBox variant="flat" padding="xs">
          <BaseDescriptionList>
            <BaseDescriptionListItem
              term="Crée le"
              :description="$dayjs(rule.created_at).format('D MMMM YYYY à HH:mm')"
            />
            <BaseDescriptionListItem
              term="Modifié le"
              :description="$dayjs(rule.updated_at).format('D MMMM YYYY à HH:mm')"
            />
            <BaseDescriptionListItem term="Nom" :description="rule.name" />
            <BaseDescriptionListItem
              term="Déclencheur"
              :description="$filters.label(rule.event, 'rule_events')"
            />
            <BaseDescriptionListItem
              term="Dernière éxecution"
              :description="rule.last_triggered_at ? $dayjs(rule.last_triggered_at).fromNow() : '-'"
            />
            <BaseDescriptionListItem
              term="# Exécutions"
              :description="`${rule.triggers_count ?? 0} fois`"
            />
          </BaseDescriptionList>
        </BaseBox>
      </div>
      <div>
        <div class="text-sm flex justify-between px-2 mb-2 items-center">
          <div class="uppercase font-semibold text-gray-600">Éléments à traiter</div>
          <BaseLink :to="`/admin/settings/rules/${rule.id}/pending-items`" icon="RiArrowRightSLine">
            Voir les résultats
          </BaseLink>
        </div>
        <BaseBox variant="flat" padding="xs">
          <BaseDescriptionList v-if="rule.totalItems !== false">
            <BaseDescriptionListItem term="# Résultats" :description="rule.totalItemsCount" />
            <BaseDescriptionListItem term="# À traiter" :description="rule.pendingItemsCount" />
          </BaseDescriptionList>
          <div v-else>Les conditions semblent invalides</div>
        </BaseBox>
      </div>
    </template>
  </BaseDrawer>
</template>

<script>
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'
import BatchDialog from '@/components/custom/BatchDialog.vue'

export default defineNuxtComponent({
  components: {
    OnlineIndicator,
    BatchDialog,
  },
  props: {
    ruleId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      rule: null,
      showAlertDelete: false,
      showAlertExecute: false,
      progress: 0,
      interval: null,
    }
  },
  watch: {
    ruleId: 'fetch',
  },
  methods: {
    async fetch() {
      if (!this.ruleId) {
        return null
      }
      const rule = await apiFetch(`/rules/${this.ruleId}?appends=totalItemsCount,pendingItemsCount`)
      this.rule = rule
      this.$emit('loaded', rule)
    },
    async handleConfirmDelete() {
      await apiFetch(`/rules/${this.ruleId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          this.showAlertDelete = false
          this.$emit('close')
          this.$emit('refetch')
          this.$toast.success('La règle a bien été supprimée !')
        })
        .catch(() => {})
    },
    handleBatchEnd() {
      this.$emit('close')
      this.$emit('refetch')
    },
  },
})
</script>
