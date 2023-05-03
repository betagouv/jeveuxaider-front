<template>
  <Disclosure>
    <template #button="{ isOpen }">
      <div class="flex font-semibold text-sm items-center group">
        <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
          <template v-if="loading">
            <LoadingIndicator>Analyse de la mission</LoadingIndicator>
          </template>
          <template v-else>
            <RiAlertFill class="h-5 w-5 text-[#C9191E] fill-current mr-2" aria-hidden="true" />
            La mission ne semble pas conforme
          </template>
        </div>
        <div class="w-full border-t mt-1 mx-2" />
        <template v-if="!loading">
          <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
        </template>
      </div>
    </template>
    <div v-if="response" class="ml-7 mt-3 text-sm space-y-2 text-gray-500">
      <div> Score de conformité : {{ score | formatNumber("0.[00]") }}%. En dessous de 87%, la mission présente un risque.</div>
      <template v-if="sentencesError.length > 0">
        <div>Les phrases détectées par le modèle :</div>
        <div
          v-for="sentence in sentencesError"
          :key="sentence.key"
        >
          {{ sentence.text }}
        </div>
      </template>
      <div class="text-xs italic">
        Cette information vient de notre modèle d’intelligence artificielle, qui se base sur l’historique des missions signalées. Il s’agit d’un outil en test, une vérification humaine est nécessaire.
      </div>
    </div>
  </Disclosure>
</template>

<script>
import axios from 'axios'
import LoadingIndicator from '@/components/custom/LoadingIndicator'

export default {
  components: {
    LoadingIndicator
  },
  props: {
    mission: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      response: null,
      loading: true
    }
  },
  async fetch () {
    this.loading = true
    const { data: response } = await axios.post(this.$config.ai.missionModerationUrl, {
      text: this.textToAnalyze
    })
    this.response = response
    if (this.response.global < 0.87) {
      this.$emit('bad-score')
    } else {
      this.$emit('good-score')
    }
    this.loading = false
  },
  computed: {
    sentencesWithKeyAndScore () {
      if (!this.response) {
        return []
      }
      return this.response.sentences.map((sentence, key) => ({ key, text: sentence, score: this.response.scores[key] }))
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
    textToAnalyze () {
      let text = this.mission.name + ' | ' + this.mission.objectif + ' | ' + this.mission.description + ' | ' + this.mission.information + (this.mission.prerequisites ? ' | ' + this.mission.prerequisites.join(' | ') : '')
      text = text.replace(/<\/li>/g, '</li> | ')
      text = text.replace(/<\/?[^>]+(>|$)/g, '')
      return text
    },
    score () {
      return this.response.global * 100
    },
    scoreMin () {
      return this.response.scores.reduce((a, b) => Math.min(a, b)) * 100
    }
  }
}
</script>
