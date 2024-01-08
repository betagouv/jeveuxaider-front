<template>
  <div class="flex flex-col gap-8">
    <DrawerRule :rule-id="drawerRuleId" @close="drawerRuleId = null" @refetch="fetch" />
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <DsfrBreadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Paramètres' },
            { text: 'Règles' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'règle',
        'règles',
        false
      )}`"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <DsfrButton icon="RiAddLine" @click="$router.push(`/admin/settings/rules/add`)">
            Nouvelle règle
          </DsfrButton>
        </div>
      </template>
    </BaseSectionHeading>

    <SearchFilters class="mb-4">
      <BaseInput
        name="search"
        placeholder="Recherche par mots clés..."
        icon="RiSearchLine"
        variant="transparent"
        :modelValue="$route.query['filter[search]']"
        clearable
        @update:modelValue="changeFilter('filter[search]', $event)"
      />
      <template #prefilters>
        <DsfrTag
          :key="`toutes-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="hasActiveFilters()"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="deleteAllFilters"
        >
          Toutes
        </DsfrTag>

        <DsfrTag
          :key="`published-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[is_active]'] && $route.query['filter[is_active]'] == 1"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_active]', 1)"
        >
          Active
        </DsfrTag>

        <DsfrTag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[is_active]'] && $route.query['filter[is_active]'] == 0"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_active]', 0)"
        >
          Inactive
        </DsfrTag>
      </template>
    </SearchFilters>

    <BaseTable v-if="queryResult.total">
      <BaseTableHead>
        <BaseTableHeadCell>Nom</BaseTableHeadCell>
        <BaseTableHeadCell> Déclencheur </BaseTableHeadCell>
        <BaseTableHeadCell> Action </BaseTableHeadCell>
        <BaseTableHeadCell> Statut </BaseTableHeadCell>
      </BaseTableHead>
      <BaseTableBody>
        <BaseTableRow
          v-for="rule in queryResult.data"
          :key="rule.id"
          class="cursor-pointer"
          @click.native="drawerRuleId = rule.id"
        >
          <BaseTableRowCell class="max-w-xl">
            <div class="font-medium text-gray-900 truncate">
              {{ rule.name }}
            </div>
          </BaseTableRowCell>
          <BaseTableRowCell>
            <DsfrBadge size="sm" type="info" no-icon class="truncate">
              {{ $filters.label(rule.event, 'rule_events') }}
            </DsfrBadge>
          </BaseTableRowCell>
          <BaseTableRowCell>
            <DsfrBadge size="sm" class="truncate">
              {{ $filters.label(rule.action_key, 'rule_actions') }} :
              {{ rule.action_value }}
            </DsfrBadge>
          </BaseTableRowCell>
          <BaseTableRowCell>
            <RiCheckboxCircleLine
              v-if="rule.is_active"
              class="w-6 h-6 text-green-600 fill-current flex-none"
            />
            <RiCloseCircleLine v-else class="w-6 h-6 text-gray-500 fill-current flex-none" />
          </BaseTableRowCell>
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>

    <DsfrPagination
      class="mt-6"
      :current-page="queryResult.current_page"
      :total-rows="queryResult.total"
      :per-page="queryResult.per_page"
      @page-change="changePage"
    />
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import DrawerRule from '@/components/drawer/DrawerRule.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'

export default defineNuxtComponent({
  components: {
    DrawerRule,
    SearchFilters,
  },
  mixins: [QueryBuilder],
  setup() {
    definePageMeta({
      layout: 'admin-with-sidebar-menu',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      loading: false,
      endpoint: '/rules',
      drawerRuleId: null,
    }
  },
})
</script>
