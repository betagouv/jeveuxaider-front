<template>
  <div class="flex flex-col gap-8">
    <DrawerRessource :ressource-id="drawerRessourceId" @close="drawerRessourceId = null" />
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Contenus' },
          { label: 'Ressources' }
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
          <nuxt-link :to="`/admin/contenus/ressources/add`">
            <Button size="lg" icon="PlusIcon">
              Nouveau
            </Button>
          </nuxt-link>
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
        <Checkbox
          :key="`toutes-${$route.fullPath}`"
          :option="{key: 'toutes', label:'Toutes'}"
          :is-checked="hasActiveFilters()"
          variant="button"
          size="xs"
          transparent
          @change="deleteAllFilters()"
        />
        <Checkbox
          :key="`published-${$route.fullPath}`"
          :option="{key: 1, label:'En ligne'}"
          :is-checked="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 1"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[is_published]', 1)"
        />
        <Checkbox
          :key="`unpublished-${$route.fullPath}`"
          :option="{key: 0, label:'Hors ligne'}"
          :is-checked="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 0"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[is_published]', 0)"
        />
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

export default {
  components: {
    DrawerRessource,
    SearchFilters
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
