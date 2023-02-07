<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Retours d\'expériences' },
        ]"
      />
    </template>
    <template #header>
      <SectionHeading :title="`Retours d\'expériences`" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`" />
    </template>
    <template #left>
      <Box>
        <Heading as="h2" :level="2" class="mb-8 font-extrabold">
          {{ $options.filters.formatNumber(queryResult.total) }} {{ $options.filters.pluralize(
            queryResult.total,
            'retour',
            'retours',
            false) }}
        </Heading>
        <SearchFilters class="mb-8">
          <Input
            name="search"
            placeholder="Rechercher par mots clés, email, nom"
            icon="SearchIcon"
            variant="transparent"
            :value="$route.query['filter[search]']"
            clearable
            @input="changeFilter('filter[search]', $event)"
          />
          <template #prefilters>
            <Tag
              :key="`tous-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="hasActiveFilters()"
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="deleteAllFilters"
            >
              Tous
            </Tag>

            <Tag
              :key="`published-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'true'"
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="changeFilter('filter[is_published]', 'true')"
            >
              En ligne
            </Tag>

            <Tag
              :key="`unpublished-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="$route.query['filter[is_published]'] && $route.query['filter[is_published]'] == 'false'"
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="changeFilter('filter[is_published]', 'false')"
            >
              Hors ligne
            </Tag>

            <FilterSelectAdvanced
              :key="`state-${$route.fullPath}`"
              name="state"
              placeholder="Toutes les notes"
              :options="$labels.testimonial_grade"
              :value="$route.query['filter[grade]']"
              clearable
              @input="changeFilter('filter[grade]', $event)"
            />
          </template>
        </SearchFilters>
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <CardTemoignage
            v-for="temoignage in queryResult.data"
            :key="temoignage.id"
            class="cursor-pointer"
            :temoignage="temoignage"
            @click.native="drawerTemoignageId = temoignage.id"
          />
        </div>

        <Pagination
          class="mt-8"
          :current-page="queryResult.current_page"
          :total-rows="queryResult.total"
          :per-page="queryResult.per_page"
          @page-change="changePage"
        />

        <DrawerTemoignage :temoignage-id="drawerTemoignageId" @close="drawerTemoignageId = null" @updated="$fetch()" @refetch="$fetch()" />
      </Box>
    </template>
    <template #right>
      <MoreNumbers v-if="['admin','referent'].includes($store.getters.contextRole)" />
      <GuideLinks />
      <HelpCenter />
    </template>
  </Container2Cols>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import GuideLinks from '@/components/section/dashboard/GuideLinks'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import CardTemoignage from '@/components/card/CardTemoignage.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Tag from '@/components/dsfr/Tag.vue'
import DrawerTemoignage from '@/components/drawer/DrawerTemoignage.vue'

export default {
  components: {
    DrawerTemoignage,
    HelpCenter,
    GuideLinks,
    MoreNumbers,
    Pagination,
    Breadcrumb,
    CardTemoignage,
    SearchFilters,
    Tag
  },
  mixins: [QueryBuilder],
  middleware: 'authenticated',
  data () {
    return {
      loading: false,
      endpoint: '/temoignages',
      queryParams: {
      },
      drawerTemoignageId: null

    }
  },
  methods: {

  }
}
</script>
