<template>
  <BaseDescriptionList v-if="score">
    <BaseDescriptionListItem term="Total">
      <p>
        {{ $filters.pluralize(score.total_points, '/ 100 point', '/ 100 points') }}
      </p>
    </BaseDescriptionListItem>
    <BaseDescriptionListItem term="Engagement">
      <template v-if="score.processed_participations_rate">
        <p>
          {{ $filters.pluralize(score.engagement_points, '/ 30 point', '/ 30 points') }}
        </p>
        <p class="text-xs font-normal">
          Taux de traitement : {{ score.processed_participations_rate }}%
        </p>
      </template>
    </BaseDescriptionListItem>
    <BaseDescriptionListItem term="Réactivité">
      <template v-if="score.nb_last_participations">
        <p>
          {{ $filters.pluralize(score.reactivity_points, '/ 70 point', '/ 70 points') }}
        </p>
        <div class="text-xs font-normal">
          <p>
            Nb. de réponses :
            {{ score.nb_last_participations_with_response }} sur
            {{ score.nb_last_participations }}
          </p>
          <p v-if="responseTime">Tps. de réponse moyen : {{ responseTime }}</p>
        </div>
      </template>
    </BaseDescriptionListItem>
    <BaseDescriptionListItem term="Bonus">
      <template v-if="score.processed_participations_rate">
        <p>
          {{ score.bonus_points }}
          {{ $filters.pluralize(Math.abs(score.bonus_points), 'point', 'points', false) }}
        </p>
        <div class="text-xs font-normal">
          <p v-if="score.average_testimony_grade" class="text-xs font-normal">
            Moyenne des témoignages : {{ score.average_testimony_grade }} / 5
          </p>
          <p v-else>Basé sur la moyenne des témoignages</p>
        </div>
      </template>
    </BaseDescriptionListItem>
  </BaseDescriptionList>
</template>

<script>
export default defineNuxtComponent({
  props: {
    score: {
      type: Object,
      required: true,
    },
  },
  computed: {
    responseTime() {
      return this.score.response_time
        ? this.$dayjs.duration(this.score.response_time, 'seconds').humanize()
        : null
    },
  },
})
</script>
