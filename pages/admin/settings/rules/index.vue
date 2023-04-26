<template>
  <div class="flex flex-col gap-8">
    <DrawerRule :rule-id="drawerRuleId" @close="drawerRuleId = null" />
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Paramètres' },
          { text: 'Règles' }
        ]"
      />
    </portal>

    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        'règle',
        'règles',
        false
      )}`"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <Button icon="RiAddLine" @click="$router.push(`/admin/settings/rules/add`)">
            Nouvelle règle
          </Button>
        </div>
      </template>
    </SectionHeading>

    <SearchFilters>
      <Input
        name="search"
        placeholder="Recherche par mots clés..."
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        clearable
        @input="changeFilter('filter[search]', $event)"
      />
      <template #prefilters>
        <Tag
          :key="`toutes-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="hasActiveFilters()"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="deleteAllFilters"
        >
          Toutes
        </Tag>

        <Tag
          :key="`published-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[is_active]'] && $route.query['filter[is_active]'] == 1"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_active]', 1)"
        >
          Active
        </Tag>

        <Tag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[is_active]'] && $route.query['filter[is_active]'] == 0"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_active]', 0)"
        >
          Inactive
        </Tag>
      </template>
    </SearchFilters>

    <Table v-if="queryResult.total">
      <TableBody>
        <TableRow
          v-for="rule in queryResult.data"
          :key="rule.id"
          class="cursor-pointer"
          @click.native="drawerRuleId = rule.id"
        >
          <TableRowCell class="max-w-xl">
            <div class="font-medium text-gray-900 truncate">
              {{ rule.name }}
            </div>
            <div class="text-gray-500">
              {{ rule.type| label('rule_events') }}
            </div>
          </TableRowCell>
          <TableRowCell center>
            <template v-if="rule.type">
              <DsfrBadge
                v-for="action,i in rule.actions"
                :key="i"
                size="sm"
                class="truncate"
              >
                {{ action.key }}
              </DsfrBadge>
            </template>
          </TableRowCell>
        </TableRow>
      </TableBody>
    </Table>

    <Pagination
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
import DrawerRule from '@/components/drawer/DrawerRule'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Button from '@/components/dsfr/Button.vue'
import Tag from '@/components/dsfr/Tag.vue'
import DsfrBadge from '@/components/dsfr/Badge.vue'

export default {
  components: {
    DrawerRule,
    SearchFilters,
    Pagination,
    Breadcrumb,
    Button,
    Tag,
    DsfrBadge
  },
  mixins: [QueryBuilder],
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/rules',
      drawerRuleId: null
    }
  }
}
</script>
