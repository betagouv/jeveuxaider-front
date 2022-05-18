<template>
  <div>
    <Breadcrumb
      :items="[{ label: 'Missions de bénévolat', link: '/missions-benevolat' }]"
      class="container border-b-0"
    />
    <div v-if="searchResult" class="container">
      <div class="flex justify-between">
        <div>
          <h1 class="text-xl sm:text-2xl lg:text-3xl font-black">
            Trouver une mission de bénévolat
          </h1>
          <div>{{ searchResult.nbHits }} missions disponibles</div>
        </div>

        <div>
          <input
            id="presentiel"
            type="radio"
            value="Mission en présentiel"
            name="type"
            :checked="isActiveFilter('type', 'Mission en présentiel') || !$route.query.type"
            @click="addFilter('type', 'Mission en présentiel')"
          >
          <label for="presentiel">Près de chez moi</label>
          <input
            id="a_distance"
            type="radio"
            value="Mission à distance"
            name="type"
            :checked="isActiveFilter('type', 'Mission à distance')"
            @click="addFilter('type', 'Mission à distance')"
          >
          <label for="a_distance">Bénévolat en ligne</label>
        </div>
      </div>
      <Button v-if="hasActiveFilters" class="my-2" size="xs" variant="white" @click.native="deleteAllFilters()">
        Effacer les filtres
      </Button>
      <div class="bg-white px-6 py-4 shadow rounded grid grid-cols-4 my-4">
        <div class="text-gray-500">
          Localisation
        </div>
        <div>
          <div class="text-gray-500">
            Activités
          </div>
          <FacetFilter facet-name="activity.name" :facets="facetResults('activity.name')">
            <template #button="{ activeValues, firstValueSelected }">
              <div class="text-gray-900">
                <span v-if="activeValues.length == 0">Toutes</span>
                <span v-else>
                  {{ firstValueSelected }}<span v-if="activeValues.length > 1">, +{{ activeValues.length - 1 }}</span>
                </span>
              </div>
            </template>
          </FacetFilter>
        </div>
        <div class="text-gray-500">
          Disponibilités
          <CommitmentFilter>
            <template #button="{ activeValue }">
              <div class="text-gray-900">
                {{ activeValue || 'Toutes' }}
              </div>
            </template>
          </CommitmentFilter>
        </div>
        <div class="text-gray-500">
          Mots-clés
          <Input
            :value="$route.query.search"
            name="search"
            placeholder="Mots clés"
            clearable
            @input="handleChangeQuery"
          />
        </div>
      </div>
      <div class="my-4 flex items-center justify-center gap-3">
        <FacetFilter facet-name="structure.name" :facets="facetResults('structure.name')">
          <template #button="{ activeValues, firstValueSelected }">
            <Badge plain>
              <span v-if="activeValues.length == 0">Organisations</span>
              <span v-else>
                {{ firstValueSelected }}<span v-if="activeValues.length > 1">, +{{ activeValues.length - 1 }}</span>
              </span>
            </Badge>
          </template>
        </FacetFilter>
        <FacetFilter facet-name="domaines" :facets="facetResults('domaines')">
          <template #button="{ activeValues, firstValueSelected }">
            <Badge plain>
              <span v-if="activeValues.length == 0">Domaines</span>
              <span v-else>
                {{ firstValueSelected }}<span v-if="activeValues.length > 1">, +{{ activeValues.length - 1 }}</span>
              </span>
            </Badge>
          </template>
        </FacetFilter>
        <FacetFilter facet-name="structure.reseaux.name" :facets="facetResults('structure.reseaux.name')">
          <template #button="{ activeValues, firstValueSelected }">
            <Badge plain>
              <span v-if="activeValues.length == 0">Réseaux</span>
              <span v-else>
                {{ firstValueSelected }}<span v-if="activeValues.length > 1">, +{{ activeValues.length - 1 }}</span>
              </span>
            </Badge>
          </template>
        </FacetFilter>
        <FacetFilter facet-name="department_name" :facets="facetResults('department_name')">
          <template #button="{ activeValues, firstValueSelected }">
            <Badge plain>
              <span v-if="activeValues.length == 0">Départements</span>
              <span v-else>
                {{ firstValueSelected }}<span v-if="activeValues.length > 1">, +{{ activeValues.length - 1 }}</span>
              </span>
            </Badge>
          </template>
        </FacetFilter>
      </div>
      <div class="flex gap-10 flex-wrap mx-20 justify-center">
        <nuxt-link
          v-for="item in searchResult.hits"
          :key="item.id"
          class="flex flex-col flex-1 max-w-[300px] hover:bg-gray-50 focus:bg-gray-50 transition rounded-[10px]"
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
</template>

<script>
import CardMission from '@/components/card/CardMission.vue'
import FacetFilter from '~/components/section/search/FacetFilter.vue'
import CommitmentFilter from '~/components/section/search/CommitmentFilter.vue'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  components: {
    CardMission,
    FacetFilter,
    CommitmentFilter
  },
  mixins: [AlgoliaQueryBuilder],
  methods: {
    handleChangeQuery (value) {
      this.addFilter('search', value)
    }
  }
}
</script>
