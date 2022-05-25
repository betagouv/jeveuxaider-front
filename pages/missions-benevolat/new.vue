<template>
  <div>
    <Breadcrumb
      :items="[{ label: 'Missions de bénévolat', link: '/missions-benevolat' }]"
      class="container md:px-8 border-b-0"
    />

    <!-- Drawers for mobile -->
    <DrawerLeftSearchMissionsFilters
      :is-open="isDrawerLeftSearchMissionsFilters"
      @close="isDrawerLeftSearchMissionsFilters = false"
    />
    <DrawerLeftSearchMissionsLocalisation
      :is-open="isDrawerLeftSearchMissionsLocalisation"
      @close="isDrawerLeftSearchMissionsLocalisation = false"
    />

    <div v-if="$store.state.algoliaSearchMissions.results" class="container md:px-8 lg:mt-6 mb-12">
      <div class="flex flex-col space-y-6 sm:space-y-12">
        <SectionHeading
          title="Trouver une mission de bénévolat"
          :secondary-title-bottom="`${$options.filters.formatNumber($store.state.algoliaSearchMissions.results.nbHits)} ${$options.filters.pluralize(
            $store.state.algoliaSearchMissions.results.nbHits,
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
              :ip-lat-lng="$store.state.algoliaSearchMissions.results.aroundLatLng"
              @open="isDrawerLeftSearchMissionsLocalisation = true"
            />
          </div>
          <div class="flex justify-center mt-4">
            <BadgeFilter @click.native="isDrawerLeftSearchMissionsFilters = true">
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
                <LocalisationFilter v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'" label="Saisissez votre ville" :ip-lat-lng="$store.state.algoliaSearchMissions.results.aroundLatLng" />
                <div v-else>
                  <div class="flex space-x-2 items-center">
                    <DesktopComputerIcon class="h-5 w-5 transition-opacity opacity-50 group-hover:opacity-100" />
                    <span class="font-bold">Depuis chez moi</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="py-6 sm:py-0 sm:pb-6 lg:pb-0 lg:px-6 sm:!border-l sm:pl-6 lg:!border-l-0">
              <div class="text-gray-500 mb-1">
                Activités
              </div>
              <FacetFilterToggle facet-name="activity.name" label="Activités" :facets="facetResults('activity.name')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <div class="flex space-x-2 items-center justify-between group">
                    <div class="flex space-x-2 items-center">
                      <HandIcon class="h-5 w-5 transition-opacity opacity-50 group-hover:opacity-100" />
                      <span v-if="!firstValueSelected">Toutes</span>
                      <span v-else class="font-bold">
                        {{ firstValueSelected }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                      </span>
                    </div>
                    <ChevronDownIcon class="text-gray-500 h-4 w-4 group-hover:text-gray-900" />
                  </div>
                </template>
              </FacetFilterToggle>
            </div>
            <div class="py-6 sm:py-0 sm:pt-6 sm:pr-6 lg:pt-0 lg:px-6 sm:!border-t lg:!border-t-0">
              <div class="text-gray-500 mb-1">
                Disponibilités
              </div>
              <CommitmentFilter>
                <template #button="{ activeValue }">
                  <div class="flex space-x-2 items-center justify-between group">
                    <div class="flex space-x-2 items-center truncate">
                      <ClockIcon class="h-5 w-5 transition-opacity opacity-50 group-hover:opacity-100" />
                      <div :class="['truncate', {'font-bold': activeValue }]">
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
                Recherche
              </div>
              <SearchFilter />
            </div>
          </div>

          <div class="lg:flex justify-between items-center mt-8 lg:mb-4">
            <div class="hidden sm:flex flex-wrap items-center justify-start gap-3 lg:ml-6 xl:ml-12">
              <FacetFilterToggle facet-name="structure.name" label="Organisations" :facets="facetResults('structure.name')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="!!activeValuesCount">
                    <span v-if="!firstValueSelected">Organisations</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilterToggle>

              <FacetFilterToggle facet-name="publics_beneficiaires" label="Publics aidés" :facets="facetResults('publics_beneficiaires')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="!!activeValuesCount">
                    <span v-if="!firstValueSelected">Publics aidés</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilterToggle>

              <FacetFilterToggle facet-name="domaines" label="Domaines" :facets="facetResults('domaines')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="!!activeValuesCount">
                    <span v-if="!firstValueSelected">Domaines</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilterToggle>

              <FacetFilterToggle facet-name="structure.reseaux.name" label="Réseaux" :facets="facetResults('structure.reseaux.name')" options-class="right-0 md:left-0">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="!!activeValuesCount">
                    <span v-if="!firstValueSelected">Réseaux</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilterToggle>

              <FacetFilterToggle v-if="$route.query.type != 'Mission à distance'" facet-name="department_name" label="Départements" :facets="facetResults('department_name')" options-class="right-0 lg:left-0">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="!!activeValuesCount">
                    <span v-if="!firstValueSelected">Départements</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilterToggle>
            </div>

            <div class="hidden sm:flex lg:items-center lg:justify-center mt-4 lg:mt-0 lg:mr-6 xl:mr-12">
              <Link
                class="uppercase hover:underline text-sm"
                :link-class="[{'pointer-events-none opacity-0': !hasActiveFilters}]"
                @click.native="deleteAllFilters()"
              >
                Réinitialiser
              </Link>
            </div>
          </div>
        </div>

        <div v-if="$store.state.algoliaSearchMissions.results.nbHits == 0" class="text-center">
          Il n'y a aucun résultat avec les filtres actuels.<br>
          <Link
            link-class="justify-center hover:underline"
            @click.native="deleteAllFilters()"
          >
            Réinitialiser les filtres
          </Link>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-6 xl:gap-8 xl:max-w-5xl mx-auto">
          <nuxt-link
            v-for="item in $store.state.algoliaSearchMissions.results.hits"
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
          :current-page="$store.state.algoliaSearchMissions.results.page + 1"
          :total-rows="$store.state.algoliaSearchMissions.results.nbHits"
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
import FacetFilterToggle from '~/components/section/search/FacetFilterToggle.vue'
import TabsFacetFilter from '~/components/section/search/TabsFacetFilter.vue'
import BadgeFilter from '~/components/search/BadgeFilter.vue'
import LocalisationFilter from '~/components/search/LocalisationFilter.vue'
import LocalisationMobileFilter from '~/components/search/LocalisationMobileFilter.vue'
import CommitmentFilter from '~/components/section/search/CommitmentFilter.vue'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import SearchFilter from '@/components/search/SearchFilter.vue'
import DrawerLeftSearchMissionsFilters from '@/components/drawer/DrawerLeftSearchMissionsFilters.vue'
import DrawerLeftSearchMissionsLocalisation from '@/components/drawer/DrawerLeftSearchMissionsLocalisation.vue'

export default {
  components: {
    CardMission,
    FacetFilterToggle,
    CommitmentFilter,
    TabsFacetFilter,
    BadgeFilter,
    LocalisationFilter,
    LocalisationMobileFilter,
    SearchFilter,
    DrawerLeftSearchMissionsFilters,
    DrawerLeftSearchMissionsLocalisation
  },
  mixins: [AlgoliaQueryBuilder],
  data () {
    return {
      isDrawerLeftSearchMissionsFilters: false,
      isDrawerLeftSearchMissionsLocalisation: false
    }
  },
  async fetch () {
    await this.search()
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
