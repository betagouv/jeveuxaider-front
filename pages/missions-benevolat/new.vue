<template>
  <div>
    <Breadcrumb
      :items="[{ label: 'Missions de bénévolat', link: '/missions-benevolat' }]"
      class="container md:px-8 border-b-0"
    />

    <!-- MOBILE FILTERS -->
    <template v-if="searchResult">
      <DrawerFilters
        :is-open="isMobileFiltersOpen"
        @close="isMobileFiltersOpen = false"
      >
        <template #title>
          <div class="font-bold">
            Filtres de recherche
          </div>
        </template>

        <div class="space-y-2">
          <div class="relative font-medium text-[15px]">
            Mots-clés
          </div>
          <SearchFilter />
        </div>

        <div class="space-y-2">
          <div class="relative font-medium text-[15px]">
            Disponibilités
          </div>
          <CommitmentMobileFilter />
        </div>

        <FacetMobileFilter show-more facet-name="publics_beneficiaires" label="Publics aidés" :limit-options="3" :facets="facetResults('publics_beneficiaires')" />
        <FacetMobileFilter show-more facet-name="activity.name" label="Activités" :limit-options="3" :facets="facetResults('activity.name')" />
        <FacetMobileFilter show-more facet-name="structure.name" label="Organisations" :limit-options="3" :facets="facetResults('structure.name')" />
        <FacetMobileFilter show-more facet-name="domaines" label="Domaines" :limit-options="3" :facets="facetResults('domaines')" />
        <FacetMobileFilter show-more facet-name="structure.reseaux.name" label="Réseaux" :limit-options="3" :facets="facetResults('structure.reseaux.name')" />
        <FacetMobileFilter show-more facet-name="department_name" label="Départements" :limit-options="3" :facets="facetResults('department_name')" />

        <template #footer>
          <div
            :class="[
              'p-4 flex items-center space-x-3',
              hasActiveFilters ? 'justify-between' : 'justify-end'
            ]"
          >
            <Link v-if="hasActiveFilters" class="text-gray-500 underline text-sm" @click.native="deleteAllFilters()">
              Réinitialiser
            </Link>
            <Button @click.native="isMobileFiltersOpen = false">
              Voir les {{ searchResult.nbHits }} résultats
            </Button>
          </div>
        </template>
      </DrawerFilters>

      <DrawerFilters
        :is-open="isLocationDrawerFiltersOpen"
        @close="isLocationDrawerFiltersOpen = false"
      >
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
          :ip-lat-lng="searchResult.aroundLatLng"
          @updated="isLocationDrawerFiltersOpen = false"
        />

        <div v-else class="text-gray-700">
          Vous pouvez réalisez des missions à distance, depuis chez vous ou le lieu de votre choix. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quo consequuntur, minima voluptatem odit vel inventore maiores illo explicabo rem vitae ducimus at itaque ad dolorem aperiam odio, fugit fugiat.
        </div>

        <template #footer>
          <div
            :class="[
              'p-4 flex items-center space-x-3',
              hasActiveFilters ? 'justify-between' : 'justify-end'
            ]"
          >
            <Link v-if="hasActiveFilters" class="text-gray-500 underline text-sm" @click.native="deleteAllFilters()">
              Réinitialiser
            </Link>
            <Button @click.native="isLocationDrawerFiltersOpen = false">
              Voir les {{ searchResult.nbHits }} résultats
            </Button>
          </div>
        </template>
      </DrawerFilters>
    </template>

    <div v-if="searchResult" class="container md:px-8 lg:mt-6 mb-12">
      <div class="flex flex-col space-y-6 sm:space-y-12">
        <SectionHeading
          title="Trouver une mission de bénévolat"
          :secondary-title-bottom="`${$options.filters.formatNumber(searchResult.nbHits)} ${$options.filters.pluralize(
            searchResult.nbHits,
            'mission disponible',
            'missions disponibles',
            false
          )}`"
        >
          <template #action>
            <div class="hidden sm:block flex-none">
              <TabsFacetFilter
                filter-name="type"
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
            </div>
          </template>
        </Sectionheading>

        <div class="sm:hidden">
          <div class="bg-white p-6 shadow-xl rounded-xl">
            <LocalisationMobileFilter
              :ip-lat-lng="searchResult.aroundLatLng"
              @open="isLocationDrawerFiltersOpen = true"
            />
          </div>
          <div class="flex justify-center mt-4">
            <BadgeFilter @click.native="isMobileFiltersOpen = true">
              Plus de filtres
            </BadgeFilter>
          </div>
        </div>

        <div class="hidden sm:flex sm:flex-col relative z-10">
          <div class="bg-white px-6 sm:py-6 shadow-xl rounded-xl grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:!divide-x">
            <div class="py-6 sm:py-0 sm:pb-6 sm:pr-6 lg:pb-0 xl:px-6">
              <div class="text-gray-500 mb-1">
                Localisation
              </div>
              <div class="">
                <LocalisationFilter v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'" label="Saisissez votre ville" :ip-lat-lng="searchResult.aroundLatLng" />
                <div v-else>
                  <div class="flex space-x-2 items-center">
                    <DesktopComputerIcon class="h-5 w-5" />
                    <span class="text-gray-500">Depuis chez moi</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="py-6 sm:py-0 sm:pb-6 lg:pb-0 lg:px-6 sm:!border-l sm:pl-6 lg:!border-l-0">
              <div class="text-gray-500 mb-1">
                Activités
              </div>
              <FacetFilter facet-name="activity.name" label="Activités" :facets="facetResults('activity.name')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <div class="flex space-x-2 items-center justify-between group">
                    <div class="flex space-x-2 items-center">
                      <HandIcon class="h-5 w-5" />
                      <span v-if="!firstValueSelected" class="text-gray-900">Toutes</span>
                      <span v-else class="text-gray-900">
                        {{ firstValueSelected }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                      </span>
                    </div>
                    <ChevronDownIcon class="text-gray-500 h-4 w-4 group-hover:text-gray-900" />
                  </div>
                </template>
              </FacetFilter>
            </div>
            <div class="py-6 sm:py-0 sm:pt-6 sm:pr-6 lg:pt-0 lg:px-6 sm:!border-t lg:!border-t-0">
              <div class="text-gray-500 mb-1">
                Disponibilités
              </div>
              <CommitmentFilter>
                <template #button="{ activeValue }">
                  <div class="flex space-x-2 items-center justify-between group">
                    <div class="flex space-x-2 items-center truncate">
                      <ClockIcon class="h-5 w-5" />
                      <div class="text-gray-900 truncate">
                        {{ activeValue || 'Toutes' }}
                      </div>
                    </div>
                    <ChevronDownIcon class="text-gray-500 h-4 w-4 group-hover:text-gray-900" />
                  </div>
                </template>
              </CommitmentFilter>
            </div>
            <div class="py-6 sm:py-0 sm:pt-6 lg:pt-0 lg:px-6 sm:!border-l sm:!border-t lg:!border-t-0 sm:pl-6 lg:!border-l-0">
              <div class="text-gray-500 mb-1">
                Mots-clés
              </div>
              <SearchFilter />
            </div>
          </div>

          <div class="lg:flex justify-between items-center mt-8 lg:mb-8">
            <div class="hidden sm:flex flex-wrap items-center justify-start gap-3">
              <FacetFilter facet-name="structure.name" label="Organisations" :facets="facetResults('structure.name')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="!!activeValuesCount">
                    <span v-if="!firstValueSelected">Organisations</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilter>

              <FacetFilter facet-name="publics_beneficiaires" label="Publics aidés" :facets="facetResults('publics_beneficiaires')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="!!activeValuesCount">
                    <span v-if="!firstValueSelected">Publics aidés</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilter>

              <FacetFilter v-if="isShowMoreFilters || $route.query['domaines']" facet-name="domaines" label="Domaines" :facets="facetResults('domaines')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="!!activeValuesCount">
                    <span v-if="!firstValueSelected">Domaines</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilter>

              <FacetFilter v-if="isShowMoreFilters || $route.query['structure.reseaux.name']" facet-name="structure.reseaux.name" label="Réseaux" :facets="facetResults('structure.reseaux.name')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="!!activeValuesCount">
                    <span v-if="!firstValueSelected">Réseaux</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilter>

              <FacetFilter v-if="isShowMoreFilters || $route.query['department_name']" facet-name="department_name" label="Départements" :facets="facetResults('department_name')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="!!activeValuesCount">
                    <span v-if="!firstValueSelected">Départements</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilter>

              <div
                v-if="!isShowMoreFilters && !allShowMoreFiltersActive"
                class="rounded-full border text-sm flex items-center justify-center h-[34px] w-[34px] text-gray-600 hover:bg-gray-200 border-gray-500 cursor-pointer"
                @click="isShowMoreFilters = true"
              >
                <PlusIcon width="20" />
              </div>
            </div>

            <div class="hidden sm:flex lg:items-center lg:justify-center mt-4 lg:mt-0">
              <Link
                class="underline text-sm"
                :link-class="[{'pointer-events-none opacity-0': !hasActiveFilters}]"
                @click.native="deleteAllFilters()"
              >
                Réinitialiser les filtres
              </Link>
            </div>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 xl:gap-6">
          <nuxt-link
            v-for="item in searchResult.hits"
            :key="item.id"
            class="flex min-w-0 hover:bg-gray-50 focus:bg-gray-50 transition rounded-[10px]"
            :to="
              item.provider == 'api_engagement'
                ? `/missions-benevolat/${item.id}`
                : `/missions-benevolat/${item.id}/${item.slug}`
            "
            @click.native="handleClickCard"
          >
            <CardMission :mission="item" />
          </nuxt-link>
        </div>

        <Pagination
          :current-page="searchResult.page + 1"
          :total-rows="searchResult.nbHits"
          :per-page="20"
          :max-pages="10"
          @page-change="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardMission from '@/components/card/CardMission.vue'
import FacetFilter from '~/components/section/search/FacetFilter.vue'
import TabsFacetFilter from '~/components/section/search/TabsFacetFilter.vue'
import BadgeFilter from '~/components/search/BadgeFilter.vue'
import LocalisationFilter from '~/components/search/LocalisationFilter.vue'
import LocalisationMobileFilter from '~/components/search/LocalisationMobileFilter.vue'
import CommitmentFilter from '~/components/section/search/CommitmentFilter.vue'
import CommitmentMobileFilter from '~/components/section/search/CommitmentMobileFilter.vue'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import SearchFilter from '@/components/search/SearchFilter'
import FacetMobileFilter from '@/components/section/search/FacetMobileFilter'
import LocalisationSuggestions from '@/components/search/LocalisationSuggestions'

export default {
  components: {
    CardMission,
    FacetFilter,
    CommitmentFilter,
    CommitmentMobileFilter,
    TabsFacetFilter,
    BadgeFilter,
    LocalisationFilter,
    LocalisationMobileFilter,
    SearchFilter,
    FacetMobileFilter,
    LocalisationSuggestions
  },
  mixins: [AlgoliaQueryBuilder],
  data () {
    return {
      showMoreFilters: ['domaines', 'structure.reseaux.name', 'department_name'],
      isShowMoreFilters: false,
      isMobileFiltersOpen: false,
      isLocationDrawerFiltersOpen: false
    }
  },
  async fetch () {
    await this.search()
  },
  computed: {
    allShowMoreFiltersActive () {
      return this.showMoreFilters.every(facetName => this.$route.query[facetName])
    }
  },
  watch: {
    $route: '$fetch'
  },
  methods: {
    handleChangePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page }
      })
    },
    handleClickCard () {
      // window.plausible &&
      //   window.plausible('Click Card Missions - Liste résultat', {
      //     props: { isLogged: this.$store.getters.isLogged }
      //   })
    }
  }
}
</script>
