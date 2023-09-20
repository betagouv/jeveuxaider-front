<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Motifs des participations refusées"
      class="mb-6"
      infos-bulle="Répartition des motifs de refus pour les mises en relation reçues sur la période sélectionnée"
    />
    <div v-if="statistics" class="flex flex-col gap-2">
      <ListItemCount
        color="no_response"
        label="Le bénévole ne répond pas"
        :count="statistics.no_response"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="requirements_not_fulfilled"
        label="Le bénévole ne correspond pas aux besoins"
        :count="statistics.requirements_not_fulfilled"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="change_mind"
        label="Le bénévole a changé d'avis."
        :count="statistics.change_mind"
        :total="total"
        display="count_percent"
      />
      <ListItemCount
        color="mission_terminated"
        label="La mission est terminée."
        :count="statistics.mission_terminated"
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
      await apiFetch('/statistics/public/participations-refused-by-responsables', {
        params: this.$stores.statistics.params,
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
