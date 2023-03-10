<template>
  <Box :variant="variant" :padding="loadingScore ? 'lg' : padding" :loading="loadingScore" loading-text="Récupération de votre score ...">
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
                  {{ score.score }}%
                </div>
                <div class="text-[#F95A5C] text-sm font-bold mt-2">
                  Score de réactivité
                </div>
              </div>
            </div>
          </client-only>

          <div class="text-xs text-[#696974] font-medium text-center px-4 relative">
            🏆 Chez JeVeuxAider.gouv.fr, nous valorisons votre réactivité : apportez une réponse rapide aux bénévoles pour décupler la visibilité de vos missions ! <span v-if="['responsable'].includes($store.getters.contextRole)" class="cursor-pointer underline text-jva-blue-500 hover:text-jva-blue-600" @click="toggleOverlay">Astuces ›</span>
          </div>
        </div>
        <CardStatistic
          :value="score.response_ratio ? `${score.response_ratio}%` : '-'"
          title="Taux de réponse"
          subtitle="aux participations"
        />
        <CardStatistic
          :value="score.response_time ? $dayjs.duration(score.response_time, 'seconds').humanize() : '-'"
          title="Temps de réponse"
          subtitle="aux participations"
        />
      </div>
      <slot name="bottom" />

      <portal to="body-end">
        <Overlay :is-open="showOverlay" title="Pour une meilleure visibilité" @close="showOverlay = false">
          <div class="text-cool-gray-500 text-lg lg:text-xl text-center">
            Pour améliorer votre score de réactivité, voici quelques règles à suivre :
          </div>
          <div class="my-8 space-y-8">
            <div>
              <div class="text-lg mb-4 font-semibold">
                💬 Répondez aux bénévoles dans un délai raisonnable
              </div>
              <div class="text-gray-600">
                Une réponse apportée au plus tôt est la garantie de bénévoles mobilisés ! Nous recommandons d’apporter une première réponse dans un délai de 5 jours ouvrés.
              </div>
            </div>
            <div>
              <div class="text-lg mb-4 font-semibold">
                👊 Tenez à jour les candidatures reçues sur la plateforme
              </div>
              <div class="text-gray-600">
                Que votre réponse soit positive ou négative, il est essentiel de tenir au courant les bénévoles qui ont proposé leur aide : prenez le temps de répondre à leur message et de mettre à jour le statut de leur participation.
              </div>
            </div>
            <div>
              <div class="text-lg mb-4 font-semibold">
                💌 Utilisez la messagerie
              </div>
              <div class="text-gray-600">
                Il est préférable d'utiliser la messagerie de JeVeuxAider.gouv.fr afin que les bénévoles disposent de toutes les informations directement sur leur espace.
              </div>
            </div>
            <div class="text-center">
              <nuxt-link to="/admin/participations">
                <Button type="secondary">
                  Traiter les participations
                </Button>
              </nuxt-link>
            </div>
          </div>
        </Overlay>
      </portal>
    </div>
  </Box>
</template>

<script>
import CardStatistic from '@/components/card/CardStatistic'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    CardStatistic,
    Button
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
      loadingScore: true,
      showOverlay: false
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
  methods: {
    toggleOverlay () {
      this.showOverlay = !this.showOverlay
    }
  }
}
</script>

<style>

</style>
