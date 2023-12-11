<template>
  <BaseContainerRightSidebar>
    <DrawerOrganisation
      :organisation-id="drawerOrganisationId"
      @close="drawerOrganisationId = null"
      @updated="fetch()"
      @refetch="fetch()"
    />
    <template #breadcrumb>
      <Breadcrumb
        :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Organisations' }]"
      />
    </template>
    <template #sidebar>
      <BoxContext v-if="context" :key="`context-${$route.fullPath}`" :context="context" />
      <div class="flex flex-col gap-y-4 sticky top-8">
        <BaseInputAutocomplete
          v-if="['admin'].includes($stores.auth.contextRole)"
          :modelValue="$route.query['filter[reseaux.name]']"
          icon="RiSearchLine"
          name="autocomplete"
          placeholder="Réseau"
          :options="autocompleteOptionsReseaux"
          variant="transparent"
          @fetch-suggestions="onFetchSuggestionsReseaux"
          @selected="changeFilter('filter[reseaux.name]', $event ? $event.name : undefined)"
        />
        <BaseSelectAdvanced
          name="statut_juridique"
          placeholder="Statut juridique"
          :options="$labels.structure_legal_status"
          :modelValue="$route.query['filter[statut_juridique]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[statut_juridique]', $event)"
        />
        <BaseSelectAdvanced
          name="department"
          placeholder="Département"
          :options="
            $labels.departments.map((option) => {
              return {
                key: option.key,
                label: `${option.key} - ${option.label}`,
              }
            })
          "
          :modelValue="$route.query['filter[department]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[department]', $event)"
        />
        <BaseSelectAdvanced
          :key="`state-${$route.fullPath}`"
          name="state"
          placeholder="Statut"
          :options="$labels.structure_workflow_states"
          :modelValue="$route.query['filter[state]']"
          variant="transparent"
          clearable
          @update:modelValue="changeFilter('filter[state]', $event)"
        />
      </div>
    </template>
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
      <SearchFilters class="my-8">
        <BaseInput
          name="search"
          placeholder="Rechercher une organisation (ville, id, ou rna)"
          icon="RiSearchLine"
          variant="transparent"
          :modelValue="$route.query['filter[search]']"
          clearable
          @update:modelValue="changeFilter('filter[search]', $event)"
        />
        <template #prefilters>
          <DsfrTag
            :key="`toutes-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="hasActiveFilters()"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="deleteAllFilters"
          >
            Toutes
          </DsfrTag>

          <DsfrTag
            :key="`state-en-attente-validation-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="
              $route.query['filter[state]'] &&
              $route.query['filter[state]'] == 'En attente de validation'
            "
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[state]', 'En attente de validation')"
          >
            En attente de validation
          </DsfrTag>

          <DsfrTag
            :key="`state-en-cours-traitement-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="
              $route.query['filter[state]'] &&
              $route.query['filter[state]'] == 'En cours de traitement'
            "
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[state]', 'En cours de traitement')"
          >
            En cours de traitement
          </DsfrTag>
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
            options-class="!min-w-[300px]"
            @update:modelValue="changeFilter('sort', $event)"
          />
        </template>
      </SearchFilters>

      <div class="my-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardOrganisation
          v-for="organisation in queryResult.data"
          :key="organisation.id"
          class="cursor-pointer"
          :organisation="organisation"
          show-infos
          show-state
          tabindex="0"
          @click.native="drawerOrganisationId = organisation.id"
        />
      </div>

      <Pagination
        class="mt-12"
        :current-page="queryResult.current_page"
        :total-rows="queryResult.total"
        :per-page="queryResult.per_page"
        @page-change="changePage"
      />
    </div>
  </BaseContainerRightSidebar>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardOrganisation from '@/components/card/CardOrganisation.vue'
import DrawerOrganisation from '@/components/drawer/DrawerOrganisation.vue'
import MixinExport from '@/mixins/export'
import BoxContext from '@/components/section/BoxContext.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    CardOrganisation,
    DrawerOrganisation,
    BoxContext,
    SearchFilters,
    Pagination,
    Breadcrumb,
  },
  mixins: [QueryBuilder, MixinExport],
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
      autocompleteOptionsReseaux: [],
    }
  },
  methods: {
    async onFetchSuggestionsReseaux(value) {
      const res = await apiFetch('/reseaux', {
        params: {
          'filter[search]': value,
          pagination: 20,
        },
      })
      this.autocompleteOptionsReseaux = res.data
    },
  },
})
</script>
