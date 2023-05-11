<template>
  <Disclosure v-if="$store.getters['aideModeration/isAICompliant'] !== true">
    <template #button="{ isOpen }">
      <div class="flex font-semibold text-sm items-center group">
        <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
          <template v-if="$store.state.aideModeration.loading">
            <LoadingIndicator>Analyse de la mission</LoadingIndicator>
          </template>
          <template v-else-if="$store.getters['aideModeration/isAICompliant'] === false">
            <RiAlertFill class="h-5 w-5 text-[#C9191E] fill-current mr-2" aria-hidden="true" />
            La mission ne semble pas conforme
          </template>
        </div>
        <div class="w-full border-t mt-1 mx-2" />
        <template v-if="!$store.state.aideModeration.loading">
          <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
        </template>
      </div>
    </template>
    <div v-if="$store.state.aideModeration.response" class="ml-7 mt-3 text-sm space-y-2 text-gray-500">
      <p> Score de conformité : {{ score | formatNumber("0.[00]") }}%. <br>En dessous de 87%, la mission présente un risque.</p>
      <template v-if="sentencesError.length > 0">
        <div>Les phrases détectées par le modèle :</div>
        <ul class="pl-5 space-y-4">
          <li
            v-for="sentence in sentencesError"
            :key="sentence.key"
            class="list-disc italic"
          >
            ... {{ sentence.text }} ...
          </li>
        </ul>
      </template>
      <div class="text-xs bg-gray-50 px-2 py-2 rounded">
        <RiInformationLine class="text-gray-400 fill-current h-4 w-4 inline " />  Cette information vient de notre modèle d’intelligence artificielle, qui se base sur l’historique des missions signalées. Il s’agit d’un outil en test, une vérification humaine est nécessaire.
      </div>
    </div>
  </Disclosure>
</template>

<script>
import LoadingIndicator from '@/components/custom/LoadingIndicator'
import MixinAideModeration from '@/mixins/mission-aide-moderation'

export default {
  components: {
    LoadingIndicator
  },
  mixins: [MixinAideModeration],
  props: {
    mission: {
      type: Object,
      required: true
    }
  },
  computed: {
    sentencesWithKeyAndScore () {
      if (!this.$store.state.aideModeration.response) {
        return []
      }
      return this.$store.state.aideModeration.response.sentences.map((sentence, key) => ({
        key,
        text: sentence,
        score: this.$store.state.aideModeration.response.scores[key]
      }))
    },
    sentencesSuccess () {
      return this.sentencesWithKeyAndScore.filter(item => item.score >= 0.95)
    },
    sentencesWarning () {
      return this.sentencesWithKeyAndScore.filter(item => item.score > 0.75 && item.score < 0.95)
    },
    sentencesError () {
      return this.sentencesWithKeyAndScore.filter(item => item.score <= 0.75)
    },
    otherSentences () {
      return this.sentencesWithKeyAndScore.filter(item => item.score > 0.75).sort(function (a, b) {
        return parseFloat(a.score) - parseFloat(b.score)
      })
    },
    score () {
      return this.$store.state.aideModeration.response?.global * 100
    }
    // scoreMin () {
    //   return this.$store.state.aideModeration.response?.scores.reduce((a, b) => Math.min(a, b)) * 100
    // }
  }
}
</script>
