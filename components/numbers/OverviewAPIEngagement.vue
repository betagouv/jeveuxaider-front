<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="API Engagement ›"
      link="/admin/statistics/api-engagement"
      no-params
      class="mb-6"
    />
    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        :value="statistics.incomingTrafic"
        title="Trafic entrant"
        subtitle="vers JVA"
        infos-bulle="Trafic entrant vers Je veux aider depuis les partenaires"
      />

      <CardStatistic
        :value="statistics.incomingApplies"
        title="Mises en relation générées"
        subtitle="chez JVA"
        infos-bulle="Mises en relation générées par le trafic provenant des partenaires"
      />
      <CardStatistic
        :value="statistics.outgoingTrafic"
        title="Trafic sortant"
        subtitle="vers les partenaires"
        infos-bulle="Trafic sortant de Je veux aider vers les partenaires"
      />
      <CardStatistic
        :value="statistics.outgoingApplies"
        title="Mises en relation générées"
        subtitle="chez les partenaires"
        infos-bulle="Mises en relation générées chez les partenaires suite à une redirection depuis Je veux aider"
      />
    </div>
  </BaseBox>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic.vue'
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default defineNuxtComponent({
  components: {
    CardStatistic,
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

      await apiFetch('/statistics/overview-api-engagement', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
