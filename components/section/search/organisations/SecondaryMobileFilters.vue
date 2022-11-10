<template>
  <div>
    <template v-if="$store.state.algoliaSearch.results">
      <DrawerSearchOrganisationsFilters
        :is-open="isSearchMissionsFiltersOpen"
        @close="isSearchMissionsFiltersOpen = false"
      />
      <DrawerSearchOrganisationsLocalisation
        :is-open="isSearchOrganisationsLocalisationOpen"
        @close="isSearchOrganisationsLocalisationOpen = false"
      />
    </template>
    <div class="flex justify-center flex-wrap items-center gap-3 mt-4">
      <Tag
        v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'"
        :is-active="true"
        icon="LocationMarkerIcon"
        :icon-fill-current="false"
        size="md"
        context="clickable"
        as="button"
        @click.native="isSearchOrganisationsLocalisationOpen = true"
      >
        <div v-if="$store.state.algoliaSearch.results.aroundLatLng">
          Autour de moi
        </div>
        <div v-else>
          {{ $route.query.city }}
        </div>
      </Tag>

      <Tag
        :is-active="activeMoreFacets.length > 0"
        context="clickable"
        size="md"
        as="button"
        @click.native="isSearchMissionsFiltersOpen = true"
      >
        <span v-if="activeMoreFacets.length">
          +{{ $options.filters.pluralize(activeFacets.length, 'filtre', 'filtres',) }}
        </span>
        <template v-else>
          Plus de filtres
        </template>
      </Tag>
    </div>
  </div>
</template>

<script>
import DrawerSearchOrganisationsFilters from '@/components/drawer/DrawerSearchOrganisationsFilters.vue'
import DrawerSearchOrganisationsLocalisation from '@/components/drawer/DrawerSearchOrganisationsLocalisation.vue'
import AlgoliaOrganisationsQueryBuilder from '@/mixins/algolia-organisations-query-builder'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    DrawerSearchOrganisationsFilters,
    DrawerSearchOrganisationsLocalisation,
    Tag
  },
  mixins: [AlgoliaOrganisationsQueryBuilder],
  data () {
    return {
      isSearchMissionsFiltersOpen: false,
      isSearchOrganisationsLocalisationOpen: false
    }
  }
}
</script>
