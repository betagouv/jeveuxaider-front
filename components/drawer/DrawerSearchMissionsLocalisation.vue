<template>
  <DrawerLeft :is-open="isOpen" @close="$emit('close')">
    <template #title>
      <div class="font-bold">
        Filtres de localisation
      </div>
    </template>
    <div class="font-medium text-[15px]">
      Je cherche une mission à faire…
    </div>
    <TabsFacetFilter
      filter-name="type"
      class="w-full"
      :tabs="[
        {
          icon: 'LocationMarkerIcon',
          filterValue: 'Mission en présentiel',
          current: !$route.query['type'],
          label: 'Près de chez moi'
        },
        {
          icon: 'DesktopComputerIcon',
          filterValue: 'Mission à distance',
          label: 'Depuis chez moi'
        }
      ]"
    />
    <LocalisationSuggestions
      v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'"
      :ip-lat-lng="$store.state.algoliaSearchMissions.results.aroundLatLng"
      @updated="$emit('close')"
    />

    <div v-else class="text-gray-700">
      Découvrez le télébénévolat ! Vous pouvez désormais réaliser des missions de bénévolat à distance, quelle que soit votre localisation.
    </div>

    <template #footer>
      <div
        :class="[
          'p-4 flex items-center space-x-3 justify-end',
        ]"
      >
        <Button @click.native="$emit('close')">
          <template v-if="$store.state.algoliaSearchMissions.results.nbHits == 0">
            Aucun résultat
          </template>
          <template v-else-if="$store.state.algoliaSearchMissions.results.nbHits == 1">
            Voir les résultats
          </template>
          <template v-else>
            Voir les {{ $store.state.algoliaSearchMissions.results.nbHits }} résultats
          </template>
        </Button>
      </div>
    </template>
  </DrawerLeft>
</template>

<script>
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import TabsFacetFilter from '@/components/section/search/TabsFacetFilter.vue'
import LocalisationSuggestions from '@/components/search/LocalisationSuggestions.vue'

export default {
  components: {
    TabsFacetFilter,
    LocalisationSuggestions
  },
  mixins: [AlgoliaQueryBuilder],
  props: {
    isOpen: { type: Boolean, default: false }
  }
}
</script>
