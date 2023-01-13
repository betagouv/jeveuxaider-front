<template>
  <Box :variant="variant" :padding="padding" :loading="loadingScore" loading-text="Récupération de votre score ...">
    <slot name="top" />
    <div v-if="score">
      <div
        :class="[{
          'rounded-lg': variant === 'shadow'
        }]"
        class="grid grid-cols-1 lg:grid-cols-2 border bg-gray-200 gap-[1px] overflow-hidden"
      >
        <div class="col-span-2 bg-white p-6">
          <client-only>
            <div class="relative mt-8 mb-20 w-full">
              <VueSvgGauge
                :start-angle="-110"
                :end-angle="110"
                :value="score.score"
                :separator-step="25"
                :min="0"
                :max="100"
                :inner-radius="90"
                base-color="#F1F2F9"
                :scale-interval="0"
                gauge-color="#F95A5C"
                class="mx-auto"
                style="width: 350px; height: 224px;"
              />
              <div class="absolute flex flex-col justify-center items-center top-[60px] left-1/2 transform -translate-x-1/2 h-[224px] w-[224px] text-center border border-[#F1F2F9] rounded-full">
                <div class="font-bold text-5xl">
                  {{ score.score }}/100
                </div>
                <div class="text-[#F95A5C] text-sm font-bold mt-2">
                  Score de réactivité
                </div>
              </div>
            </div>
          </client-only>

          <div class="text-xs text-[#696974] font-medium text-center px-12 relative">
            🏆 Chez JeVeuxAider.gouv.fr nous chouchoutons les bons élèves. Plus vous êtes réactifs, plus la visibilité de vos missions augmente. <span class="cursor-pointer underline text-jva-blue-500 hover:text-jva-blue-600">Astuces ›</span>
          </div>
        </div>
        <CardStatistic
          :value="`${score.response_ratio || 0}%`"
          title="Taux de réponse"
          subtitle="aux participations"
        />
        <CardStatistic
          :value="`${(score.response_time / (60 * 60 * 24)).toFixed(0)} jours`"
          title="Temps de réponse"
          subtitle="aux participations"
        />
      </div>
      <slot name="bottom" />
    </div>
  </Box>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'

export default {
  components: {
    CardStatistic
  },
  props: {
    structureId: {
      type: Number,
      required: true
    },
    variant: {
      type: [String, Boolean],
      default: 'shadow',
      validator: s => ['shadow', 'flat', false].includes(s)
    },
    padding: {
      type: [String, Boolean],
      default: 'lg',
      validator: s => ['xs', 'sm', 'lg', false].includes(s)
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
  }
}
</script>

<style>

</style>
