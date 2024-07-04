<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Répartition des bénévoles en fonction de leur âge"
      class="mb-6"
      infos-bulle="Répartition par âge des bénévoles inscrits sur la période sélectionnée"
    />
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount
        color="bg-yellow-900"
        label="Entre 16 et 19 ans"
        :count="statistics.BETWEEN_16_AND_20"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-800"
        label="Entre 20 et 24 ans"
        :count="statistics.BETWEEN_20_AND_25"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-700"
        label="Entre 25 et 29 ans"
        :count="statistics.BETWEEN_25_AND_30"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-600"
        label="Entre 30 et 34 ans"
        :count="statistics.BETWEEN_30_AND_35"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-500"
        label="Entre 35 et 39 ans"
        :count="statistics.BETWEEN_35_AND_40"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-400"
        label="Entre 40 et 44 ans"
        :count="statistics.BETWEEN_40_AND_45"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-300"
        label="Entre 45 et 49 ans"
        :count="statistics.BETWEEN_45_AND_50"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-200"
        label="Entre 50 et 54 ans"
        :count="statistics.BETWEEN_50_AND_55"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-100"
        label="Entre 55 et 59 ans"
        :count="statistics.BETWEEN_55_AND_60"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-100"
        label="Entre 60 et 64 ans"
        :count="statistics.BETWEEN_60_AND_65"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-100"
        label="Entre 65 et 69 ans"
        :count="statistics.BETWEEN_65_AND_70"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-100"
        label="Entre 70 et 74 ans"
        :count="statistics.BETWEEN_70_AND_75"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-100"
        label="Entre 75 et 79 ans"
        :count="statistics.BETWEEN_75_AND_80"
        display="count_percent"
        :total="total"
      />
      <ListItemCount
        color="bg-yellow-50"
        label="Plus de 80 ans"
        :count="statistics.MORE_THAN_80"
        display="count_percent"
        :total="total"
      />
    </div>
  </BaseBox>
</template>

<script>
import ListItemCount from '@/components/custom/ListItemCount.vue'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default defineNuxtComponent({
  components: {
    ListItemCount,
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
      await apiFetch('/statistics/public/utilisateurs-by-age', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
  computed: {
    total() {
      return this.statistics ? Object.values(this.statistics).reduce((a, b) => a + b) : 0
    },
  },
})
</script>
