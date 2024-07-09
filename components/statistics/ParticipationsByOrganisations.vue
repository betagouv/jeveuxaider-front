<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des organisations...">
    <BoxHeadingStatistics
      title="Organisations les plus actives"
      class="mb-6"
      infos-bulle="Liste des organisations ayant reçu le plus de mises en relation sur la période"
    />
    <BaseStackedList v-if="items" :divided="false">
      <BaseStackedListItem
        v-for="(item, i) in items"
        :key="i"
        :icon="`${i + 1}.`"
        icon-class="text-xl font-semibold text-gray-500"
      >
        <div class="text-gray-900 font-semibold" v-html="item.name" />
        <div class="text-gray-600 text-sm">
          {{ $filters.pluralize(item.count, 'mise en relation', 'mises en relation') }}
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
      await apiFetch('/statistics/public/participations-by-organisations', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.items = response
      })
    },
  },
})
</script>
