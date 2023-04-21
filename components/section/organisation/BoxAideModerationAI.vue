<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="flex uppercase font-semibold text-gray-600">
        <RiFlashlightLine class="h-5 w-5 fill-current mr-2" aria-hidden="true" /> Score de modération
      </div>
      <slot name="action" />
    </div>

    <Box variant="flat" padding="xs" :loading="loading">
      <div v-if="hasResults" class="flex space-y-2 flex-col">
        <Disclosure>
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiCloseLine v-if="score <= 85" class="h-5 w-5 text-red-600 fill-current mr-2" aria-hidden="true" />
                <RiAlertFill v-else-if="score < 95" class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" />
                <RiCheckLine v-else class="h-5 w-5 text-green-700 fill-current mr-2" aria-hidden="true" />
                Score de modération : {{ score | formatNumber("0.[00]") }}
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm space-y-2">
            <div>Success: score au dessus de 95%</div>
            <div>Warning: score entre 85% et 95%</div>
            <div>Error: score en dessous de 85%</div>
          </div>
        </Disclosure>
        <Disclosure>
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiCloseLine class="h-5 w-5 text-red-600 fill-current mr-2" aria-hidden="true" />
                Phrases errors : {{ sentencesError.length }}
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm space-y-2">
            <div v-for="sentence,key in sentencesError" :key="key">
              <span class="font-semibold text-gray-900">{{ response.scores[key] * 100 | formatNumber("0.[00]") }}</span> : {{ sentence.value }}
            </div>
          </div>
        </Disclosure>
        <Disclosure>
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiAlertFill class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" />
                Phrases warning : {{ sentencesWarning.length }}
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm space-y-2">
            <div v-for="sentence,key in sentencesWarning" :key="key">
              <span class="font-semibold text-gray-900">{{ response.scores[key] * 100 | formatNumber("0.[00]") }}</span> : {{ sentence.value }}
            </div>
          </div>
        </Disclosure>

        <Disclosure>
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiCheckLine class="h-5 w-5 text-green-700 fill-current mr-2" aria-hidden="true" />
                Phrases success : {{ sentencesSuccess.length }}
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm space-y-2">
            <div v-for="sentence,key in sentencesSuccess" :key="key">
              <span class="font-semibold text-gray-900">{{ response.scores[key] * 100 | formatNumber("0.[00]") }}</span> : {{ sentence.value }}
            </div>
          </div>
        </Disclosure>
      </div>
      <div v-else class="text-sm text-gray-500">
        Rien à signaler
      </div>
    </Box>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },
  props: {
    organisation: {
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
    const { data: response } = await axios.post(this.$config.ai.organisationModerationUrl, {
      text: this.textToAnalyze
    })
    this.response = response
    console.log('AI response', response)
    this.loading = false
  },
  computed: {
    scores () {
      return this.response.scores.map((item, key) => ({ value: item, key }))
    },
    indexScoresSuccess () {
      return this.scores.filter(item => item.value >= 0.95)
    },
    indexScoresWarning () {
      return this.scores.filter(item => item.value > 0.85 && item.value < 0.95)
    },
    indexScoresError () {
      return this.scores.filter(item => item.value <= 0.85)
    },
    sentences () {
      return this.response.sentences.map((item, key) => ({ value: item, key }))
    },
    sentencesSuccess () {
      return this.sentences.filter(item => this.indexScoresSuccess.find(score => score.key == item.key))
    },
    sentencesWarning () {
      return this.sentences.filter(item => this.indexScoresWarning.find(score => score.key == item.key))
    },
    sentencesError () {
      return this.sentences.filter(item => this.indexScoresError.find(score => score.key == item.key))
    },
    textToAnalyze () {
      let text = this.organisation.name + '|' + this.organisation.description
      text = text.replace(/<\/li>/g, '</li>|')
      text = text.replace(/<\/?[^>]+(>|$)/g, '')
      return text
    },
    score () {
      return this.response.global * 100
    },
    hasResults () {
      return this.response
    }
  }
}
</script>
