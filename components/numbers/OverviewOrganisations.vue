<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Organisations ›"
      no-period
      class="mb-6"
      link="/admin/statistics/organisations"
    />
    <div
      v-if="statistics"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        :value="statistics.organisations"
        :title="`${$filters.pluralize(
          statistics.organisations,
          'Organisation',
          'Organisations',
          false
        )}`"
        :subtitle="`${$filters.pluralize(
          statistics.organisations,
          'inscrite',
          'inscrites',
          false
        )}`"
        link="/admin/statistics/organisations"
        infos-bulle="Nombre d’organisations inscrites depuis le début"
      />
      <CardStatistic
        :value="statistics.organisations_actives"
        :title="`${$filters.pluralize(
          statistics.organisations_actives,
          'Organisation',
          'Organisations',
          false
        )}`"
        :subtitle="`${$filters.pluralize(statistics.organisations, 'active', 'actives', false)}`"
        link="/admin/statistics/organisations"
        infos-bulle="Nombre d’organisations ayant au moins une mission en ligne"
      />
      <CardStatistic
        :value="statistics.territoires"
        v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
        :title="`${$filters.pluralize(statistics.territoires, 'Territoire', 'Territoires', false)}`"
        subtitle="en ligne"
        link="/admin/statistics/organisations"
        infos-bulle="Nombre de territoires en ligne en ce moment"
      />
      <CardStatistic
        :value="statistics.reseaux"
        v-if="['admin', 'referent'].includes($stores.auth.contextRole)"
        :title="`${$filters.pluralize(statistics.reseaux, 'Réseau', 'Réseaux', false)}`"
        subtitle="inscrits"
        link="/admin/statistics/organisations"
        infos-bulle="Nombre de réseaux inscrits en ce moment"
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

      await apiFetch('/statistics/overview-organisations', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.statistics = response
      })
    },
  },
})
</script>
