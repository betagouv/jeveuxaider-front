<template>
  <Box padding="sm" :loading="loading" loading-text="Récupération des objectifs">
    <BoxHeadingStatistics
      :title="`En ${$dayjs().year()}, quel est notre cap ?`"
      class="mb-6"
      no-period
    />

    <div v-if="result" class="space-y-6">
      <Goal :value="result.utilisateurs_count" :from="0" :to="60000">
        <span class="font-semibold text-gray-700">{{ result.utilisateurs_count }}</span> utilisateurs inscrits
      </Goal>
      <Goal :value="result.organisations_validated_count" :from="0" :to="3250">
        <span class="font-semibold text-gray-700">{{ result.organisations_validated_count }}</span> organisations inscrites
      </Goal>
      <Goal :value="result.participations_count" :from="0" :to="130000">
        <span class="font-semibold text-gray-700">{{ result.participations_count }}</span> mises en relations brutes
      </Goal>
      <Goal :value="result.participations_validated_count" :from="0" :to="90000">
        <span class="font-semibold text-gray-700">{{ result.participations_validated_count }}</span> mises en relations validées
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
    await this.$axios.get('/administration/goals').then((response) => {
      this.loading = false
      this.result = response.data
    })
  }
}
</script>

<style>

</style>
