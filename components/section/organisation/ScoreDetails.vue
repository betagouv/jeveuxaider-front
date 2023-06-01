<template>
  <DescriptionList v-if="score">
    <DescriptionListItem term="Total">
      <p>{{ score.total_points|pluralize('/ 100 point', '/ 100 points') }}</p>
    </DescriptionListItem>
    <DescriptionListItem term="Engagement">
      <template v-if="score.processed_participations_rate">
        <p>{{ score.engagement_points|pluralize('/ 30 point', '/ 30 points') }}</p>
        <p class="text-xs font-normal">
          Taux de traitement : {{ score.processed_participations_rate }}%
        </p>
      </template>
    </DescriptionListItem>
    <DescriptionListItem term="Réactivité">
      <template v-if="score.nb_last_participations">
        <p>{{ score.reactivity_points|pluralize('/ 70 point', '/ 70 points') }}</p>
        <div class="text-xs font-normal">
          <p>
            Nb. de réponses : {{ score.nb_last_participations_with_response }} sur {{ score.nb_last_participations }}
          </p>
          <p v-if="responseTime">
            Tps. de réponse moyen : {{ responseTime }}
          </p>
        </div>
      </template>
    </DescriptionListItem>
    <DescriptionListItem term="Bonus">
      <template v-if="score.processed_participations_rate">
        <p>{{ score.bonus_points }} {{ Math.abs(score.bonus_points)|pluralize('point', 'points', false) }}</p>
        <div class="text-xs font-normal">
          <p v-if="score.average_testimony_grade" class="text-xs font-normal">
            Moyenne des témoignages : {{ score.average_testimony_grade }} / 5
          </p>
          <p v-else>
            Basé sur la moyenne des témoignages
          </p>
        </div>
      </template>
    </DescriptionListItem>
  </DescriptionList>
</template>

<script>
export default {
  props: {
    score: {
      type: Object,
      required: true
    }
  },
  computed: {
    responseTime () {
      return this.score.response_time ? this.$dayjs.duration(this.score.response_time, 'seconds').humanize() : null
    }
  }
}
</script>
