<template>
  <Box padding="sm" :loading="loadingScore" loading-text="Récupération de votre score ...">
    <Heading as="h2" :level="3" class="mb-8">
      Votre visibilité
    </Heading>
    <div v-if="score">
      <div class="grid grid-cols-1 lg:grid-cols-2 rounded-lg border bg-gray-200 gap-[1px] overflow-hidden">
        <div class="col-span-2 bg-white">
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
                :gauge-color="[{ offset: 0, color: '#F95A5C'},{ offset: 100, color: '#63BC8B'}]"
                style="width: 400px; height: 224px;"
              />

              <div class="absolute flex flex-col justify-center items-center top-[60px] left-1/2 transform -translate-x-1/2 h-[224px] w-[224px] text-center border border-[#F1F2F9] rounded-full">
                <div class="font-bold text-5xl">
                  {{ score.score }}/100
                </div>
                <div class="text-[#F95A5C] text-sm font-bold">
                  Score de réactivité
                </div>
              </div>
            </div>
          </client-only>

          <div class="text-xs text-gray-700 font-medium text-center px-12 mb-4 relative">
            🏆 Chez JeVeuxAider.gouv.fr nous chouchoutons les bons élèves. Plus vous êtes réactifs, plus la visibilité de vos missions augmente. <span class="cursor-pointer underline text-jva-blue-500 hover:text-jva-blue-600">Astuces ›</span>
          </div>
        </div>
        <CardStatistic
          :value="`${score.response_ratio}%`"
          title="Taux de réponse"
          subtitle="aux participations"
        />
        <CardStatistic
          :value="`${(score.response_time / (60 * 60 * 24)).toFixed(0)} jours`"
          title="Temps de réponse"
          subtitle="aux participations"
        />
      </div>
      <div
        v-if="['responsable'].includes($store.getters.contextRole)"
        class="mt-8 text-center"
      >
        <nuxt-link to="/admin/participations?filter[is_state_pending]=true">
          <Button type="secondary">
            Modérer les participations
          </Button>
        </nuxt-link>
      </div>
    </div>
  </Box>
</template>

<script>

import Button from '@/components/dsfr/Button.vue'
import CardStatistic from '@/components/card/CardStatistic'

export default {
  components: {
    Button,
    CardStatistic
  },
  props: {
    structureId: {
      type: Number,
      required: true
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
