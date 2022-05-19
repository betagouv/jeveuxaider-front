<template>
  <div>
    <Breadcrumb
      :items="[{ label: 'Missions de bénévolat', link: '/missions-benevolat' }]"
      class="container border-b-0"
    />
    <div v-if="searchResult" class="container mt-6 mb-12">
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
            <div class="flex-none">
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

        <div class="flex flex-col">
          <div class="bg-white px-6 sm:py-6 shadow-xl rounded-xl grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:!divide-x">
            <div class="py-6 sm:py-0 sm:pb-6 lg:pb-0 lg:px-6">
              <div class="text-gray-500 mb-1">
                Localisation
              </div>
              <div class="">
                <LocalisationFilter v-if="!$route.query.type || $route.query.type == 'Mission en présentiel'" label="Saisissez votre ville" :ip-lat-lng="searchResult.aroundLatLng" />
                <div v-else>
                  À distance
                </div>
              </div>
            </div>

            <div class="py-6 sm:py-0 sm:pb-6 lg:pb-0 lg:px-6 sm:!border-l sm:pl-6 lg:!border-l-0">
              <div class="text-gray-500 mb-1">
                Activités
              </div>
              <FacetFilter facet-name="activity.name" label="Activités" :facets="facetResults('activity.name')" class="group">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <div class="flex space-x-2 items-center justify-between">
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
            <div class="py-6 sm:py-0 sm:pt-6 lg:pt-0 lg:px-6 sm:!border-t lg:!border-t-0">
              <div class="text-gray-500 mb-1">
                Disponibilités
              </div>
              <CommitmentFilter class="group">
                <template #button="{ activeValue }">
                  <div class="flex space-x-2 items-center justify-between">
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

          <div class="my-4 flex flex-wrap items-center justify-center gap-3">
            <FacetFilter facet-name="structure.name" label="Organisations" :facets="facetResults('structure.name')">
              <template #button="{ firstValueSelected, activeValuesCount }">
                <BadgeFilter :is-active="activeValuesCount">
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
                <BadgeFilter :is-active="activeValuesCount">
                  <span v-if="!firstValueSelected">Publics aidés</span>
                  <div v-else class="text-jva-blue-500 flex">
                    <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                    <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                  </div>
                </BadgeFilter>
              </template>
            </FacetFilter>

            <div
              class="rounded-full border text-sm flex items-center justify-center h-[34px] w-[34px]"
              :class="[{'text-gray-300 border-gray-300': showMoreFilters}, {'text-gray-600 hover:bg-gray-200 border-gray-500 cursor-pointer': !showMoreFilters}]"
              @click="showMoreFilters = true"
            >
              <PlusIcon />
            </div>

            <template v-if="showMoreFilters">
              <FacetFilter facet-name="domaines" label="Domaines" :facets="facetResults('domaines')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="activeValuesCount">
                    <span v-if="!firstValueSelected">Domaines</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilter>
              <FacetFilter facet-name="structure.reseaux.name" label="Réseaux" :facets="facetResults('structure.reseaux.name')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="activeValuesCount">
                    <span v-if="!firstValueSelected">Réseaux</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilter>
              <FacetFilter facet-name="department_name" label="Départements" :facets="facetResults('department_name')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <BadgeFilter :is-active="activeValuesCount">
                    <span v-if="!firstValueSelected">Départements</span>
                    <div v-else class="text-jva-blue-500 flex">
                      <span class="max-w-[170px] truncate">{{ firstValueSelected }}</span>
                      <span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </div>
                  </BadgeFilter>
                </template>
              </FacetFilter>
            </template>
          </div>

          <div class="mt-2 flex items-center justify-center">
            <Link v-if="hasActiveFilters" class="my-2 underline text-sm" @click.native="deleteAllFilters()">
              Effacer les filtres
            </Link>
          </div>
        </div>

        <div class="flex gap-8 flex-wrap justify-center">
          <nuxt-link
            v-for="item in searchResult.hits"
            :key="item.id"
            class="flex w-[300px] hover:bg-gray-50 focus:bg-gray-50 transition rounded-[10px]"
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

        <div>
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
  </div>
</template>

<script>
import CardMission from '@/components/card/CardMission.vue'
import FacetFilter from '~/components/section/search/FacetFilter.vue'
import TabsFacetFilter from '~/components/section/search/TabsFacetFilter.vue'
import BadgeFilter from '~/components/search/BadgeFilter.vue'
import LocalisationFilter from '~/components/search/LocalisationFilter.vue'
import CommitmentFilter from '~/components/section/search/CommitmentFilter.vue'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import SearchFilter from '@/components/search/SearchFilter'

export default {
  components: {
    CardMission,
    FacetFilter,
    CommitmentFilter,
    TabsFacetFilter,
    BadgeFilter,
    LocalisationFilter,
    SearchFilter
  },
  mixins: [AlgoliaQueryBuilder],
  data () {
    return {
      showMoreFilters: false
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
