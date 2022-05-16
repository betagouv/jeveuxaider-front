<template>
  <div>
    <Breadcrumb
      :items="[{ label: 'Missions de bénévolat', link: '/missions-benevolat' }]"
      class="container border-b-0"
    />
    <div class="container">
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
      <Button v-if="hasActiveFilters" size="xs" variant="white" @click.native="deleteAllFilters()">
        Effacer les filtres
      </Button>
      <div v-if="searchResult.facets" class=" grid grid-cols-3 gap-4 mt-6">
        <FacetFilter label="Template" facet-name="template_subtitle" :facets="facetResults('template_subtitle')" />
        <FacetFilter label="Domaine" facet-name="domaines" :facets="facetResults('domaines')" />
        <FacetFilter label="Département" facet-name="department_name" :facets="facetResults('department_name')" />
      </div>
      <div class="flex gap-4 flex-wrap">
        <nuxt-link
          v-for="item in searchResult.hits"
          :key="item.id"
          class="flex flex-col flex-1 w-[300px] hover:bg-gray-50 focus:bg-gray-50 transition rounded-[10px]"
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
import FacetFilter from '@/components/section/search/FacetFilter.vue'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  components: {
    CardMission,
    FacetFilter
  },
  mixins: [AlgoliaQueryBuilder],
  data () {
    return {
      searchResult: {},
      searchFacetResults: [],
      indexName: 'local_jeremy_covid_missions',
      availableFacets: ['type', 'template_subtitle', 'department_name', 'domaines']
    }
  },
  async fetch () {
    // main search
    const queries = [{
      indexName: this.indexName,
      query: '',
      params: {
        facetFilters: this.activeFacets,
        facets: ['template_subtitle', 'department_name', 'domaines']
      }
    }]
    // search for each active facet
    this.activeFacets.forEach((facetFilter, key) => {
      const facetName = facetFilter[0].split(':')[0]
      queries.push({
        indexName: this.indexName,
        query: '',
        params: {
          facetFilters: this.activeFacets.filter(facetFilter => facetFilter[0].split(':')[0] != facetName),
          facets: [facetName],
          hitsPerPage: 1,
          attributesToRetrieve: [],
          attributesToSnippet: [],
          attributesToHighlight: [],
          clickAnalytics: false,
          analytics: false

        }
      })
    })

    const { results } = await this.$algolia.multipleQueries(queries)

    this.searchResult = results[0]
    this.searchFacetResults = results.slice(1)
  },
  computed: {
    activeFacets () {
      let activeFacets = this.availableFacets.filter(facetName => this.$route.query[facetName])

      const hasFacetTypeActive = activeFacets.includes('type')

      activeFacets = activeFacets.map((facetName) => {
        return this.$route.query[facetName].split('|').map((facetValue) => {
          return `${facetName}:${facetValue}`
        })
      })

      if (!hasFacetTypeActive) {
        activeFacets.push(['type:Mission en présentiel'])
      }

      return activeFacets
    }
  },
  watch: {
    $route: '$fetch'
  },
  methods: {
    facetResults (facetName) {
      const searchFacetResult = this.searchFacetResults.filter((searchFacetResult) => {
        return Object.keys(searchFacetResult.facets).includes(facetName)
      })[0]

      return searchFacetResult ? searchFacetResult.facets[facetName] : this.searchResult.facets[facetName]
    }
  }
}
</script>
