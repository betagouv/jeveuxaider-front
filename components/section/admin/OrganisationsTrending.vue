<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des organisations">
    <BoxHeadingStatistics
      title="TOP 5 des organisations"
      class="mb-6"
      infos-bulle="Liste des organisations ayant reçu le plus de mises en relation sur la période"
    />

    <BaseStackedList :divided="false">
      <BaseStackedListItem
        v-for="(organisation, i) in organisations"
        :key="i"
        :icon="medal(i)"
        :icon-class="[{ 'text-4xl': i < 3 }, { 'text-2xl font-semibold text-gray-500': i >= 3 }]"
        :link="`/admin/organisations/${organisation.id}`"
      >
        <div class="text-gray-900 font-semibold">
          {{ organisation.name }}
        </div>
        <div class="text-gray-600 text-sm">{{ $numeral(organisation.count) }} participations</div>
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
      organisations: [],
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      await apiFetch('/administration/organisations-trending', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.organisations = response
      })
    },
    medal(index) {
      switch (index) {
        case 0:
          return '🥇'
        case 1:
          return '🥈'
        case 2:
          return '🥉'
        default:
          return `${index + 1}.`
      }
    },
  },
})
</script>
