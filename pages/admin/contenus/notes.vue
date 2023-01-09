<template>
  <div class="flex flex-col gap-8">
    <!-- <DrawerTemoignage :temoignage-id="drawerTemoignageId" @close="drawerTemoignageId = null" @updated="$fetch()" @refetch="$fetch()" /> -->
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Notes' },
        ]"
      />
    </portal>
    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        'note',
        'notes',
        false
      )}`"
    />
    <SearchFilters>
      <Input
        name="search"
        placeholder="Rechercher par mots clés, nom"
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        clearable
        @input="changeFilter('filter[search]', $event)"
      />
      <template #prefilters>
        <Tag
          :key="`tous-${$route.fullPath}`"
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
          :key="`mine-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[mine]'] && $route.query['filter[mine]'] == '1'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[mine]', '1')"
        >
          Mes notes
        </Tag>

        <Tag
          :key="`type-organisations-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[type]'] && $route.query['filter[type]'] == 'organisations'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[type]', 'organisations')"
        >
          Organisations
        </Tag>

        <Tag
          :key="`type-missions-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[type]'] && $route.query['filter[type]'] == 'missions'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[type]', 'missions')"
        >
          Missions
        </Tag>
      </template>
    </SearchFilters>

    <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
      <CardNote
        v-for="note in queryResult.data"
        :key="note.id"
        class=""
        :note="note"
      />
    </div>

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
import CardNote from '@/components/card/CardNote.vue'
// import DrawerTemoignage from '@/components/drawer/DrawerTemoignage.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    CardNote,
    SearchFilters,
    Pagination,
    Breadcrumb,
    Tag
  },
  mixins: [QueryBuilder],
  layout: 'admin-with-sidebar-menu',
  middleware: 'authenticated',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {
      endpoint: '/notes',
      queryParams: {
      },
      drawerTemoignageId: null
    }
  }
}
</script>
