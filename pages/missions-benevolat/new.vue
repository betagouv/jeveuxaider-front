<template>
  <div>
    <Breadcrumb
      :items="[{ label: 'Missions de bénévolat', link: '/missions-benevolat' }]"
      class="container border-b-0"
    />
    <div class="container">
      <h1 class="text-xl sm:text-2xl lg:text-3xl font-black">
        Trouver une mission de bénévolat
      </h1>
      <div>{{ search.nbHits }} missions disponibles</div>
      <div>
        <input id="presentiel" v-model="picked" type="radio" value="Mission en présentiel" @click="addFilter('type', 'Mission en présentiel')">
        <label for="presentiel">Près de chez moi</label>
        <input id="a_distance" v-model="picked" type="radio" value="Mission à distance" @click="addFilter('type', 'Mission à distance')">
        <label for="a_distance">En télébénévolat</label>
      </div>
      <FacetFilter v-if="search.facets" label="Template" facet-name="template_subtitle" :facets="search.facets.template_subtitle" />

      <div class="flex gap-4 flex-wrap">
        <nuxt-link
          v-for="item in search.hits"
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

export default {
  components: {
    CardMission,
    FacetFilter
  },
  data () {
    return {
      search: [],
      picked: null
    }
  },
  async fetch () {
    // Get parameters from URL
    const algoliaQuery = this.urlToAlgoliaQuery()
    const search = await this.$algolia.search('', {
      facetFilters: algoliaQuery.facetFilters,
      facets: ['template_subtitle']
    })
    console.log(this.$algolia)
    const searchForFacetValues = await this.$algolia.searchForFacetValues('template_subtitle')
    console.log(searchForFacetValues)
    this.search = search
  },
  watch: {
    $route: '$fetch'
  },
  methods: {
    addFilter (filterName, filterValue) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, [filterName]: filterValue, page: undefined }
      })
    },
    handleClickCard () {
      // window.plausible &&
      // window.plausible('Click Card Missions - Liste résultat', {
      //   props: { isLogged: this.$store.getters.isLogged }
      // })
    },
    urlToAlgoliaQuery () {
      const algoliaQuery = {}

      console.log('route query', this.$route.query)
      let facetFilters = ['type', 'template_subtitle']
      // On garde seulement les filtres dans l'url
      facetFilters = facetFilters.filter(facetName => this.$route.query[facetName])

      // On formate la query pour Algolia
      algoliaQuery.facetFilters = facetFilters.map((facetName) => {
        return this.$route.query[facetName].split('|').map((facetValue) => {
          return `${facetName}:${facetValue}`
        })
      })
      console.log(algoliaQuery)
      return algoliaQuery
    }
  }
}
</script>
