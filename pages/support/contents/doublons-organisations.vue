<template>
  <div class="flex flex-col gap-12">
    <ClientOnly>
      <Teleport to="#teleport-breadcrumb">
        <Breadcrumb
          :links="[
            { text: 'Support', to: '/support' },
            { text: 'Contents' },
            { text: 'Doublons organisations' },
          ]"
        />
      </Teleport>
    </ClientOnly>

    <BaseSectionHeading
      secondary-title-bottom="Liste des organisations validées en double"
      :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
        queryResult.total,
        'doublon d\'organisations',
        'doublons d\'organisations',
        false
      )}`"
      :loading="queryLoading"
    />

    <SearchFilters @reset-filters="deleteAllFilters">
      <DsfrInput
        type="search"
        size="lg"
        placeholder="Recherche par mots clés..."
        icon="RiSearchLine"
        :modelValue="$route.query['search']"
        @update:modelValue="changeFilter('search', $event)"
      />
    </SearchFilters>

    <div class="space-y-4">
      <DoublonOrganisationListItem
        v-for="organisation in queryResult.data"
        :key="organisation.trimname"
        :organisation="organisation"
      />
    </div>

    <Pagination
      :current-page="queryResult.current_page"
      :total-rows="queryResult.total"
      :per-page="queryResult.per_page"
      @page-change="changePage"
    />
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import QueryBuilder from '@/mixins/query-builder'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Tag from '@/components/dsfr/Tag.vue'
import OnlineIndicator from '@/components/custom/OnlineIndicator.vue'
import DrawerProfile from '@/components/drawer/DrawerProfile.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import QueryResultSummary from '@/components/custom/QueryResultSummary.vue'
import DoublonOrganisationListItem from '@/components/support/DoublonOrganisationListItem.vue'

export default defineNuxtComponent({
  components: {
    DoublonOrganisationListItem,
    Breadcrumb,
    SearchFilters,
    Tag,
    OnlineIndicator,
    DrawerProfile,
    Pagination,
    QueryResultSummary,
  },
  mixins: [QueryBuilder],
  setup() {
    definePageMeta({
      layout: 'support',
      middleware: ['admin'],
    })
  },
  data() {
    return {
      endpoint: '/support/contents/doublons-organisations',
      loading: true,
      //   drawerProfileId: null,
    }
  },
  computed: {},
  methods: {},
})
</script>

<style></style>
