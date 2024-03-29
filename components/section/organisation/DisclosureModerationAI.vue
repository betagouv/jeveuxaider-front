<template>
  <BaseDisclosure v-if="$stores.aideModeration.isAICompliant === false">
    <template #button="{ isOpen }">
      <div class="flex font-semibold text-sm items-center group">
        <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
          <template v-if="$stores.aideModeration.loading">
            <LoadingIndicator>Analyse de l'organisation</LoadingIndicator>
          </template>
          <template v-else-if="$stores.aideModeration.isAICompliant === false">
            <RiAlertFill class="h-5 w-5 text-[#C9191E] fill-current mr-2" aria-hidden="true" />
            L'organisation ne semble pas conforme
          </template>
        </div>
        <div class="w-full border-t mt-1 mx-2" />
        <template v-if="!$stores.aideModeration.loading">
          <RiIndeterminateCircleLine
            v-if="isOpen"
            class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
          />
          <RiAddCircleLine
            v-else
            class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
          />
        </template>
      </div>
    </template>
    <div v-if="$stores.aideModeration.response" class="ml-7 mt-3 text-sm space-y-2 text-gray-500">
      <p>
        Score de conformité : <strong>{{ $numeral(globalScore, '0.[00]') }}%</strong>. <br />En
        dessous de 50%, la mission présente un risque.
      </p>
      <template v-if="sentencesError.length > 0">
        <div>Les phrases détectées par le modèle :</div>
        <ul class="pl-5 space-y-4">
          <li v-for="sentence in sentencesError" :key="sentence.key" class="list-disc italic">
            ... {{ sentence.text }} ...
          </li>
        </ul>
      </template>
      <div class="text-xs bg-gray-50 px-2 py-2 rounded">
        <RiInformationLine class="text-gray-400 fill-current h-4 w-4 inline" />
        Cette information vient de notre modèle d’intelligence artificielle, qui se base sur
        l’historique des missions signalées. Il s’agit d’un outil en test, une vérification humaine
        est nécessaire.
      </div>
    </div>
  </BaseDisclosure>
</template>

<script>
import LoadingIndicator from '@/components/custom/LoadingIndicator.vue'
import MixinAideModeration from '@/mixins/organisation-aide-moderation'

export default defineNuxtComponent({
  components: {
    LoadingIndicator,
  },
  mixins: [MixinAideModeration],
  props: {
    organisation: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sentencesWithKeyAndScore() {
      if (!this.$stores.aideModeration.response) {
        return []
      }
      return this.$stores.aideModeration.response.sentences.map((sentence, key) => ({
        key,
        text: sentence,
        score: this.$stores.aideModeration.response.scores[key],
      }))
    },
    sentencesError() {
      return this.sentencesWithKeyAndScore.filter((item) => item.score <= 0.8)
    },
    globalScore() {
      return this.$stores.aideModeration.response.global * 100
    },
  },
})
</script>
