<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des admins">
    <BoxHeadingStatistics
      title="Référents"
      class="mb-6"
      infos-bulle="Liste des référents avec le plus d'activités sur la période"
    />

    <BaseStackedList :divided="false">
      <BaseStackedListItem
        v-for="(user, i) in users"
        :key="i"
        :icon="medal(i)"
        :icon-class="[{ 'text-4xl': i < 3 }, { 'text-2xl font-semibold text-gray-500': i >= 3 }]"
        :link="`/admin/utilisateurs/${user.profile_id}`"
      >
        <div class="text-gray-900 font-semibold">{{ user.first_name }} {{ user.last_name }}</div>
        <div class="text-gray-500 text-sm">{{ $numeral(user.count) }} actions</div>
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
      users: [],
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      await apiFetch('/administration/topito-referents', {
        params: this.$route.query,
      }).then((response) => {
        this.loading = false
        this.users = response
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
