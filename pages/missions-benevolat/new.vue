<template>
  <div>
    <Breadcrumb
      :items="[{ label: 'Missions de bénévolat', link: '/missions-benevolat' }]"
      class="container md:px-8 border-b-0"
    />

    <!-- Drawers for mobile -->
    <template v-if="$store.state.algoliaSearchMissions.results">
      <DrawerLeftSearchMissionsFilters
        :is-open="isDrawerLeftSearchMissionsFilters"
        @close="isDrawerLeftSearchMissionsFilters = false"
      />
      <DrawerLeftSearchMissionsLocalisation
        :is-open="isDrawerLeftSearchMissionsLocalisation"
        @close="isDrawerLeftSearchMissionsLocalisation = false"
      />
    </template>

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
          <ToggleDrawerLeftSearchMissionsLocalisation @click.native="isDrawerLeftSearchMissionsLocalisation = true" />
          <div class="flex justify-center mt-4">
            <BadgeFilter @click.native="isDrawerLeftSearchMissionsFilters = true">
              Plus de filtres
            </BadgeFilter>
          </div>
        </div>

        <div class="hidden sm:flex sm:flex-col relative z-10">
          <PrimaryFilters />
          <SecondaryFilters />
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
import TabsFacetFilter from '~/components/section/search/TabsFacetFilter.vue'
import BadgeFilter from '~/components/search/BadgeFilter.vue'
import ToggleDrawerLeftSearchMissionsLocalisation from '~/components/search/ToggleDrawerLeftSearchMissionsLocalisation.vue'
import AlgoliaQueryBuilder from '@/mixins/algolia-query-builder'
import DrawerLeftSearchMissionsFilters from '@/components/drawer/DrawerLeftSearchMissionsFilters.vue'
import DrawerLeftSearchMissionsLocalisation from '@/components/drawer/DrawerLeftSearchMissionsLocalisation.vue'
import PrimaryFilters from '~/components/section/search/missions/PrimaryFilters.vue'
import SecondaryFilters from '~/components/section/search/missions/SecondaryFilters.vue'

export default {
  components: {
    CardMission,
    TabsFacetFilter,
    BadgeFilter,
    ToggleDrawerLeftSearchMissionsLocalisation,
    DrawerLeftSearchMissionsFilters,
    DrawerLeftSearchMissionsLocalisation,
    PrimaryFilters,
    SecondaryFilters
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
