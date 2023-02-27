<template>
  <div>
    <div v-if="showTitle" class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Score de réactivité
    </div>
    <Box :variant="boxVariant" :padding="boxPadding" :loading="loadingScore" loading-text="Récupération du score ...">
      <DescriptionList v-if="score">
        <DescriptionListItem term="Score" :description="`${score.score}%`" />
        <DescriptionListItem term="Tx. de réponse" :description="responseRatioDescription" />
        <DescriptionListItem term="Tps. de réponse" :description="responseTimeDescription" />
        <DescriptionListItem term="Bonus" :description="bonusDescription" />
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
    bonusDescription () {
      if (!this.score.response_time) {
        return null
      }
      return `${this.score.testimonials_bonus}pts`
    },
    responseRatioDescription () {
      if (!this.score.response_time) {
        return null
      }
      return `${this.score.response_ratio || 0}% soit ${this.score.response_ratio_pts}pts`
    },
    responseTimeDescription () {
      if (!this.score.response_time) {
        return null
      }
      return `${(this.score.response_time / (60 * 60 * 24)).toFixed(0)} jours soit ${this.score.response_time_pts}pts`
    }
  }
}
</script>
