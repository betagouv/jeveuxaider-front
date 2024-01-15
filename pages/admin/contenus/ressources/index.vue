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
      <DsfrInput
        type="search"
        size="lg"
        placeholder="Recherche par mots clés..."
        icon="RiSearchLine"
        :modelValue="$route.query['filter[search]']"
        @update:modelValue="changeFilter('filter[search]', $event)"
      />
      <template #prefilters>
        <DsfrTag
          :key="`toutes-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="!hasActiveFilters"
          @click.native="deleteAllFilters"
        >
          Toutes
        </DsfrTag>

        <DsfrTag
          :key="`published-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 1
          "
          @click.native="changeFilter('filter[is_published]', 1)"
        >
          En ligne
        </DsfrTag>

        <DsfrTag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-active="
            $route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 0
          "
          @click.native="changeFilter('filter[is_published]', 0)"
        >
          Hors ligne
        </DsfrTag>
      </template>
    </SearchFilters>

    <BaseTable v-if="queryResult.total">
      <BaseTableHead>
        <BaseTableHeadCell>Nom</BaseTableHeadCell>
        <BaseTableHeadCell> En ligne </BaseTableHeadCell>
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
            <div class="flex gap-2 flex-wrap mt-1">
              <DsfrTag v-if="ressource.roles.includes('referent')">Référents</DsfrTag>
              <DsfrTag v-if="ressource.roles.includes('responsable')">Responsables</DsfrTag>
            </div>
          </BaseTableRowCell>
          <BaseTableRowCell>
            <CustomOnlineIndicator :published="ressource.is_published" />
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
