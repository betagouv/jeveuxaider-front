<template>
  <div class="flex flex-col gap-8">
    <DrawerRessource :ressource-id="drawerRessourceId" @close="drawerRessourceId = null" />
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Administration', to: '/admin' },
            { text: 'Contenus' },
            { text: 'Ressources' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'ressource',
        'ressources',
        false
      )}`"
      :loading="queryLoading"
    >
      <template #action>
        <div class="hidden lg:block space-x-2 flex-shrink-0">
          <DsfrButton icon="RiAddLine" @click="$router.push(`/admin/contenus/ressources/add`)">
            Nouveau
          </DsfrButton>
        </div>
      </template>
    </BaseSectionHeading>

    <SearchFilters>
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
          :is-selected="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 1
          "
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_published]', 1)"
        >
          En ligne
        </DsfrTag>

        <DsfrTag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 0
          "
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_published]', 0)"
        >
          Hors ligne
        </DsfrTag>
      </template>
    </SearchFilters>

    <BaseTable v-if="queryResult.total">
      <BaseTableHead>
        <BaseTableHeadCell>Nom</BaseTableHeadCell>
        <BaseTableHeadCell center> Référents </BaseTableHeadCell>
        <BaseTableHeadCell center> Responsables </BaseTableHeadCell>
      </BaseTableHead>
      <BaseTableBody>
        <BaseTableRow
          v-for="ressource in queryResult.data"
          :key="ressource.id"
          class="cursor-pointer"
          @click.native="drawerRessourceId = ressource.id"
        >
          <BaseTableRowCell class="max-w-xl">
            <div class="font-medium text-gray-900 truncate">
              {{ ressource.title }}
            </div>
            <div class="text-gray-500">
              {{ ressource.is_published ? 'En ligne' : 'Hors ligne' }}
            </div>
          </BaseTableRowCell>
          <BaseTableRowCell center>
            <template v-if="ressource.roles.includes('referent')">
              <RiCheckLine class="h-5 w-5 mx-auto fill-current" />
            </template>
          </BaseTableRowCell>
          <BaseTableRowCell center>
            <template v-if="ressource.roles.includes('responsable')">
              <RiCheckLine class="h-5 w-5 mx-auto fill-current" />
            </template>
          </BaseTableRowCell>
        </BaseTableRow>
      </BaseTableBody>
    </BaseTable>

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
import DrawerRessource from '@/components/drawer/DrawerRessource.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    DrawerRessource,
    SearchFilters,
    Pagination,
    Breadcrumb,
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
      endpoint: '/documents',
      drawerRessourceId: null,
    }
  },
}
</script>
