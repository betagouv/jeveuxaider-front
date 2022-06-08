
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'

export default {
  mixins: [AlgoliaQueryBuilder],
  computed: {
    searchParameters () {
      return {
        aroundLatLngViaIP: this.$route.query.type != 'Mission à distance' && !this.$route.query.aroundLatLng,
        aroundLatLng: this.$route.query.aroundLatLng || '',
        aroundRadius: this.$route.query.aroundLatLng ? 35000 : 'all',
        query: this.$route.query.search || '',
        page: this.$route.query.page ? (this.$route.query.page - 1) : 0,
        facetFilters: this.activeFacets,
        facets: ['*'],
        filters: this.getInitialFilters(),
        numericFilters: this.activeNumericFilters,
        hitsPerPage: this.$route.query.type === 'Mission à distance' ? 18 : 17
      }
    },
    activeFacets () {
      let activeFacets = this.availableFacets.filter(facetName => this.$route.query[facetName])

      activeFacets = activeFacets.map((facetName) => {
        return this.$route.query[facetName].split('|').map((facetValue) => {
          return `${facetName}:${facetValue}`
        })
      })

      if (!this.$route.query.type) {
        activeFacets.push(['type:Mission en présentiel'])
      }

      return activeFacets
    },
    activeMoreFacets () {
      return this.availableFacets.filter(facetName => this.$route.query[facetName] && !['type'].includes(facetName))
    }
  },
  methods: {
    getAvailableFacets () {
      return ['type', 'activity.name', 'structure.name', 'department_name', 'domaines', 'structure.reseaux.name', 'publics_beneficiaires', 'template_subtitle']
    },
    getInitialFilters () {
      return ''
    },
    getAvailableNumericFilters () {
      return ['commitment__total']
    }
    // onFetchAlgoliaResults (results) {
    //   this.$store.commit('algoliaSearchMissions/setResults', results[0])
    //   this.$store.commit('algoliaSearchMissions/setFacetsResults', results.slice(1))
    // }
    // async searchForFacetValues (facetName, facetQuery) {
    //   return await this.$algolia.missionsIndex.searchForFacetValues(facetName, facetQuery, {
    //     ...this.searchParameters,
    //     facetFilters: this.activeFacets.filter(facetFilter => facetFilter[0].split(':')[0] != facetName)
    //   })
    // }
  }
}
