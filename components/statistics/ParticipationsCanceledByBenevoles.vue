<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Motifs des participations annulées par les bénévoles"
      class="mb-6"
      infos-bulle="Répartition des motifs d'annulation des bénévoles sur la période"
    />
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount
        color="no_response"
        label="L'organisation ne répond pas"
        :count="statistics.no_response"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="requirements_not_fulfilled"
        label="La mission ne correspond pas à mes attentes"
        :count="statistics.requirements_not_fulfilled"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="not_available"
        label="Je ne suis plus disponible"
        :count="statistics.not_available"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="other"
        label="Autres"
        :count="statistics.other"
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
      await apiFetch('/statistics/public/participations-canceled-by-benevoles', {
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
