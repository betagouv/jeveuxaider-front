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
    <div class="flex justify-center items-center gap-3 mt-6">
      <Tag
        v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'"
        :is-active="true"
        context="clickable"
        size="md"
        as="button"
        icon="LocationMarkerIcon"
        :icon-fill-current="false"
        @click.native="isSearchMissionsLocalisationOpen = true"
      >
        <div v-if="$store.state.algoliaSearch.results.aroundLatLng">
          Autour de moi
        </div>
        <div v-else class="truncate">
          {{ $route.query.city }}
        </div>
      </Tag>
      <Tag
        :is-active="nbMobileSecondaryFilters > 0"
        context="clickable"
        size="md"
        as="button"
        @click.native="isSearchMissionsFiltersOpen = true"
      >
        <span v-if="nbMobileSecondaryFilters > 0">
          +{{ $options.filters.pluralize(nbMobileSecondaryFilters, 'filtre', 'filtres',) }}
        </span>
        <template v-else>
          Plus de filtres
        </template>
      </Tag>
    </div>
  </div>
</template>

<script>
import DrawerSearchMissionsFilters from '@/components/drawer/DrawerSearchMissionsFilters.vue'
import DrawerSearchMissionsLocalisation from '@/components/drawer/DrawerSearchMissionsLocalisation.vue'
import AlgoliaMissionsQueryBuilder from '@/mixins/algolia-missions-query-builder'
import Tag from '@/components/dsfr/Tag.vue'

export default {
  components: {
    DrawerSearchMissionsFilters,
    DrawerSearchMissionsLocalisation,
    Tag
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
