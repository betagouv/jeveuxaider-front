<template>
  <DrawerLeft :is-open="isOpen" @close="$emit('close')">
    <template #title>
      <div class="font-bold">
        Filtres de localisation
      </div>
    </template>
    <div class="font-medium text-[15px]">
      Je cherche une association située à…
    </div>

    <LocalisationSuggestions
      :ip-lat-lng="$store.state.algoliaSearch.results.aroundLatLng"
    />

    <template #footer>
      <div
        :class="[
          'p-4 flex items-center space-x-3 justify-end',
        ]"
      >
        <Button @click.native="$emit('close')">
          <template v-if="$store.state.algoliaSearch.results.nbHits == 0">
            Aucun résultat
          </template>
          <template v-else-if="$store.state.algoliaSearch.results.nbHits == 1">
            Voir les résultats
          </template>
          <template v-else>
            Voir les {{ $store.state.algoliaSearch.results.nbHits }} résultats
          </template>
        </Button>
      </div>
    </template>
  </DrawerLeft>
</template>

<script>
import AlgoliaOrganisationsQueryBuilder from '@/mixins/algolia-organisations-query-builder'
import LocalisationSuggestions from '@/components/search/LocalisationSuggestions.vue'

export default {
  components: {
    LocalisationSuggestions
  },
  mixins: [AlgoliaOrganisationsQueryBuilder],
  props: {
    isOpen: { type: Boolean, default: false }
  }
}
</script>
