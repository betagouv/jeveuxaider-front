<template>
  <Box padding="sm" :loading="loading" loading-text="Générations des données...">
    <BoxHeadingStatistics
      title="Participations par domaine d'action"
      class="mb-6"
      :infos-bulle="`Correspond au nombre de participations effectuées selon le domaine d'action de la mission`"
    />
    <StackedList v-if="items" :divided="false" class="grid grid-cols-3">
      <StackedListItem
        v-for="item, i in items"
        :key="i"
        :icon="`${(i+1)}.`"
        icon-class="text-xl font-semibold text-gray-500"
      >
        <div class="text-gray-900 font-semibold" v-html="item.name" />
        <div class="text-gray-500 text-sm">
          {{ $options.filters.pluralize(item.count, 'participation', 'participations') }}
        </div>
      </StackedListItem>
    </StackedList>
    <!-- <div v-if="items" class="flex flex-wrap gap-4">
      <div
        v-for="item in items"
        :key="item.id"
        :class="[
          'flex space-x-6 px-6 py-4 bg-white border rounded-xl items-center',
          $options.filters.label(item.id, 'domaines', 'color')
        ]"
      >
        <div
          :class="[
            'flex-none w-12 h-12 p-2 rounded',
            $options.filters.label(item.id, 'domaines', 'bg')
          ]"
        >
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
          <div
            class="text-lg font-semibold"
          >
            {{ item.count }}
          </div>
        </div>
      </div>
    </div> -->
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
    await this.$axios.get('/statistics/public/participations-by-domaines', {
      params: { ...this.$store.state.statistics.params }
    }).then((response) => {
      this.loading = false
      this.items = response.data
    })
  }
}
</script>
