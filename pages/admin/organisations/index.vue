<template>
  <ContainerRightSidebar>
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Organisations' }]"
      />
    </template>
    <template #sidebar>
      <div>
        <div>
          <Input
            name="lastname"
            placeholder="Nom de l'organisation"
            icon="SearchIcon"
            :value="$route.query['filter[search]']"
            @input="changeFilter('filter[search]', $event)"
          />
        </div>
        <div>Statut juridique</div>
      </div>
    </template>
    <div>
      <Heading as="h1" :level="1">
        {{ queryResult.total }} organisations
      </Heading>
      <div class="flex gap-x-4 mt-6 text-sm">
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

      <div class="my-6">
        <div v-for="structure in queryResult.data" :key="structure.id">
          <div class="flex justify-between font-gray-800">
            <div>{{ structure.id }} : {{ structure.name }}</div><div>{{ structure.rna }} {{ structure.city }}</div>
          </div>
        </div>
      </div>

      <Pagination
        class="pr-6"
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
  components: {
  },
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
      queryResult: {}
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('/structures', {
      params: this.$route.query
    })
    this.queryResult = data
  },
  watch: {
    $route: '$fetch'
  },
  methods: {
    changeFilter (filterName, filterValue) {
      if (this.$route.query[filterName] && this.$route.query[filterName] === filterValue) {
        this.deleteFilter(filterName)
      } else if (filterValue === '') {
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
