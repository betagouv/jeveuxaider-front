<template>
  <Disclosure>
    <template #button="{ isOpen }">
      <div class="flex font-semibold text-sm items-center group">
        <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
          <template v-if="loading">
            <LoadingIndicator>Analyse des contenus AI</LoadingIndicator>
          </template>
          <template v-else>
            <RiCheckLine v-if="sentencesError.length == 0" class="h-5 w-5 text-green-700 fill-current mr-2" aria-hidden="true" />
            <RiAlertFill v-else class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" />
            Phrases à vérifier : {{ sentencesError.length }}
          </template>
        </div>
        <div class="w-full border-t mt-1 mx-2" />
        <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
        <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
      </div>
    </template>
    <div class="ml-7 mt-3 text-sm space-y-2">
      <div v-for="sentence in sentencesError" :key="sentence.key">
        <span class="font-semibold text-gray-900">[{{ sentence.key }}] {{ sentence.score * 100 | formatNumber("0.[00]") }}</span> : {{ sentence.text }}
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
      return this.sentencesWithKeyAndScore.filter(item => item.score > 0.87 && item.score < 0.95)
    },
    sentencesError () {
      return this.sentencesWithKeyAndScore.filter(item => item.score <= 0.87)
    },
    textToAnalyze () {
      let text = this.mission.name + '|' + this.mission.objectif + '|' + this.mission.description + '|' + this.mission.information + (this.mission.prerequisites ? '|' + this.mission.prerequisites.join(' | ') : '')
      text = text.replace(/<\/li>/g, '</li>|')
      text = text.replace(/<\/?[^>]+(>|$)/g, '')
      return text
    },
    score () {
      return this.response.global * 100
    }
  }
}
</script>
