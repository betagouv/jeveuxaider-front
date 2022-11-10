<template>
  <div class="flex flex-col gap-8">
    <DrawerRessource :ressource-id="drawerRessourceId" @close="drawerRessourceId = null" />
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Contenus' },
          { text: 'Ressources' }
        ]"
      />
    </portal>

    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        'ressource',
        'ressources',
        false
      )}`"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <Button icon="RiAddLine" @click="$router.push(`/admin/contenus/ressources/add`)">
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
          :key="`published-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 1"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_published]', 1)"
        >
          En ligne
        </Tag>

        <Tag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 0"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_published]', 0)"
        >
          Hors ligne
        </Tag>
      </template>
    </SearchFilters>

    <Table v-if="queryResult.total">
      <TableHead>
        <TableHeadCell>Nom</TableHeadCell>
        <TableHeadCell center>
          Référents
        </TableHeadCell>
        <TableHeadCell center>
          Responsables
        </TableHeadCell>
      </TableHead>
      <TableBody>
        <TableRow
          v-for="ressource in queryResult.data"
          :key="ressource.id"
          class="cursor-pointer"
          @click.native="drawerRessourceId = ressource.id"
        >
          <TableRowCell class="max-w-xl">
            <div class="font-medium text-gray-900 truncate">
              {{ ressource.title }}
            </div>
            <div class="text-gray-500">
              {{ ressource.is_published ? 'En ligne' : 'Hors ligne' }}
            </div>
          </TableRowCell>
          <TableRowCell center>
            <template v-if="ressource.roles.includes('referent')">
              <CheckIcon class="h-5 w-5 mx-auto" />
            </template>
          </TableRowCell>
          <TableRowCell center>
            <template v-if="ressource.roles.includes('responsable')">
              <CheckIcon class="h-5 w-5 mx-auto" />
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
import DrawerRessource from '@/components/drawer/DrawerRessource'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Button from '@/components/dsfr/Button.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    DrawerRessource,
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
      loading: false,
      endpoint: '/documents',
      drawerRessourceId: null
    }
  }
}
</script>
