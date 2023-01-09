<template>
  <Container2Cols>
    <template #breadcrumb>
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Notes' },
        ]"
      />
    </template>
    <template #header>
      <SectionHeading :title="`Toutes les notes`" :secondary-title="`Bonjour ${$store.state.auth.user.profile.first_name }`" />
    </template>
    <template #left>
      <Box>
        <Heading as="h2" :level="2" class="mb-8 font-extrabold">
          {{ $options.filters.formatNumber(queryResult.total) }} {{ $options.filters.pluralize(
            queryResult.total,
            'note',
            'notes',
            false) }}
        </Heading>
        <SearchFilters class="mb-8">
          <Input
            name="search"
            placeholder="Rechercher par mots clés, nom"
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
              Toutes
            </Tag>

            <Tag
              :key="`mine-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="$route.query['filter[mine]'] && $route.query['filter[mine]'] == '1'"
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="changeFilter('filter[mine]', '1')"
            >
              Mes notes
            </Tag>

            <Tag
              :key="`type-organisations-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="$route.query['filter[type]'] && $route.query['filter[type]'] == 'organisations'"
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="changeFilter('filter[type]', 'organisations')"
            >
              Organisations
            </Tag>

            <Tag
              :key="`type-missions-${$route.fullPath}`"
              as="button"
              size="md"
              context="selectable"
              :is-selected="$route.query['filter[type]'] && $route.query['filter[type]'] == 'missions'"
              is-selected-class="border-gray-50 bg-gray-50"
              @click.native="changeFilter('filter[type]', 'missions')"
            >
              Missions
            </Tag>
          </template>
        </SearchFilters>
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <CardNote
            v-for="note in queryResult.data"
            :key="note.id"
            class=""
            :note="note"
          />
        </div>

        <Pagination
          class="mt-8"
          :current-page="queryResult.current_page"
          :total-rows="queryResult.total"
          :per-page="queryResult.per_page"
          @page-change="changePage"
        />
      </Box>
    </template>
    <template #right>
      <MoreNumbers />
      <GuideLinks />
      <HelpCenter />
    </template>
  </Container2Cols>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import HelpCenter from '@/components/section/dashboard/HelpCenter'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import CardNote from '@/components/card/CardNote.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Tag from '@/components/dsfr/Tag.vue'
import MoreNumbers from '@/components/section/dashboard/MoreNumbers'
import GuideLinks from '@/components/section/dashboard/GuideLinks'

export default {
  components: {
    HelpCenter,
    Pagination,
    Breadcrumb,
    CardNote,
    SearchFilters,
    Tag,
    MoreNumbers,
    GuideLinks
  },
  mixins: [QueryBuilder],
  middleware: 'authenticated',
  data () {
    return {
      loading: false,
      endpoint: '/notes',
      queryParams: {
      }
    }
  },
  methods: {

  }
}
</script>
