<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des organisations...">
    <BoxHeadingStatistics
      title="Organisations avec le plus de places"
      no-period
      class="mb-6"
      infos-bulle="Liste des organisations avec le plus de places disponibles en ce moment"
    />
    <BaseStackedList v-if="items" :divided="false">
      <BaseStackedListItem
        v-for="(item, i) in items"
        :key="i"
        :icon="`${i + 1}.`"
        icon-class="text-xl font-semibold text-gray-500"
        :link="`/admin/missions?filter[structure.id]=${item.id}&context_name=${item.name}`"
      >
        <div class="text-gray-900 font-semibold" v-html="item.name" />
        <div class="text-gray-500 text-sm">
          {{ $filters.pluralize(item.count, 'place disponible', 'places disponibles') }}
        </div>
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
      items: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      await apiFetch('/statistics/places-by-organisations', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.items = response
      })
    },
  },
})
</script>
