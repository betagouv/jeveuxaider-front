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
    <div>
      <Input
        name="search"
        placeholder="Rechercher par mots clés, email, nom"
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        clearable
        @input="changeFilter('filter[search]', $event)"
      />
      <div class="hidden lg:flex gap-x-4 gap-y-4 mt-2 text-sm flex-wrap">
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
          v-for="option in $labels.testimonial_grade"
          :key="`${option.key}-${$route.fullPath}`"
          :option="{key: option.key, label:option.label}"
          :is-checked="$route.query['filter[grade]'] && $route.query['filter[grade]'] == option.key"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[grade]', option.key)"
        />
      </div>
    </div>

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

export default {
  components: {
    CardTemoignage,
    DrawerTemoignage
  },
  mixins: [QueryBuilder],
  layout: 'admin-with-sidebar-menu',
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
