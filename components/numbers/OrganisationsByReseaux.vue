<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des réseaux...">
    <BoxHeadingStatistics
      title="Nouvelles antennes par réseaux"
      class="mb-6"
      infos-bulle="Liste des réseaux avec le plus d'antennes inscrites et validées sur la période"
    />
    <BaseStackedList v-if="items" :divided="false">
      <BaseStackedListItem
        v-for="(item, i) in items"
        :key="i"
        :icon="`${i + 1}.`"
        icon-class="text-xl font-semibold text-gray-500"
        :link="`/admin/organisations?reseau_name=${item.name}&filter[ofReseau]=${item.id}`"
      >
        <div class="text-gray-900 font-semibold" v-html="item.name" />
        <div class="text-gray-600 text-sm">
          {{ $filters.pluralize(item.count, 'antenne', 'antennes') }}
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
      await apiFetch('/statistics/organisations-by-reseaux', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.items = response
      })
    },
  },
})
</script>
