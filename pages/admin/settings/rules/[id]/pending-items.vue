<template>
  <div class="container">
    <DsfrBreadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Paramètres' },
        { text: 'Règles', to: `/admin/settings/rules` },
        { text: rule.name, to: `/admin/settings/rules/${rule.id}/edit` },
        { text: 'À traiter' },
      ]"
    />
    <DrawerMission
      :mission-id="drawerMissionId"
      @close="drawerMissionId = null"
      @updated="fetch()"
      @refetch="fetch()"
    />

    <BatchDialog
      v-if="rule"
      title="Exécuter la règle"
      :text="`Vous êtes sur le point de traiter ${rule.pendingItemsCount} élément(s) pour la règle ${rule.name}. Cela peut prendre plusieurs minutes.`"
      :is-open="showAlertExecute"
      :batch-endpoint="`/rules/${rule.id}/batch`"
      @close="showAlertExecute = false"
      @batch-end="handleBatchEnd"
    />
    <div class="pb-12">
      <BaseSectionHeading
        :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
          queryResult.total,
          'élément à traiter',
          'éléments à traiter',
          false
        )}`"
        :secondary-title-bottom="rule.name"
      >
        <template #action>
          <div class="hidden lg:block space-x-2 flex-shrink-0">
            <DsfrButton
              :to="`/admin/settings/rules/${rule.id}/edit`"
              type="secondary"
              icon="RiPencilLine"
              size="lg"
            >
              Modifier la règle
            </DsfrButton>
            <DsfrButton
              icon="RiPlayCircleLine"
              size="lg"
              :disabled="rule.pendingItemsCount === 0"
              @click.native="() => (showAlertExecute = true)"
            >
              Exécuter
            </DsfrButton>
          </div>
        </template>
      </BaseSectionHeading>

      <div class="mt-12">
        <template v-if="queryResult.total > 0">
          <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardMission
              v-for="mission in queryResult.data"
              :key="mission.id"
              class="cursor-pointer"
              :mission="mission"
              show-state
              :show-tags="['admin'].includes($stores.auth.contextRole)"
              tabindex="0"
              @click.native="drawerMissionId = mission.id"
            />
          </div>
        </template>
        <template v-else>
          <div class="bg-white min-h-[200px] flex items-center justify-center">
            <div class="text-center text-gray-400">Aucun élément à traiter</div>
          </div>
        </template>
      </div>

      <DsfrPagination
        class="mt-12"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </div>
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardMission from '@/components/card/CardMission.vue'
import BatchDialog from '@/components/custom/BatchDialog.vue'
import DrawerMission from '@/components/drawer/DrawerMission.vue'

export default defineNuxtComponent({
  components: {
    DrawerMission,
    CardMission,
    BatchDialog,
  },
  mixins: [QueryBuilder],
  async setup() {
    definePageMeta({
      middleware: ['admin'],
    })

    const route = useRoute()
    const rule = await apiFetch(
      `/rules/${route.params.id}?appends=totalItemsCount,pendingItemsCount`
    )

    if (!rule) {
      return showError({ statusCode: 404 })
    }

    return {
      rule,
    }
  },
  data() {
    return {
      loading: false,
      showAlertExecute: false,
      drawerMissionId: null,
    }
  },
  computed: {
    endpoint() {
      return `/rules/${this.$route.params.id}/pending-items`
    },
  },
  methods: {
    handleBatchEnd() {
      this.fetch()
    },
  },
})
</script>
