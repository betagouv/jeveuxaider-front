<template>
  <div>
    <template v-if="$store.state.algoliaSearchOrganisations.results">
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
      <BadgeFilter
        v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'"
        :is-active="true"
        @click.native="isSearchOrganisationsLocalisationOpen = true"
      >
        <div class="flex items-center space-x-2 text-jva-blue-500">
          <LocationMarkerIcon class="h-4 w-4" />
          <div v-if="$store.state.algoliaSearchOrganisations.results.aroundLatLng">
            Autour de moi
          </div>
          <div v-else>
            {{ $route.query.city }}
          </div>
        </div>
      </BadgeFilter>
      <BadgeFilter :is-active="activeMoreFacets.length > 0" @click.native="isSearchMissionsFiltersOpen = true">
        <template v-if="activeMoreFacets.length">
          <span class="text-jva-blue-500">+{{ $options.filters.pluralize(activeFacets.length, 'filtre', 'filtres',) }}</span>
        </template>
        <template v-else>
          Plus de filtres
        </template>
      </BadgeFilter>
    </div>
  </div>
</template>

<script>
import DrawerSearchOrganisationsFilters from '@/components/drawer/DrawerSearchOrganisationsFilters.vue'
import DrawerSearchOrganisationsLocalisation from '@/components/drawer/DrawerSearchOrganisationsLocalisation.vue'
import BadgeFilter from '~/components/search/BadgeFilter.vue'
import AlgoliaOrganisationsQueryBuilder from '@/mixins/algolia-organisations-query-builder'

export default {
  components: {
    DrawerSearchOrganisationsFilters,
    DrawerSearchOrganisationsLocalisation,
    BadgeFilter
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
