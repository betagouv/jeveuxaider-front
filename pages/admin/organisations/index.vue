<template>
  <div class="container">
    <DrawerOrganisation
      :organisation-id="drawerOrganisationId"
      @close="drawerOrganisationId = null"
      @updated="fetch()"
      @refetch="fetch()"
    />

    <Breadcrumb
      :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Organisations' }]"
    />

    <div>
      <BaseSectionHeading
        :title="`${$numeral(queryResult.total)} ${$filters.pluralize(
          queryResult.total,
          'organisation',
          'organisations',
          false
        )}`"
        :loading="queryLoading"
      >
        <template #action>
          <div>
            <DsfrButton
              v-if="['admin', 'referent', 'tete_de_reseau'].includes($stores.auth.contextRole)"
              type="secondary"
              icon="RiDownload2Line"
              :disabled="queryResult?.total === 0"
              :loading="exportLoading"
              @click.native="handleExport"
            >
              Exporter
            </DsfrButton>
          </div>
        </template>
      </BaseSectionHeading>
      <SearchFilters class="mt-8 mb-12" @reset-filters="deleteAllFilters">
        <DsfrInput
          type="search"
          size="lg"
          placeholder="Rechercher une organisation (ville, id, ou rna)"
          icon="RiSearchLine"
          :modelValue="$route.query['filter[search]']"
          @update:modelValue="changeFilter('filter[search]', $event)"
        />
        <template #prefilters>
          <div class="flex gap-3 items-center">
            <span class="text-base">Trier par</span>
            <BaseFilterSelectAdvanced
              key="sort"
              name="sort"
              :options="[
                { key: '-created_at', label: 'Les plus récentes' },
                { key: 'created_at', label: 'Les plus anciennes' },
                { key: '-updated_at', label: 'Date de denière modification' },
                { key: '-missions_count', label: 'Nombre de missions proposées' },
                { key: '-places_left', label: 'Nombre de bénévoles recherchés' },
              ]"
              :modelValue="$route.query['sort']"
              placeholder="Trier par"
              options-class="!min-w-[280px]"
              @update:modelValue="changeFilter('sort', $event)"
            />
            <div aria-hidden class="bg-gray-600 mx-1 w-[1px] h-6" />
          </div>

          <template v-for="visibleFilter in visibleFilters" :key="visibleFilter">
            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'state'"
              name="state"
              :options="$labels.structure_workflow_states"
              :modelValue="$route.query['filter[state]']?.split(',')"
              placeholder="Statut"
              multiple
              @update:modelValue="changeFilter('filter[state]', $event, true)"
            />

            <BaseFilterInputAutocomplete
              v-if="visibleFilter === 'reseaux.id'"
              v-model="selectedReseau"
              label="Réseau"
              name="autocomplete-reseau"
              :options="autocompleteOptionsReseaux"
              :loading="loadingFetchReseaux"
              @fetch-suggestions="onFetchSuggestionsReseaux"
              @selected="onSelectReseau"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'statut_juridique'"
              name="statut_juridique"
              :options="$labels.structure_legal_status"
              :modelValue="$route.query['filter[statut_juridique]']"
              placeholder="Statut juridique"
              @update:modelValue="changeFilter('filter[statut_juridique]', $event)"
            />

            <BaseFilterSelectAdvanced
              v-if="visibleFilter === 'department'"
              name="department"
              :options="
                $labels.departments.map((option) => {
                  return {
                    key: option.key,
                    label: `${option.key} - ${option.label}`,
                  }
                })
              "
              :modelValue="$route.query['filter[department]']?.split(',')"
              :searchable="true"
              placeholder="Département"
              multiple
              @update:modelValue="changeFilter('filter[department]', $event, true)"
            />
          </template>

          <DsfrTag
            v-if="visibleFilters.length < allFilters.length"
            key="view-all-filter"
            context="clickable"
            icon="RiAddLine"
            :icon-only="true"
            size="md"
            as="button"
            title="Afficher plus de filtres"
            @click="showAllFilters = true"
          />
        </template>
      </SearchFilters>

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CardOrganisation
          v-for="organisation in queryResult.data"
          :key="organisation.id"
          class="cursor-pointer"
          :organisation="organisation"
          show-infos
          show-state
          tabindex="0"
          @click.left="drawerOrganisationId = organisation.id"
          @click.middle="
            navigateTo(`/admin/organisations/${organisation.id}`, { open: { target: '_blank' } })
          "
        />
      </div>

      <CustomEmptyState v-if="queryResult.total === 0 && !queryLoading" />

      <Pagination
        class="my-12"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </div>
  </div>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardOrganisation from '@/components/card/CardOrganisation.vue'
import DrawerOrganisation from '@/components/drawer/DrawerOrganisation.vue'
import MixinExport from '@/mixins/export'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'
import MixinFiltersVisibility from '@/mixins/filters-visibility'
import MixinSuggestionsFilters from '@/mixins/suggestions-filters'

export default defineNuxtComponent({
  components: {
    CardOrganisation,
    DrawerOrganisation,
    SearchFilters,
    Pagination,
    Breadcrumb,
  },
  mixins: [QueryBuilder, MixinExport, MixinFiltersVisibility, MixinSuggestionsFilters],
  setup() {
    const { $stores } = useNuxtApp()

    definePageMeta({
      middleware: ['authenticated'],
    })

    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau'].includes(
        $stores.auth.contextRole
      )
    ) {
      return showError({ statusCode: 403 })
    }
  },
  computed: {
    allFilters() {
      return [
        'state',
        ['admin'].includes(this.$stores.auth.contextRole) && 'reseaux.id',
        'statut_juridique',
        'department',
      ].filter((f) => f)
    },
    alwaysVisibleFilters() {
      return this.allFilters
    },
  },
  data() {
    return {
      loading: false,
      endpoint: '/structures',
      exportEndpoint: '/export/structures',
      queryParams: {
        append: 'places_left,completion_rate',
        include: 'domaines,reseaux,illustrations,overrideImage1',
      },
      drawerOrganisationId: null,
    }
  },
  methods: {},
})
</script>
