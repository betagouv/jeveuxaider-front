<template>
  <div>
    <template v-if="$store.state.algoliaSearch.results">
      <DrawerSearchMissionsFilters
        :is-open="isSearchMissionsFiltersOpen"
        @close="isSearchMissionsFiltersOpen = false"
      />
      <DrawerSearchMissionsLocalisation
        :is-open="isSearchMissionsLocalisationOpen"
        @close="isSearchMissionsLocalisationOpen = false"
      />
    </template>
    <div class="flex justify-center items-center gap-3 mt-4">
      <BadgeFilter
        v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'"
        class="truncate"
        :is-active="true"
        @click.native="isSearchMissionsLocalisationOpen = true"
      >
        <div class="flex items-center space-x-2 text-jva-blue-500">
          <LocationMarkerIcon class="h-4 w-4 flex-none" />
          <div v-if="$store.state.algoliaSearch.results.aroundLatLng">
            Autour de moi
          </div>
          <div v-else class="truncate">
            {{ $route.query.city }}
          </div>
        </div>
      </BadgeFilter>
      <BadgeFilter :is-active="nbMobileSecondaryFilters > 0" @click.native="isSearchMissionsFiltersOpen = true">
        <template v-if="nbMobileSecondaryFilters > 0">
          <span class="text-jva-blue-500">+{{ $options.filters.pluralize(nbMobileSecondaryFilters, 'filtre', 'filtres',) }}</span>
        </template>
        <template v-else>
          Plus de filtres
        </template>
      </BadgeFilter>
    </div>
  </div>
</template>

<script>
import DrawerSearchMissionsFilters from '@/components/drawer/DrawerSearchMissionsFilters.vue'
import DrawerSearchMissionsLocalisation from '@/components/drawer/DrawerSearchMissionsLocalisation.vue'
import BadgeFilter from '~/components/search/BadgeFilter.vue'
import AlgoliaMissionsQueryBuilder from '@/mixins/algolia-missions-query-builder'

export default {
  components: {
    DrawerSearchMissionsFilters,
    DrawerSearchMissionsLocalisation,
    BadgeFilter
  },
  mixins: [AlgoliaMissionsQueryBuilder],
  data () {
    return {
      isSearchMissionsFiltersOpen: false,
      isSearchMissionsLocalisationOpen: false
    }
  }
}
</script>
