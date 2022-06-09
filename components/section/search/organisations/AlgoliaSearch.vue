<template>
  <div>
    <div v-if="$store.state.algoliaSearch.results" class="container md:px-8 lg:mt-6 mb-12">
      <div class="flex flex-col space-y-6 sm:space-y-12">
        <SectionHeading
          title="Trouver une association"
          :secondary-title-bottom="`${$options.filters.formatNumber($store.state.algoliaSearch.results.nbHits)} ${$options.filters.pluralize(
            $store.state.algoliaSearch.results.nbHits,
            'résultat',
            'résultats',
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
          <template v-for="item in $store.state.algoliaSearch.results.hits">
            <nuxt-link
              :key="item.id"
              class="flex min-w-0 hover:bg-gray-50 focus:bg-gray-50 transition rounded-[10px]"
              :to="`/organisations/${item.slug}`"
              @click.native="handleClickCard"
            >
              <CardOrganisation :organisation="item" footer-key="missions_available_count" />
            </nuxt-link>
          </template>
        </div>

        <Pagination
          :current-page="$store.state.algoliaSearch.results.page + 1"
          :total-rows="$store.state.algoliaSearch.results.nbHits"
          :per-page="20"
          :max-pages="10"
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
  methods: {
    handleChangePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page }
      })
    },
    handleClickCard () {
      window.plausible &&
        window.plausible('Click Card Organisations - Liste résultat', {
          props: { isLogged: this.$store.getters.isLogged }
        })
    }
  }
}
</script>

<style>

</style>
