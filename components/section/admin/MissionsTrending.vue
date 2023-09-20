<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des missions">
    <BoxHeadingStatistics
      title="TOP 5 des missions"
      class="mb-6"
      infos-bulle="Liste des missions ayant reçu le plus de mises en relation sur la période"
    />

    <BaseStackedList :divided="false">
      <BaseStackedListItem
        v-for="(mission, i) in missions"
        :key="i"
        :icon="medal(i)"
        :icon-class="[{ 'text-4xl': i < 3 }, { 'text-2xl font-semibold text-gray-500': i >= 3 }]"
        :link="`/admin/missions/${mission.id}`"
      >
        <div class="text-gray-900 font-semibold line-clamp-2">
          {{ mission.template_name ?? mission.name }}
        </div>
        <div class="text-gray-500 text-sm">{{ $numeral(mission.count) }} participations</div>
      </BaseStackedListItem>
    </BaseStackedList>
  </BaseBox>
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
      missions: [],
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      await apiFetch('/administration/missions-trending', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.missions = response
      })
    },
    medal(index) {
      switch (index) {
        case 0:
          return '🥇'
        case 1:
          return '🥈'
        case 2:
          return '🥉'
        default:
          return `${index + 1}.`
      }
    },
  },
})
</script>
