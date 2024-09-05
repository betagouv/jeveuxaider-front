<template>
  <BaseBox
    :variant="variant"
    :padding="loadingScore ? 'lg' : padding"
    :loading="loadingScore"
    loading-text="Récupération de votre score ..."
  >
    <slot name="top" />
    <div v-if="score">
      <div
        :class="[
          {
            'rounded-lg': variant === 'shadow',
          },
        ]"
        class="grid grid-cols-2 border bg-gray-200 gap-[1px] overflow-hidden"
      >
        <div class="col-span-2 bg-white p-6">
          <div class="relative mt-8 mb-20 w-full">
            <GaugeChart v-if="score.total_points >= 0" :value="score.total_points" />

            <div
              class="absolute flex flex-col justify-center items-center top-[30px] lg:top-[60px] left-1/2 transform -translate-x-1/2 h-[224px] w-[224px] text-center"
            >
              <div class="font-bold text-5xl tracking-tight">
                <span>{{ score.total_points }}</span>
                <span class="mx-1">/</span>
                <span>100</span>
              </div>
              <div class="text-[#FF463D] text-sm font-bold mt-2">
                Score d'engagement <br />
                et de réactivité
              </div>
              <DsfrLink class="text-xs mt-2" @click.native="showModalScoreDetails = true">
                Voir le détail
              </DsfrLink>
              <ClientOnly>
                <Teleport to="#teleport-body-end">
                  <BaseModal
                    :is-open="showModalScoreDetails"
                    @close="showModalScoreDetails = false"
                    title="Score d'engagement et de réactivité"
                  >
                    <ScoreDetails :score="score" class="pb-8" />
                  </BaseModal>
                </Teleport>
              </ClientOnly>
            </div>
          </div>

          <div class="text-xs text-[#696974] font-medium text-center px-4 relative">
            🏆 Chez JeVeuxAider.gouv.fr, nous valorisons votre réactivité : apportez une réponse
            rapide aux bénévoles pour décupler la visibilité de vos missions !
            <span
              class="cursor-pointer underline text-jva-blue-500 hover:text-jva-blue-600"
              @click="toggleOverlay"
              >Astuces ›</span
            >
          </div>
        </div>
        <CardStatistic
          :value="
            score.processed_participations_rate ? `${score.processed_participations_rate}%` : '-'
          "
          title="Taux de traitement"
          subtitle="des participations"
        />
        <CardStatistic
          :value="
            score.response_time ? $dayjs.duration(score.response_time, 'seconds').humanize() : '-'
          "
          title="Temps de réponse"
          subtitle="aux participations"
        />
      </div>
      <slot name="bottom" />
      <ClientOnly>
        <Teleport to="#teleport-body-end">
          <BaseOverlay
            :is-open="showOverlay"
            title="Pour une meilleure visibilité"
            @close="showOverlay = false"
          >
            <div class="text-cool-gray-500 text-lg lg:text-xl text-center">
              Pour améliorer votre score de réactivité, voici quelques règles à suivre :
            </div>
            <div class="my-8 space-y-8">
              <div>
                <div class="text-lg mb-4 font-semibold">
                  💬 Répondez aux bénévoles dans un délai raisonnable
                </div>
                <div class="text-gray-600">
                  Une réponse apportée au plus tôt est la garantie de bénévoles mobilisés ! Nous
                  recommandons d’apporter une première réponse dans un délai de 5 jours ouvrés.
                </div>
              </div>
              <div>
                <div class="text-lg mb-4 font-semibold">
                  👊 Tenez à jour les candidatures reçues sur la plateforme
                </div>
                <div class="text-gray-600">
                  Que votre réponse soit positive ou négative, il est essentiel de tenir au courant
                  les bénévoles qui ont proposé leur aide : prenez le temps de répondre à leur
                  message et de mettre à jour le statut de leur participation.
                </div>
              </div>
              <div>
                <div class="text-lg mb-4 font-semibold">💌 Utilisez la messagerie</div>
                <div class="text-gray-600">
                  Il est préférable d'utiliser la messagerie de JeVeuxAider.gouv.fr afin que les
                  bénévoles disposent de toutes les informations directement sur leur espace.
                </div>
              </div>
              <div class="text-center">
                <nuxt-link no-prefetch to="/admin/participations">
                  <DsfrButton type="secondary"> Traiter les participations </DsfrButton>
                </nuxt-link>
              </div>
            </div>
          </BaseOverlay>
        </Teleport>
      </ClientOnly>
    </div>
  </BaseBox>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic.vue'
import ScoreMixin from '@/mixins/score'
import ScoreDetails from '@/components/section/organisation/ScoreDetails.vue'
import GaugeChart from '@/components/chart/GaugeChart.vue'

export default defineNuxtComponent({
  components: {
    CardStatistic,
    ScoreDetails,
    GaugeChart,
  },
  mixins: [ScoreMixin],
  props: {
    structureId: {
      type: Number,
      required: true,
    },
    variant: {
      type: [String, Boolean],
      default: 'shadow',
      validator: (s) => ['shadow', 'flat', false].includes(s),
    },
    padding: {
      type: [String, Boolean],
      default: 'lg',
      validator: (s) => ['xs', 'sm', 'lg', false].includes(s),
    },
  },
  data() {
    return {
      score: null,
      loadingScore: true,
      showOverlay: false,
      showModalScoreDetails: false,
    }
  },
  methods: {
    toggleOverlay() {
      this.showOverlay = !this.showOverlay
    },
  },
})
</script>
