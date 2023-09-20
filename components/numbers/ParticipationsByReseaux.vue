<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des réseaux...">
    <BoxHeadingStatistics
      title="Réseaux les plus actifs"
      class="mb-6"
      infos-bulle="Liste des réseaux ayant reçu le plus de mises en relation sur la période"
    />
    <BaseStackedList v-if="items" :divided="false">
      <BaseStackedListItem
        v-for="(item, i) in items"
        :key="i"
        :icon="`${i + 1}.`"
        icon-class="text-xl font-semibold text-gray-500"
        :link="`/admin/participations?reseau_name=${item.name}&filter[ofReseau]=${item.id}`"
      >
        <div class="text-gray-900 font-semibold" v-html="item.name" />
        <div class="text-gray-500 text-sm">
          {{ $filters.pluralize(item.count, 'participation', 'participations') }}
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
      await apiFetch('/statistics/participations-by-reseaux', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.items = response
      })
    },
  },
})
</script>
