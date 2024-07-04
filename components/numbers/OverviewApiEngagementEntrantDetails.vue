<template>
  <div v-if="statistics">
    <BaseBox padding="sm" :loading="loading" loading-text="Récupération des partenaires...">
      <BoxHeadingStatistics title="Vue détaillée du trafic entrant" class="mb-6" />
      <BaseTable>
        <BaseTableHead>
          <BaseTableHeadCell>Partenaires</BaseTableHeadCell>
          <BaseTableHeadCell>Redirections</BaseTableHeadCell>
          <BaseTableHeadCell>Candidatures</BaseTableHeadCell>
        </BaseTableHead>
        <BaseTableBody>
          <BaseTableRow v-for="(item, y) in results" :key="y">
            <BaseTableRowCell>
              <span class="capitalize text-gray-600 font-semibold">
                {{ item.name }}
              </span>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <span>{{ $numeral(item.redirections) }}</span>
            </BaseTableRowCell>
            <BaseTableRowCell>
              <span> {{ $numeral(item.applications) }}</span>
            </BaseTableRowCell>
          </BaseTableRow>
        </BaseTableBody>
      </BaseTable>
    </BaseBox>
  </div>
</template>

<script>
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default defineNuxtComponent({
  components: {
    BoxHeadingStatistics,
  },
  data() {
    return {
      loading: true,
      statistics: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true

      await apiFetch('/statistics/overview-api-engagement-entrant-details', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
  computed: {
    results() {
      return Object.values(
        _merge(
          _keyBy(this.statistics.redirections, 'name'),
          _keyBy(this.statistics.applications, 'name')
        )
      )
    },
  },
})
</script>
