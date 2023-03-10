<template>
  <div>
    <div v-if="showTitle" class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Score
    </div>
    <Box :variant="boxVariant" :padding="boxPadding" :loading="loadingScore" loading-text="Récupération du score ...">
      <DescriptionList v-if="score">
        <DescriptionListItem term="Total" :description="`${score.score}%`" />
        <DescriptionListItem term="Engagement">
          <template v-if="score.response_ratio">
            <p>{{ score.engagement_points|pluralize('point', 'points') }}</p>
            <p class="text-xs font-normal">
              Taux réponse : {{ score.response_ratio }}%
            </p>
          </template>
        </DescriptionListItem>
        <DescriptionListItem term="Réactivité">
          <template v-if="score.response_ratio">
            <p>{{ score.reactivity_points|pluralize('point', 'points') }}</p>
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
          <template v-if="score.response_ratio">
            {{ score.bonus_points }} {{ Math.abs(score.bonus_points)|pluralize('point', 'points', false) }}
          </template>
        </DescriptionListItem>
      </DescriptionList>
    </Box>
  </div>
</template>

<script>
export default {
  props: {
    structureId: {
      type: Number,
      required: true
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    boxVariant: {
      type: String,
      default: 'flat'
    },
    boxPadding: {
      type: String,
      default: 'xs'
    }
  },
  data () {
    return {
      score: null,
      loadingScore: true
    }
  },
  async fetch () {
    if (!this.structureId) {
      return
    }
    const { data: score } = await this.$axios.get(`/structures/${this.structureId}/score`)
    this.score = score
    this.loadingScore = false
  },
  computed: {
    responseTime () {
      return this.score.response_time ? this.$dayjs.duration(this.score.response_time, 'seconds').humanize() : null
    }
  }
}
</script>
