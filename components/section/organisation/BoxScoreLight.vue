<template>
  <div>
    <div v-if="showTitle" class="uppercase text-sm font-semibold text-gray-600 px-2 mb-2">
      Score
    </div>
    <Box :variant="boxVariant" :padding="boxPadding" :loading="loadingScore" loading-text="Récupération du score ...">
      <ScoreDetails :score="score" />
    </Box>
  </div>
</template>

<script>
import ScoreMixin from '~/mixins/score'
import ScoreDetails from '~/components/section/organisation/ScoreDetails.vue'

export default {
  components: {
    ScoreDetails
  },
  mixins: [ScoreMixin],
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
  }
}
</script>
