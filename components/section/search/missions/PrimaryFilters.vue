<template>
  <div ref="primaryFilters" class="hidden sm:block lg:sticky lg:top-[-1px] z-10">
    <div class="bg-white shadow-xl lg:py-6" :class="[{ 'full-bleed': isPinned }]">
      <div class="lg:max-w-[960px] xl:max-w-[1284px] mx-auto">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 lg:!divide-x xl:grid-cols-5">
          <div :class="[spacingClasses, 'border-b lg:border-b-0']">
            <MissionTypeFilter />
          </div>

          <div :class="[spacingClasses, 'border-l border-b lg:border-b-0']">
            <div class="text-[#7B7B7B] mb-1">Lieu de la mission</div>
            <div>
              <LocalisationFilter
                v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'"
                label="Localisation"
              />
              <div v-else>
                <div class="flex space-x-2 items-center">
                  <RiComputerFill
                    class="h-4 w-4 flex-none transition-opacity opacity-25 group-hover:opacity-100"
                  />
                  <span class="font-bold truncate">À distance</span>
                </div>
              </div>
            </div>
          </div>

          <div :class="[spacingClasses]">
            <div class="text-[#7B7B7B] mb-1">Activités</div>
            <FacetFilterToggle
              facet-name="activities.name"
              label="Activités"
              :facets="$stores.algoliaSearch.facetResults('activities.name')"
              legend="Filtrer par type d'activité"
            >
              <template #button="props">
                <!--
                  v-show au lieu de v-if
                  https://github.com/vuejs/core/issues/5657
                -->
                <div>
                  <button
                    :aria-expanded="props?.isOpen || 'false'"
                    class="w-full flex space-x-2 items-center justify-between group"
                  >
                    <span class="flex space-x-2 items-center truncate">
                      <RiBookmark3Fill
                        class="h-4 w-4 transition-opacity opacity-25 group-hover:opacity-100 flex-none"
                      />
                      <span
                        v-show="!props?.firstValueSelected"
                        class="italic pr-[1px] text-[#888888]"
                      >
                        Toutes
                      </span>
                      <span v-show="props?.firstValueSelected" class="font-bold truncate">
                        <span>{{ props?.firstValueSelected }}</span>
                        <span v-show="props?.activeValuesCount > 1"
                          >, +{{ props?.activeValuesCount - 1 }}</span
                        >
                      </span>
                    </span>
                    <RiArrowDownSLine class="text-[#7B7B7B] h-4 w-4 group-hover:text-gray-900" />
                  </button>
                </div>
              </template>
            </FacetFilterToggle>
          </div>

          <div :class="[spacingClasses, 'border-l lg:border-l-0']">
            <div class="text-[#7B7B7B] mb-1">Dates et disponibilités</div>
            <DatesCommitmentFilter>
              <template #button="{ activeValue }">
                <div class="flex space-x-2 items-center justify-between group w-full">
                  <div class="flex space-x-2 items-center truncate">
                    <RiTimeFill
                      class="h-4 w-4 transition-opacity opacity-25 group-hover:opacity-100 flex-none"
                    />
                    <div
                      :class="[
                        'truncate',
                        { 'font-bold': activeValue },
                        { 'italic pr-[1px] text-[#888888]': !activeValue },
                      ]"
                    >
                      {{ activeValue || 'Toutes' }}
                    </div>
                  </div>
                  <RiArrowDownSLine class="text-[#7B7B7B] h-4 w-4 group-hover:text-gray-900" />
                </div>
              </template>
            </DatesCommitmentFilter>
          </div>

          <div :class="[spacingClasses, 'hidden xl:block']">
            <div class="text-[#7B7B7B] mb-1">Recherche</div>
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
import CommitmentFilter from '@/components/section/search/CommitmentFilter.vue'
import DatesCommitmentFilter from '@/components/section/search/DatesCommitmentFilter.vue'
import SearchFilter from '@/components/search/SearchFilter.vue'
import MissionTypeFilter from '@/components/search/MissionTypeFilter.vue'

export default defineNuxtComponent({
  components: {
    FacetFilterToggle,
    CommitmentFilter,
    DatesCommitmentFilter,
    LocalisationFilter,
    SearchFilter,
    MissionTypeFilter,
  },
  data() {
    return {
      isPinned: false,
      isPinnedObserver: null,
      spacingClasses: 'px-6 py-6 lg:py-0',
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
  beforeUnmount() {
    this.isPinnedObserver?.disconnect()
  },
})
</script>

<style lang="postcss" scoped>
.full-bleed {
  @screen lg {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
}
</style>
