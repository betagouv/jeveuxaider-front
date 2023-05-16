<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des admins">
    <BoxHeadingStatistics
      title="Modérateurs"
      class="mb-6"
      infos-bulle="Liste des modérateurs avec le plus d'activités sur les 2 dernières semaines"
    />

    <StackedList :divided="false">
      <StackedListItem
        v-for="user, i in users"
        :key="i"
        :icon="medal(i)"
        :icon-class="[
          { 'text-4xl': i < 3},
          { 'text-2xl font-semibold text-gray-500': i >= 3 }
        ]"
      >
        <div class="text-gray-900 font-semibold">
          {{ user.first_name }} {{ user.last_name }}
        </div>
        <div class="text-gray-500 text-sm">
          {{ user.count }} actions
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
      users: []
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/administration/topito-admins', {
      params: this.$store.state.statistics.params
    }).then((response) => {
      this.loading = false
      this.users = response.data
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
