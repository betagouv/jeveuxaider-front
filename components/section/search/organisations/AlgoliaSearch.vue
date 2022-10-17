<template>
  <div>
    <div v-if="$store.state.algoliaSearch.results" class="container md:px-8 lg:mt-6 mb-12">
      <div class="flex flex-col space-y-6 sm:space-y-12">
        <SectionHeading
          title="Trouver une organisation près de chez vous"
          :secondary-title-bottom="`${$options.filters.formatNumber($store.state.algoliaSearch.results.nbHits)} ${$options.filters.pluralize(
            $store.state.algoliaSearch.results.nbHits,
            'organisation est inscrite sur JeVeuxAider.gouv.fr',
            'organisations sont inscrites sur JeVeuxAider.gouv.fr',
            false
          )}`"
        />

        <div class="sm:hidden">
          <PrimaryMobileFilters />
          <SecondaryMobileFilters />
        </div>

        <div class="hidden sm:flex sm:flex-col relative z-10">
          <PrimaryFilters />
          <SecondaryFilters :filters-name="secondaryFilters" />
        </div>

        <div v-if="$store.state.algoliaSearch.results.nbHits == 0" class="text-center">
          Il n'y a aucun résultat avec les filtres actuels.<br>
          <Link
            link-class="justify-center hover:underline"
            @click.native="deleteAllFilters()"
          >
            Réinitialiser les filtres
          </Link>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-6 xl:gap-8 xl:max-w-5xl mx-auto">
          <div
            v-for="item in $store.state.algoliaSearch.results.hits"
            :key="item.id"
            class="flex min-w-0 hover:bg-gray-50 focus:bg-gray-50 transition cursor-pointer"
          >
            <CardOrganisation
              :organisation="item"
              footer-key="missions_available_count"
              @click.native="handleClickCard(item)"
            />
          </div>
        </div>

        <Pagination
          :current-page="$store.state.algoliaSearch.results.page + 1"
          :total-rows="$store.state.algoliaSearch.results.nbHits > 1000 ? 1000 : $store.state.algoliaSearch.results.nbHits"
          :per-page="18"
          :max-pages="10"
          :with-first-page="false"
          :with-last-page="false"
          @page-change="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script>

import CardOrganisation from '@/components/card/CardOrganisation.vue'
import AlgoliaOrganisationsQueryBuilder from '@/mixins/algolia-organisations-query-builder'
import PrimaryFilters from '~/components/section/search/organisations/PrimaryFilters.vue'
import SecondaryFilters from '~/components/section/search/organisations/SecondaryFilters.vue'
import PrimaryMobileFilters from '~/components/section/search/organisations/PrimaryMobileFilters.vue'
import SecondaryMobileFilters from '~/components/section/search/organisations/SecondaryMobileFilters.vue'

export default {
  components: {
    CardOrganisation,
    PrimaryFilters,
    SecondaryFilters,
    PrimaryMobileFilters,
    SecondaryMobileFilters
  },
  mixins: [AlgoliaOrganisationsQueryBuilder],
  props: {
    initialFilters: {
      type: String,
      default: ''
    },
    secondaryFilters: {
      type: Array,
      default: () => {
        return [
          'department_name'
        ]
      }
    }
  },
  async fetch () {
    await this.search()
  },
  watch: {
    $route: '$fetch'
  },
  created () {
    this.$store.commit('algoliaSearch/setIndexKey', 'organisationsIndex')
    this.$store.commit('algoliaSearch/setIndexName', this.$config.algolia.organisationsIndex)
    this.$store.commit('algoliaSearch/setInitialFilters', this.initialFilters)
  },
  beforeDestroy () {
    this.$store.dispatch('algoliaSearch/reset')
  },
  methods: {
    handleChangePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page }
      })
    },
    handleClickCard (organisation) {
      window.plausible &&
        window.plausible('Click Card Organisations - Liste résultat', {
          props: { isLogged: this.$store.getters.isLogged }
        })

      if (organisation.statut_juridique === 'Association') {
        this.$router.push(`/organisations/${organisation.slug}`)
      } else {
        this.$router.push(`/missions-benevolat?structure.name=${organisation.name}`)
      }
    }
  }
}
</script>

<style>

</style>
