<template>
  <div>
    <BaseBox padding="sm" :loading="loading" loading-text="Récupération des participations...">
      <BoxHeadingStatistics title="Participations refusées" class="mb-6" />
      <BaseStackedList v-if="items" :divided="false">
        <BaseStackedListItem
          v-for="(item, i) in items"
          :key="i"
          :icon="`${i + 1}.`"
          icon-class="text-xl font-semibold text-gray-500"
          :link="`/admin/participations?organisation_name=${item.name}&filter[mission.structure.id]=${item.id}&filter[state]=Refusée`"
        >
          <div class="text-gray-900 font-semibold" v-html="item.name" />
          <div class="text-gray-500 text-sm">
            {{ $filters.pluralize(item.count, 'participation', 'participations') }}
          </div>
        </BaseStackedListItem>
      </BaseStackedList>
    </BaseBox>
  </div>
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
      await apiFetch('/statistics/participations-refused-by-organisations', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.items = response
      })
    },
  },
})
</script>
