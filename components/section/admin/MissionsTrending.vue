<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des missions">
    <BoxHeadingStatistics
      title="TOP 5 des missions"
      class="mb-6"
      infos-bulle="Liste des missions ayant reçu le plus de mises en relation sur les 2 dernières semaines"
    />

    <StackedList :divided="false">
      <StackedListItem
        v-for="mission, i in missions"
        :key="i"
        :icon="medal(i)"
        :icon-class="[
          { 'text-4xl': i < 3},
          { 'text-2xl font-semibold text-gray-500': i >= 3 }
        ]"
        :link="`/admin/missions/${mission.id}`"
      >
        <div class="text-gray-900 font-semibold line-clamp-2">
          {{ mission.template_name ?? mission.name }}
        </div>
        <div class="text-gray-500 text-sm">
          {{ mission.count }} participations
        </div>
      </StackedListItem>
    </StackedList>
  </Box>
</template>

<script>
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'

export default {
  components: {
    BoxHeadingStatistics
  },
  data () {
    return {
      loading: true,
      missions: []
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/administration/missions-trending', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.missions = response.data
    })
  },
  methods: {
    medal (index) {
      switch (index) {
        case 0: return '🥇'
        case 1: return '🥈'
        case 2: return '🥉'
        default: return `${index + 1}.`
      }
    }
  }
}
</script>

<style>

</style>
