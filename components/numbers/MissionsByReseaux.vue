<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des réseaux...">
    <BoxHeadingStatistics
      title="Réseaux les plus actifs"
      class="mb-6"
      infos-bulle="Liste des réseaux ayant créé le plus de missions validées sur la période sélectionnée"
    />
    <BaseStackedList v-if="items" :divided="false">
      <BaseStackedListItem
        v-for="(item, i) in items"
        :key="i"
        :icon="`${i + 1}.`"
        icon-class="text-xl font-semibold text-gray-500"
        :link="`/admin/missions?reseau_name=${item.name}&filter[ofReseau]=${item.id}`"
      >
        <div class="text-gray-900 font-semibold" v-html="item.name" />
        <div class="text-gray-600 text-sm">
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
      await apiFetch('/statistics/missions-by-reseaux', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.items = response
      })
    },
  },
})
</script>
