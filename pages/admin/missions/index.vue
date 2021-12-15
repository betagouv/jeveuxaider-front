<template>
  <ContainerRightSidebar>
    <template #breadcrumb>
      <Breadcrumb
        :items="[{ label: 'Missions' }]"
      />
    </template>
    <template #sidebar>
      <div class="flex flex-col gap-y-4 sticky top-8">
        <div>
          @todo
        </div>
      </div>
    </template>
    <div>
      <Heading as="h1" :level="1">
        {{ queryResult.total }} missions
      </Heading>

      <div class="my-6">
        <div v-for="mission in queryResult.data" :key="mission.id">
          <div class="flex justify-between font-gray-800">
            <div>{{ mission.id }} : {{ mission.name }}</div>
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
export default {
  layout: 'dashboard',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent', 'referent_regional', 'responsable'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  },
  data () {
    return {
      queryResult: {}
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('/missions', {
      params: this.$route.query
    })
    this.queryResult = data
    // window.scrollTo(0, 0)
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
