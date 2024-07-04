<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Délais d'engagement"
      class="mb-6"
      infos-bulle="Délais d'engagement sur la période entre l'inscription d'un utilisateur et sa première mise en relation"
    />
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount
        color="bg-green-900"
        label="Moins de une minute"
        :count="statistics.LESS_THAN_1_MIN"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="bg-green-700"
        label="Moins de 5 minutes"
        :count="statistics.LESS_THAN_5_MIN"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="bg-green-500"
        label="Moins de une heure"
        :count="statistics.LESS_THAN_1_HOUR"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="bg-green-300"
        label="Moins de un jour"
        :count="statistics.LESS_THAN_1_DAY"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="bg-green-100"
        label="Moins de 5 jours"
        :count="statistics.LESS_THAN_5_DAYS"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="bg-green-50"
        label="Plus de 5 jours"
        :count="statistics.OTHER"
        :total="total"
        display="count_percent"
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
      await apiFetch('/statistics/participations-delays-by-registrations', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
  computed: {
    total() {
      return this.statistics ? Object.values(this.statistics).reduce((a, b) => a + b, 0) : 0
    },
  },
})
</script>
