<template>
  <BaseBox padding="sm" :loading="loading" loading-text="Récupération des objectifs">
    <BoxHeadingStatistics
      :title="`En ${$dayjs().year()}, quel est notre cap ?`"
      class="mb-6"
      no-period
    />

    <div v-if="result" class="space-y-6">
      <Goal :value="result.utilisateurs_count" :from="0" :to="60000">
        <span class="font-semibold text-gray-700">{{ $numeral(result.utilisateurs_count) }}</span>
        utilisateurs inscrits
      </Goal>
      <Goal :value="result.organisations_validated_count" :from="0" :to="3250">
        <span class="font-semibold text-gray-700">{{
          $numeral(result.organisations_validated_count)
        }}</span>
        organisations inscrites
      </Goal>
      <Goal :value="result.participations_count" :from="0" :to="190000">
        <span class="font-semibold text-gray-700">{{ $numeral(result.participations_count) }}</span>
        mises en relation brutes
      </Goal>
      <Goal :value="result.participations_in_progress_count" :from="0" :to="130000">
        <span class="font-semibold text-gray-700">{{
          $numeral(result.participations_in_progress_count)
        }}</span>
        mises en relation en cours
      </Goal>
      <Goal :value="result.participations_validated_count" :from="0" :to="90000">
        <span class="font-semibold text-gray-700">{{
          $numeral(result.participations_validated_count)
        }}</span>
        mises en relation validées
      </Goal>
    </div>
  </BaseBox>
</template>

<script>
import BoxHeadingStatistics from '@/components/custom/BoxHeadingStatistics.vue'
import Goal from '@/components/custom/Goal.vue'

export default defineNuxtComponent({
  components: {
    BoxHeadingStatistics,
    Goal,
  },
  data() {
    return {
      loading: true,
      result: null,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      await apiFetch('/administration/goals').then((response) => {
        this.loading = false
        this.result = response
      })
    },
  },
})
</script>
