<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Participations par activités"
      class="mb-6"
      no-period
      :infos-bulle="`Correspond au nombre de participations effectuées en ${$route.params.year} selon le domaine d'action de la mission`"
    />
    <div v-if="items" class="flex flex-wrap gap-4">
      <div
        v-for="item in items"
        :key="item.id"
        :class="[
          'flex space-x-6 px-6 py-4 text-white rounded-xl items-center',
          $options.filters.label(item.id, 'domaines', 'bg')
        ]"
      >
        <div class="flex-none w-8 h-8">
          <img
            :src="$options.filters.label(item.id, 'domaines', 'icon')"
            :alt="$options.filters.label(item.id, 'domaines')"
            width="30"
            height="30"
          >
        </div>
        <div>
          <div class="">
            {{ item.name }}
          </div>
          <div class="text-lg font-semibold">
            {{ item.count }}
          </div>
        </div>
      </div>
    </div>
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
      items: null
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/statistics/public/participations-by-activities', {
      params: {
        year: this.$route.params.year
      }
    }).then((response) => {
      this.loading = false
      this.items = response.data
    })
  }
}
</script>
