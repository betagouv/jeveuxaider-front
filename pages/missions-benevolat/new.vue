<template>
  <div>
    <Breadcrumb
      :items="[{ label: 'Missions de bénévolat', link: '/missions-benevolat' }]"
      class="container border-b-0"
    />
    <div v-if="searchResult" class="container mt-6 mb-12">
      <div class="flex flex-col space-y-12">
        <SectionHeading title="Trouver une mission de bénévolat" :secondary-title-bottom="`${searchResult.nbHits} missions disponibles`">
          <template #action>
            <div>
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
          <div class="bg-white px-6 py-6 shadow-xl rounded-xl grid grid-cols-4 my-4 divide-x">
            <div class="px-6">
              <div class="text-gray-500">
                Localisation
              </div>
            </div>
            <div class="px-6">
              <div class="text-gray-500 mb-1">
                Activités
              </div>
              <FacetFilter facet-name="activity.name" label="Activités" :facets="facetResults('activity.name')">
                <template #button="{ firstValueSelected, activeValuesCount }">
                  <div class="flex space-x-2 items-center">
                    <HandSolidIcon class="text-gray-500 h-4 w-4" />
                    <span v-if="!firstValueSelected" class="text-gray-900">Toutes</span>
                    <span v-else class="text-gray-900">
                      {{ firstValueSelected }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                    </span>
                  </div>
                </template>
              </FacetFilter>
            </div>
            <div class="px-6">
              <div class="text-gray-500 mb-1">
                Disponibilités
              </div>
              <CommitmentFilter>
                <template #button="{ activeValue }">
                  <div class="flex space-x-2 items-center">
                    <CalendarSolidIcon class="text-gray-500 h-4 w-4" />
                    <span class="text-gray-900">{{ activeValue || 'Toutes' }}</span>
                  </div>
                </template>
              </CommitmentFilter>
            </div>
            <div class="px-6">
              <Input
                icon="SearchIcon"
                :value="$route.query.search"
                name="search"
                placeholder="Mots clés..."
                clearable
                @input="handleChangeQuery"
              />
            </div>
          </div>

          <div class="my-4 flex items-center justify-center gap-3">
            <FacetFilter facet-name="structure.name" label="Organisations" :facets="facetResults('structure.name')">
              <template #button="{ firstValueSelected, activeValuesCount }">
                <Badge plain color="gray-light" size="sm" :extra-class="activeValuesCount ? '!border-jva-blue-500 hover:bg-[#D8E2FD]': 'hover:bg-[#F4F4F4]'">
                  <span v-if="!firstValueSelected">Organisations</span>
                  <span v-else class="text-jva-blue-500">
                    {{ firstValueSelected }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                  </span>
                </Badge>
              </template>
            </FacetFilter>
            <FacetFilter facet-name="domaines" label="Domaines" :facets="facetResults('domaines')">
              <template #button="{ firstValueSelected, activeValuesCount }">
                <Badge plain color="gray-light" size="sm" :extra-class="activeValuesCount ? '!border-jva-blue-500 hover:bg-[#D8E2FD]': 'hover:bg-[#F4F4F4]'">
                  <span v-if="!firstValueSelected">Domaines</span>
                  <span v-else class="text-jva-blue-500">
                    {{ firstValueSelected }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                  </span>
                </Badge>
              </template>
            </FacetFilter>
            <FacetFilter facet-name="structure.reseaux.name" label="Réseaux" :facets="facetResults('structure.reseaux.name')">
              <template #button="{ firstValueSelected, activeValuesCount }">
                <Badge plain color="gray-light" size="sm" :extra-class="activeValuesCount ? '!border-jva-blue-500 hover:bg-[#D8E2FD]': 'hover:bg-[#F4F4F4]'">
                  <span v-if="!firstValueSelected">Réseaux</span>
                  <span v-else class="text-jva-blue-500">
                    {{ firstValueSelected }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                  </span>
                </Badge>
              </template>
            </FacetFilter>
            <FacetFilter facet-name="department_name" label="Départements" :facets="facetResults('department_name')">
              <template #button="{ firstValueSelected, activeValuesCount }">
                <Badge plain color="gray-light" size="sm" :extra-class="activeValuesCount ? '!border-jva-blue-500 hover:bg-[#D8E2FD]': 'hover:bg-[#F4F4F4]'">
                  <span v-if="!firstValueSelected">Départements</span>
                  <span v-else class="text-jva-blue-500">
                    {{ firstValueSelected }}<span v-if="activeValuesCount > 1">, +{{ activeValuesCount - 1 }}</span>
                  </span>
                </Badge>
              </template>
            </FacetFilter>
          </div>

          <div class="mt-2 flex items-center justify-center">
            <Link v-if="hasActiveFilters" class="my-2 underline text-sm" @click.native="deleteAllFilters()">
              Effacer les filtres
            </Link>
          </div>
        </div>

        <div class="flex gap-10 flex-wrap mx-20 justify-center">
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
      </div>
    </div>
  </div>
</template>

<script>
import CardMission from '@/components/card/CardMission.vue'
import FacetFilter from '~/components/section/search/FacetFilter.vue'
import TabsFacetFilter from '~/components/section/search/TabsFacetFilter.vue'
import CommitmentFilter from '~/components/section/search/CommitmentFilter.vue'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  components: {
    CardMission,
    FacetFilter,
    CommitmentFilter,
    TabsFacetFilter
  },
  mixins: [AlgoliaQueryBuilder],
  methods: {
    handleChangeQuery (value) {
      this.addFilter('search', value)
    }
  }
}
</script>
