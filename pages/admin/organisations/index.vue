<template>
  <ContainerRightSidebar>
    <DrawerOrganisation :organisation-id="drawerOrganisationId" @close="drawerOrganisationId = null" @updated="$fetch()" @refetch="$fetch()" />
    <template #breadcrumb>
      <Breadcrumb
        :links="[
          { text: 'Tableau de bord', to: '/dashboard' },
          { text: 'Organisations' }
        ]"
      />
    </template>
    <template #sidebar>
      <BoxContext v-if="context" :key="`context-${$route.fullPath}`" :context="context" />
      <div class="flex flex-col gap-y-4 sticky top-8">
        <InputAutocomplete
          v-if="['admin'].includes($store.getters.contextRole)"
          :value="$route.query['filter[reseaux.name]']"
          icon="SearchIcon"
          name="autocomplete"
          placeholder="Réseau"
          :options="autocompleteOptionsReseaux"
          variant="transparent"
          @fetch-suggestions="onFetchSuggestionsReseaux"
          @selected="changeFilter('filter[reseaux.name]', $event ? $event.name : undefined)"
        />
        <SelectAdvanced
          name="statut_juridique"
          placeholder="Statut juridique"
          :options="$labels.structure_legal_status"
          :value="$route.query['filter[statut_juridique]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[statut_juridique]', $event)"
        />
        <SelectAdvanced
          name="department"
          placeholder="Département"
          :options="$labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } })"
          :value="$route.query['filter[department]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[department]', $event)"
        />
        <SelectAdvanced
          :key="`state-${$route.fullPath}`"
          name="state"
          placeholder="Statut"
          :options="$labels.structure_workflow_states"
          :value="$route.query['filter[state]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[state]', $event)"
        />
      </div>
    </template>
    <div>
      <SectionHeading
        :title="`${$options.filters.formatNumber(queryResult.total)} ${$options.filters.pluralize(
          queryResult.total,
          'organisation',
          'organisations',
          false
        )}`"
      >
        <template #action>
          <div class="">
            <Button
              type="secondary"
              icon="RiDownload2Line"
              :loading="exportLoading"
              @click.native="handleExport"
            >
              Exporter
            </Button>
          </div>
        </template>
      </SectionHeading>
      <SearchFilters class="my-8">
        <Input
          name="search"
          placeholder="Rechercher une organisation (ville, id, ou rna)"
          icon="SearchIcon"
          variant="transparent"
          :value="$route.query['filter[search]']"
          clearable
          @input="changeFilter('filter[search]', $event)"
        />
        <template #prefilters>
          <Tag
            :key="`toutes-${$route.fullPath}`"
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
            :key="`state-en-attente-validation-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="$route.query['filter[state]'] && $route.query['filter[state]'] == 'En attente de validation'"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[state]', 'En attente de validation')"
          >
            En attente de validation
          </Tag>

          <Tag
            :key="`state-en-cours-traitement-${$route.fullPath}`"
            as="button"
            size="md"
            context="selectable"
            :is-selected="$route.query['filter[state]'] && $route.query['filter[state]'] == 'En cours de traitement'"
            is-selected-class="border-gray-50 bg-gray-50"
            @click.native="changeFilter('filter[state]', 'En cours de traitement')"
          >
            En cours de traitement
          </Tag>
          <FilterSelectAdvanced
            key="sort"
            name="sort"
            :options="[
              { key: '-created_at', label: 'Les plus récentes' },
              { key: 'created_at', label: 'Les plus anciennes' },
              { key: '-updated_at', label: 'Date de denière modification' },
              { key: '-missions_count', label: 'Nombre de missions proposées' },
              { key: '-places_left', label: 'Nombre de bénévoles recherchés' },
            ]"
            :value="$route.query['sort']"
            placeholder="Trier par"
            options-class="!min-w-[300px]"
            @input="changeFilter('sort', $event)"
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
  </ContainerRightSidebar>
</template>

<script>
import QueryBuilder from '@/mixins/query-builder'
import CardOrganisation from '@/components/card/CardOrganisation.vue'
import DrawerOrganisation from '@/components/drawer/DrawerOrganisation.vue'
import MixinExport from '@/mixins/export'
import BoxContext from '@/components/section/BoxContext.vue'
import SearchFilters from '@/components/custom/SearchFilters.vue'
import Pagination from '@/components/dsfr/Pagination.vue'
import Tag from '@/components/dsfr/Tag.vue'
import Button from '@/components/dsfr/Button.vue'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    CardOrganisation,
    DrawerOrganisation,
    BoxContext,
    SearchFilters,
    Pagination,
    Tag,
    Button,
    Breadcrumb
  },
  mixins: [QueryBuilder, MixinExport],
  middleware: 'authenticated',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {
      loading: false,
      endpoint: '/structures',
      exportEndpoint: '/export/structures',
      queryParams: {
        append: ['places_left', 'completion_rate'],
        include: 'domaines,reseaux,illustrations,overrideImage1'
      },
      drawerOrganisationId: null,
      autocompleteOptionsReseaux: []
    }
  },
  methods: {
    async onFetchSuggestionsReseaux (value) {
      const res = await this.$axios.get('/reseaux', {
        params: {
          'filter[search]': value,
          pagination: 20
        }
      })
      this.autocompleteOptionsReseaux = res.data.data
    }
  }
}
</script>
