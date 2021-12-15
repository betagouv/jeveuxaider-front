<template>
  <ContainerRightSidebar>
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Organisations' }]"
      />
    </template>
    <template #sidebar>
      <div class="flex flex-col gap-y-4 sticky top-8">
        <div>
          <Input
            name="search"
            placeholder="Nom de l'organisation"
            icon="SearchIcon"
            variant="transparent"
            :value="$route.query['filter[search]']"
            @input="changeFilter('filter[search]', $event)"
          />
          <div class="text-xs text-gray-500 mt-1 px-2">
            Rechercher avec le <span class="font-semibold">Code postal, la Ville, l'Id, ou le Rna</span>
          </div>
        </div>
        <SelectAdvanced
          name="statut_juridique"
          placeholder="Statut juridique"
          :options="structure_legal_status"
          :value="$route.query['filter[statut_juridique]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[statut_juridique]', $event)"
        />
        <SelectAdvanced
          name="department"
          placeholder="Département"
          :options="departments"
          :value="$route.query['filter[department]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[department]', $event)"
        />
      </div>
    </template>
    <div>
      <Heading as="h1" :level="1">
        {{ queryResult.total }} organisations
      </Heading>
      <div class="hidden lg:flex gap-x-4 mt-6 text-sm">
        <button :class="['px-4 py-1', !$route.query['filter[state]'] ? 'shadow bg-white rounded-full text-gray-900 font-semibold' : 'text-gray-500 font-medium']" @click="deleteFilter('filter[state]')">
          Toutes
        </button>
        <button
          v-for="option in structure_states"
          :key="option.key"
          :class="['px-4 py-1', $route.query['filter[state]'] && $route.query['filter[state]'] == option.key ? 'shadow bg-white rounded-full text-gray-900 font-semibold' : 'text-gray-500 font-medium']"
          @click="changeFilter('filter[state]', option.key)"
        >
          {{ option.label }}
        </button>
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
          :options="structure_states"
          :value="$route.query['filter[state]']"
          variant="transparent"
          clearable
          @input="changeFilter('filter[state]', $event)"
        />
      </div>

      <div class="my-6">
        <div v-for="structure in queryResult.data" :key="structure.id">
          <div class="flex justify-between font-gray-800 h-60">
            <div>{{ structure.id }} : {{ structure.name }}</div><div>{{ structure.rna }} {{ structure.city }}</div>
          </div>
        </div>
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
import labels from '@/utils/labels.json'

export default {
  layout: 'dashboard',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent', 'referent_regional'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {
      structure_states: labels.structure_workflow_states,
      structure_legal_status: labels.structure_legal_status,
      departments: labels.departments.map((option) => { return { key: option.key, label: `${option.key} - ${option.label}` } }),
      queryResult: {}
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('/structures', {
      params: this.$route.query
    })
    this.queryResult = data
    window.scrollTo(0, 0)
  },
  watch: {
    $route: '$fetch'
  },
  methods: {
    changeFilter (filterName, filterValue) {
      if (this.$route.query[filterName] && this.$route.query[filterName] === filterValue) {
        this.deleteFilter(filterName)
      } else if (filterValue === '' || filterValue === null) {
        this.deleteFilter(filterName)
      } else {
        this.$router.push({
          path: this.$route.path,
          query: { ...this.$route.query, [filterName]: filterValue, page: undefined }
        })
      }
    },
    deleteFilter (filterName) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, [filterName]: undefined, page: undefined }
      })
    },
    changePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, page }
      })
    }
  }
}
</script>
