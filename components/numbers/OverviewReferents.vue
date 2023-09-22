<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Référents ›"
      link="/support/referents/waiting-actions"
      no-period
      class="mb-6"
    />
    <div
      v-if="overview"
      class="grid grid-cols-1 lg:grid-cols-4 border bg-gray-200 gap-[1px] overflow-hidden"
    >
      <CardStatistic
        :value="overview.referents_online_count"
        title="En ligne"
        infos-bulle="Connectés il y a moins de 10 minutes"
        :subtitle="`sur ${$numeral(overview.referents_count)} référents`"
      />
      <CardStatistic
        :value="overview.referents_inactive_count"
        title="Inactifs"
        infos-bulle="Non connectés depuis plus d'un mois"
        subtitle="depuis plus d'un mois"
      />
      <CardStatistic
        :value="overview.structures_need_to_be_treated_count"
        title="Organisations"
        subtitle="à modérer"
        infos-bulle="Nombre d'organisations à modérer (en attente de validation ou en cours de traitement)"
      />
      <CardStatistic
        :value="overview.structures_waiting_count"
        title="Organisations"
        subtitle="en attente de validation"
        infos-bulle="Nombre d'organisations en attente de validation"
      />
      <CardStatistic
        :value="overview.structures_in_progress_count"
        title="Organisations"
        subtitle="en cours de traitement"
        infos-bulle="Nombre d'organisations en cours de traitement"
      />
      <CardStatistic
        :value="overview.missions_need_to_be_treated_count"
        title="Missions"
        subtitle="à modérer"
        infos-bulle="Nombre de missions à modérer (en attente de validation ou en cours de traitement)"
      />
      <CardStatistic
        :value="overview.missions_waiting_count"
        title="Missions"
        subtitle="en attente de validation"
        infos-bulle="Nombre de missions en attente de validation"
      />
      <CardStatistic
        :value="overview.missions_in_progress_count"
        title="Missions"
        subtitle="en cours de traitement"
        infos-bulle="Nombre de missions en cours de traitement"
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
      overview: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true

      await apiFetch('/support/referents/overview').then((response) => {
        this.loading = false
        this.overview = response
      })
    },
  },
})
</script>
