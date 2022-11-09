<template>
  <div class="flex flex-col gap-8">
    <DrawerTemoignage :temoignage-id="drawerTemoignageId" @close="drawerTemoignageId = null" @updated="$fetch()" @refetch="$fetch()" />
    <portal to="breadcrumb">
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Témoignages' },
        ]"
      />
    </portal>
    <SectionHeading
      :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
        queryResult.total,
        'témoignage',
        'témoignages',
        false
      )}`"
    />
    <SearchFilters>
      <Input
        name="search"
        placeholder="Rechercher par mots clés, email, nom"
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
          Tous
        </Tag>

        <Tag
          :key="`published-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'true'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_published]', 'true')"
        >
          En ligne
        </Tag>

        <Tag
          :key="`unpublished-${$route.fullPath}`"
          as="button"
          size="md"
          context="selectable"
          :is-selected="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'false'"
          is-selected-class="border-gray-50 bg-gray-50"
          @click.native="changeFilter('filter[is_published]', 'false')"
        >
          Hors ligne
        </Tag>

        <SelectAdvanced
          :key="`state-${$route.fullPath}`"
          name="state"
          placeholder="Toutes les notes"
          :options="$labels.testimonial_grade"
          :value="$route.query['filter[grade]']"
          theme="filter"
          variant="transparent"
          clearable
          @input="changeFilter('filter[grade]', $event)"
        />
      </template>
    </SearchFilters>

    <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
      <CardTemoignage
        v-for="temoignage in queryResult.data"
        :key="temoignage.id"
        class="cursor-pointer"
        :temoignage="temoignage"
        @click.native="drawerTemoignageId = temoignage.id"
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
import CardTemoignage from '@/components/card/CardTemoignage.vue'
import DrawerTemoignage from '@/components/drawer/DrawerTemoignage.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    CardTemoignage,
    DrawerTemoignage,
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
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau', 'responsable'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {
      endpoint: '/temoignages',
      queryParams: {
      },
      drawerTemoignageId: null
    }
  }
}
</script>
