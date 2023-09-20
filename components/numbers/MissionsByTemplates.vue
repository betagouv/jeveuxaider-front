<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des activités...">
    <BoxHeadingStatistics
      title="Modèles de missions les plus utilisés"
      class="mb-6"
      infos-bulle="Liste des modèles de mission les plus utilisés sur la période, sur les missions validées ou terminées"
    />
    <BaseStackedList v-if="items" :divided="false">
      <BaseStackedListItem
        v-for="(item, i) in items"
        :key="i"
        :icon="`${i + 1}.`"
        icon-class="text-xl font-semibold text-gray-500"
        :link="`/admin/missions?filter[template.id]=${item.id}&template_name=${item.title}`"
      >
        <div class="text-gray-900 font-semibold" v-html="item.title" />
        <div class="text-gray-500 text-sm">
          {{ $filters.pluralize(item.count, 'mission validée', 'missions validées') }}
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
      await apiFetch('/statistics/missions-by-templates', {
        params: this.$stores.statistics.params,
      }).then((response) => {
        this.loading = false
        this.items = response
      })
    },
  },
})
</script>
