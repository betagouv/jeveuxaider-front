<template>
  <ContainerRightSidebar>
    <DrawerOrganisation :organisation-id="drawerOrganisationId" @close="drawerOrganisationId = null" @updated="$fetch()" />
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Tableau de bord', link: '/dashboard' }, { label: 'Organisations' }]"
      />
    </template>
    <template #sidebar>
      <BoxContext v-if="context" :key="`context-${$route.fullPath}`" :context="context" />
      <div class="flex flex-col gap-y-4 sticky top-8">
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
      <Input
        class="mt-8"
        name="search"
        placeholder="Rechercher une organisation (code postal, ville, id, ou rna)"
        icon="SearchIcon"
        variant="transparent"
        :value="$route.query['filter[search]']"
        clearable
        @input="changeFilter('filter[search]', $event)"
      />
      <div class="hidden lg:flex gap-x-4 gap-y-4 mt-2 text-sm flex-wrap">
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
          v-for="option in $labels.structure_workflow_states"
          :key="`${option.key}-${$route.fullPath}`"
          :option="{key: option.key, label:option.label}"
          :is-checked="$route.query['filter[state]'] && $route.query['filter[state]'] == option.key"
          variant="button"
          size="xs"
          transparent
          @change="changeFilter('filter[state]', option.key)"
        />
      </div>
      <div class="lg:hidden mt-4 gap-y-4 flex flex-col">
        <Input
          name="search"
          placeholder="Nom de l'organisation"
          icon="SearchIcon"
          variant="transparent"
          :value="$route.query['filter[search]']"
          @input="changeFilter('filter[search]', $event)"
        />
        <SelectAdvanced
          name="state"
          placeholder="Statut de l'organisation"
          :options="$labels.structure_workflow_states"
          :value="$route.query['filter[state]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[state]', $event)"
        />
      </div>

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

export default {
  components: {
    CardOrganisation,
    DrawerOrganisation,
    BoxContext
  },
  mixins: [QueryBuilder, MixinExport],
  layout: 'admin',
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
        append: 'places_left',
        include: 'domaines,illustrations,overrideImage1'
      },
      drawerOrganisationId: null
    }
  },
  methods: {

  }
}
</script>
