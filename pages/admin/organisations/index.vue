<template>
  <ContainerRightSidebar>
    <DrawerOrganisation :organisation-id="drawerOrganisationId" @close="drawerOrganisationId = null" @updated="$fetch()" @refetch="$fetch()" />
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Tableau de bord', link: '/dashboard' }, { label: 'Organisations' }]"
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
            <Button icon="DownloadIcon" variant="white" size="lg" :loading="exportLoading" @click.native="handleExport">
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
          <Checkbox
            :key="`toutes-${$route.fullPath}`"
            :option="{key: 'toutes', label:'Toutes'}"
            :is-checked="hasActiveFilters()"
            variant="button"
            size="xs"
            transparent
            @change="deleteAllFilters()"
          />
          <Checkbox
            :key="`state-en-attente-validation-${$route.fullPath}`"
            :option="{key: 'en-attente-validation', label:'En attente de validation'}"
            :is-checked="$route.query['filter[state]'] && $route.query['filter[state]'] == 'En attente de validation'"
            variant="button"
            size="xs"
            transparent
            @change="changeFilter('filter[state]', 'En attente de validation')"
          />
          <Checkbox
            :key="`state-en-cours-traitement-${$route.fullPath}`"
            :option="{key: 'en-cours-traitement', label:'En cours de traitement'}"
            :is-checked="$route.query['filter[state]'] && $route.query['filter[state]'] == 'En cours de traitement'"
            variant="button"
            size="xs"
            transparent
            @change="changeFilter('filter[state]', 'En cours de traitement')"
          />
        </template>
        <template #sorts>
          <Sort
            key="sort"
            name="sort"
            transparent
            :value="$route.query['sort'] ? $route.query['sort'] : '-created_at'"
            :options="[
              { key: '-created_at', label: 'Les plus récentes' },
              { key: 'created_at', label: 'Les plus anciennes' },
              { key: '-updated_at', label: 'Date de denière modification' },
              { key: '-missions_count', label: 'Nombre de missions proposées' },
              { key: '-places_left', label: 'Nombre de bénévoles recherchés' },
            ]"
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
          @click.native="drawerOrganisationId = organisation.id"
        />
      </div>

      <Pagination
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

export default {
  components: {
    CardOrganisation,
    DrawerOrganisation,
    BoxContext,
    SearchFilters
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
