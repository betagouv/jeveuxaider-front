<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des objectifs">
    <BoxHeadingStatistics
      :title="`En ${$dayjs().year()}, quel est notre cap ?`"
      class="mb-6"
      no-period
    />

    <div v-if="result" class="space-y-4">
      <Goal :value="result.utilisateurs" :objectif="60000">
        <span class="font-semibold text-gray-700">{{ result.utilisateurs }}</span> utilisateurs inscrits
      </Goal>
      <Goal :value="result.organisations" :objectif="3250">
        <span class="font-semibold text-gray-700">{{ result.organisations }}</span> organisations inscrites
      </Goal>
      <Goal :value="result.participations" :objectif="30000">
        <span class="font-semibold text-gray-700">{{ result.participations }}</span> mises en relations
      </Goal>
    </div>
  </Box>
</template>

<script>
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'
import Goal from '@/components/custom/Goal.vue'

export default {
  components: {
    BoxHeadingStatistics,
    Goal
  },
  data () {
    return {
      loading: true,
      result: null
    }
  },
  async fetch () {
    this.loading = true
    await this.$axios.get('/administration/jva-goals').then((response) => {
      this.loading = false
      this.result = response.data
    })
  }
}
</script>

<style>

</style>
