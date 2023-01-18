<template>
  <div class="flex flex-col gap-8">
    <!-- <DrawerLog :log-id="drawerLogId" @close="drawerLogId = null" /> -->
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Autres' },
          { text: 'Logs' }
        ]"
      />
    </portal>

    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        'log',
        'logs',
        false
      )}`"
    />

    <SearchFilters>
      <Input
        name="search"
        placeholder="Recherche par emails..."
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
        <TagSelectAdvanced
          :key="`subject-type-${$route.fullPath}`"
          name="types"
          placeholder="Tous les types"
          :options="[
            {key:'organisations', label:'Organisations'},
            {key:'missions', label:'Missions'},
            {key:'participations', label:'Participations'},
            {key:'utilisateurs', label:'Utilisateurs'},
          ]"
          :value="$route.query['filter[type]']"
          clearable
          @input="changeFilter('filter[type]', $event)"
        />
      </template>
    </SearchFilters>

    <CardLog
      v-for="log in queryResult.data"
      :key="log.id"
      :log="log"
    />

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
// import DrawerLog from '@/components/drawer/DrawerLog'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import CardLog from '@/components/card/CardLog.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    // DrawerLog,
    SearchFilters,
    Pagination,
    Breadcrumb,
    CardLog,
    Tag
  },
  mixins: [QueryBuilder],
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  data () {
    return {
      loading: false,
      endpoint: '/activity-logs',
      queryParams: {
        include: 'causer,causer.profile,subject'
      },
      drawerLogId: null
    }
  }
}
</script>
