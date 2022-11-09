<template>
  <div class="flex flex-col gap-8">
    <DrawerTerm :term-id="drawerTermId" @close="drawerTermId = null" />
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Taxonomies' },
          { text: $route.params.slug }
        ]"
      />
    </portal>

    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        title,
        `${title}s`,
        false
      )}`"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <Button
            icon="RiAddLine"
            @click="$router.push(
              `/admin/taxonomies/${$route.params.slug}/add?redirect=/admin/taxonomies/${$route.params.slug}`)
            "
          >
            Nouveau
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
          :key="`terms-with-related-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[has_related]'] && $route.query['filter[has_related]'] == 'yes'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[has_related]', 'yes')"
        >
          Avec des liaisons
        </Tag>

        <Tag
          :key="`terms-without-related-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[has_related]'] && $route.query['filter[has_related]'] == 'no'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[has_related]', 'no')"
        >
          Sans liaison
        </Tag>
      </template>
    </SearchFilters>

    <Table v-if="queryResult.total">
      <TableHead>
        <TableHeadCell>Nom</TableHeadCell>
        <TableHeadCell>Liaisons</TableHeadCell>
      </TableHead>
      <TableBody>
        <TableRow
          v-for="term in queryResult.data"
          :key="term.id"
          class="cursor-pointer"
          @click.native="drawerTermId = term.id"
        >
          <TableRowCell>
            <div class="font-medium text-gray-900">
              {{ term.name }}
            </div>
            <div class="text-gray-500">
              {{ term.is_published ? 'En ligne' : 'Hors ligne' }}
            </div>
          </TableRowCell>
          <TableRowCell>
            {{ term.related_count ? $options.filters.pluralize(term.related_count, 'liaison') : '-' }}
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
import DrawerTerm from '@/components/drawer/DrawerTerm'
import Pagination from '@/components/dsfr/Pagination.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Button from '@/components/dsfr/Button.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    DrawerTerm,
    SearchFilters,
    Pagination,
    Breadcrumb,
    Button,
    Tag
  },
  mixins: [QueryBuilder],
  layout: 'admin-with-sidebar-menu',
  middleware: 'admin',
  data () {
    return {
      endpoint: `/vocabularies/${this.$route.params.slug}/terms`,
      drawerTermId: null
    }
  },
  computed: {
    title () {
      switch (this.$route.params.slug) {
        case 'skills':
          return 'compétence'
        case 'profiles':
          return 'tags utilisateurs'
        case 'tags':
          return 'tag'
        default:
          return this.$route.params.slug
      }
    }
  },
  methods: {
    onSubmit () {
      //
    }
  }
}
</script>

<style>

</style>
