<template>
  <div ref="primaryFilters" class="hidden sm:block lg:sticky lg:top-[-1px] z-30">
    <div class="bg-white shadow-xl lg:py-6" :class="[{ 'full-bleed': isPinned }]">
      <div class="lg:max-w-[960px] xl:max-w-[1284px] mx-auto">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 lg:!divide-x">
          <div :class="[spacingClasses, 'border-b lg:border-b-0']">
            <div class="text-gray-500 mb-1">Localisation</div>
            <div>
              <LocalisationFilter label="Saisissez votre ville" />
            </div>
          </div>
          <div :class="[spacingClasses, 'border-l border-b lg:border-b-0']">
            <div class="text-gray-500 mb-1">Activités</div>
            <FacetFilterToggle
              facet-name="activities.name"
              label="Activités"
              :facets="$stores.algoliaSearch.facetResults('activities.name')"
              legend="Filtrer par type d'activité"
            >
              <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
                <button
                  :aria-expanded="isOpen || 'false'"
                  class="flex space-x-2 items-center justify-between group w-full"
                >
                  <div class="flex space-x-2 items-center truncate">
                    <RiBookmark3Fill
                      class="h-4 w-4 transition-opacity opacity-25 group-hover:opacity-100 flex-none"
                    />
                    <span v-if="!firstValueSelected" class="italic pr-[1px] text-[#888888]"
                      >Toutes</span
                    >
                    <span v-else class="font-bold truncate">
                      {{ firstValueSelected
                      }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </span>
                  </div>
                  <RiArrowDownSLine class="text-gray-500 h-4 w-4 group-hover:text-gray-900" />
                </button>
              </template>
            </FacetFilterToggle>
          </div>
          <div :class="[spacingClasses, '']">
            <div class="text-gray-500 mb-1">Publics aidés</div>
            <FacetFilterToggle
              facet-name="publics_beneficiaires"
              label="Publics aidés"
              :facets="$stores.algoliaSearch.facetResults('publics_beneficiaires')"
              legend="Filtrer par public aidé"
            >
              <template #button="{ firstValueSelected, activeValuesCount, isOpen }">
                <button
                  :aria-expanded="isOpen || 'false'"
                  class="flex space-x-2 items-center justify-between group w-full"
                >
                  <div class="flex space-x-2 items-center truncate">
                    <RiUserHeartFill
                      class="h-4 w-4 transition-opacity opacity-25 group-hover:opacity-100 flex-none"
                    />
                    <span v-if="!firstValueSelected" class="italic pr-[1px] text-[#888888]"
                      >Tous</span
                    >
                    <span v-else class="font-bold truncate">
                      {{ firstValueSelected
                      }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </span>
                  </div>
                  <RiArrowDownSLine class="text-gray-500 h-4 w-4 group-hover:text-gray-900" />
                </button>
              </template>
            </FacetFilterToggle>
          </div>
          <div :class="[spacingClasses, 'border-l lg:border-l-0']">
            <div class="text-gray-500 mb-1">Recherche</div>
            <SearchFilter />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FacetFilterToggle from '@/components/section/search/FacetFilterToggle.vue'
import LocalisationFilter from '@/components/search/LocalisationFilter.vue'
import SearchFilter from '@/components/search/SearchFilter.vue'

export default defineNuxtComponent({
  components: {
    FacetFilterToggle,
    LocalisationFilter,
    SearchFilter,
  },
  data() {
    return {
      isPinned: false,
      isPinnedObserver: null,
      spacingClasses: 'px-6 py-6 lg:py-0 lg:px-10 xl:px-12',
    }
  },
  mounted() {
    this.isPinnedObserver = new IntersectionObserver(
      ([e]) => {
        this.isPinned = e.intersectionRatio < 1
      },
      { threshold: [1] }
    )
    this.isPinnedObserver.observe(this.$refs.primaryFilters)
  },
  beforeDestroy() {
    this.isPinnedObserver.disconnect()
  },
})
</script>

<style lang="postcss" scoped>
.full-bleed {
  @screen lg {
    width: 100dvw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50dvw;
    margin-right: -50dvw;
  }
}
</style>
