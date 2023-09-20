<template>
  <BaseBox
    padding="sm"
    :loading="loading"
    loading-text="Récupération des statistiques..."
    class="lg:col-span-2"
  >
    <BoxHeadingStatistics title="L’activité relative aux missions en un coup d’oeil" class="mb-6" />
    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        :value="statistics.missions"
        :title="`${$filters.pluralize(statistics.missions, 'Mission', 'Missions', false)}`"
        :subtitle="`${$filters.pluralize(statistics.missions, 'créée', 'créées', false)}`"
        link="/admin/missions"
        infos-bulle="Correspond aux missions créées sur la période"
      />
      <CardStatistic
        :value="statistics.missions_validated_and_over"
        :title="`${$filters.pluralize(
          statistics.missions_validated_and_over,
          'Mission',
          'Missions',
          false
        )}`"
        :subtitle="`${$filters.pluralize(
          statistics.missions_validated_and_over,
          'validée ou terminée',
          'validées ou terminées',
          false
        )}`"
        link="/admin/missions"
        infos-bulle="Correspond aux missions créées sur la période, qui sont validées ou bien terminées"
      />
      <CardStatistic
        :value="statistics.missions_participations_max_sum"
        :title="`${$filters.pluralize(
          statistics.missions_participations_max_sum,
          'Place',
          'Places',
          false
        )}`"
        :subtitle="`${$filters.pluralize(
          statistics.missions_participations_max_sum,
          'proposée',
          'proposées',
          false
        )}`"
        infos-bulle="Correspond aux places proposées sur la période sur des missions, qui ont été validées ou bien terminées"
      />
      <CardStatistic
        :value="statistics.missions_snu"
        :title="`${$filters.pluralize(
          statistics.missions_snu,
          'Mission SNU-MIG',
          'Missions SNU-MIG',
          false
        )}`"
        :subtitle="`${$filters.pluralize(statistics.missions_snu, 'créée', 'créées', false)}`"
        link="/admin/missions"
        infos-bulle="Correspond aux missions proposées en MIG créées sur la période, qui sont validées ou bien terminées"
      />
      <CardStatistic
        :value="statistics.missions_snu_participations_max_sum"
        :title="`${$filters.pluralize(
          statistics.missions_snu_participations_max_sum,
          'Place SNU-MIG',
          'Places SNU-MIG',
          false
        )}`"
        :subtitle="`${$filters.pluralize(
          statistics.missions_snu_participations_max_sum,
          'proposée',
          'proposées',
          false
        )}`"
        infos-bulle="Correspond aux places proposées en MIG sur la période, pour des missions validées ou bien terminées"
      />
    </div>
  </BaseBox>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'
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
      await apiFetch('/statistics/global/missions', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
