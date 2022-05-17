<template>
  <div class="flex flex-col gap-8">
    <DrawerTemoignage :temoignage-id="drawerTemoignageId" @close="drawerTemoignageId = null" @updated="$fetch()" />
    <portal to="breadcrumb">
      <Breadcrumb
        :items="[
          { label: 'Tableau de bord', link: '/dashboard' },
          { label: 'Témoignages' },
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
        <Checkbox
          :key="`toutes-${$route.fullPath}`"
          :option="{key: 'toutes', label:'Toutes'}"
          :is-checked="hasActiveFilters()"
          variant="button"
          size="xs"
          transparent
          @change="deleteAllFilters()"
        />
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
        <Checkbox
          :key="`published-${$route.fullPath}`"
          :option="{key: 'true', label:'En ligne'}"
          :is-checked="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'true'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[is_published]', 'true')"
        />
        <Checkbox
          :key="`unpublished-${$route.fullPath}`"
          :option="{key: 'false', label: 'Hors ligne'}"
          :is-checked="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'false'"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[is_published]', 'false')"
        />
      </template>
    </SearchFilters>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CardTemoignage
        v-for="temoignage in queryResult.data"
        :key="temoignage.id"
        class="cursor-pointer"
        :temoignage="temoignage"
        @click.native="drawerTemoignageId = temoignage.id"
      />
    </div>

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
import CardTemoignage from '@/components/card/CardTemoignage.vue'
import DrawerTemoignage from '@/components/drawer/DrawerTemoignage.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'

export default {
  components: {
    CardTemoignage,
    DrawerTemoignage,
    SearchFilters
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
