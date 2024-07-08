<template>
  <div>
    <BaseBox padding="sm" :loading="loading" loading-text="Récupération des missions...">
      <BoxHeadingStatistics title="Missions en cours de traitement" no-period class="mb-6" />
      <BaseStackedList v-if="items" :divided="false">
        <BaseStackedListItem
          v-for="(item, i) in items"
          :key="i"
          :icon="`${i + 1}.`"
          icon-class="text-xl font-semibold text-gray-500"
          :link="`/admin/missions?filter[department]=${item.department}&filter[state]=En cours de traitement`"
        >
          <div class="text-gray-900 font-semibold">
            {{ item.department }} -
            {{ $filters.label(item.department, 'departments') }}
          </div>
          <div class="text-gray-600 text-sm">
            {{ $filters.pluralize(item.count, 'mission', 'missions') }}
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
      await apiFetch('/statistics/missions-in-progress-by-departments', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.items = response
      })
    },
  },
})
</script>
