<template>
  <div>
    <Disclosure>
      <template #button="{ isOpen }">
        <div class="flex font-semibold text-sm items-center group">
          <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
            <RiAlertFill class="h-5 w-5 text-[#C9191E] fill-current mr-2" aria-hidden="true" />
            Le contenu présente un risque
          </div>
          <div class="w-full border-t mt-1 mx-2" />
          <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
        </div>
      </template>
      <div v-if="sentencesWithWords.length > 0" class="ml-7 mt-3 text-sm space-y-4 text-gray-500">
        <ul class="pl-5 space-y-4">
          <li
            v-for="sentence,i in sentencesWithWords"
            :key="i"
            class="list-disc italic"
            v-html="` ... ${highlightSentenceWithWordToCheck(sentence) } ...`"
          />
        </ul>
        <div class="text-xs bg-gray-50 px-2 py-2 rounded">
          <RiInformationLine class="text-gray-400 fill-current h-4 w-4 inline " /> Des mots clés potentiellement “à risque” ont été détectés. Une vérification humaine est nécessaire.
        </div>
      </div>
    </Disclosure>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: true,
      wordsToCheck: [
        'travail',
        'emploi',
        'job',
        'salaire',
        'cdi',
        'service civique',
        '35h',
        'rémunération',
        'culte',
        'religion',
        'frais d’adhésion',
        'adhésion',
        'mécénat de compétences',
        'adhésion obligatoire',
        'service national universel',
        'snu',
        'stage',
        'cdd',
        'contrat'
      ]
    }
  },
  computed: {
    textWithoutTags () {
      return this.text.replace(/<\/li>/g, '</li> | ').replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '')
    },
    sentences () {
      return this.textWithoutTags.split(/[.?!|]\s+/)
    },
    sentencesWithWords () {
      return this.sentences.filter(sentence => this.wordsToCheck.some(word => sentence.toLowerCase().includes(word)))
    }
  },
  mounted () {
    if (this.sentencesWithWords.length > 0) {
      this.$emit('words-detected')
    }
  },
  methods: {
    highlightSentenceWithWordToCheck (sentence) {
      const regex = new RegExp(`(${this.wordsToCheck.join('|')})`, 'gi')
      return sentence.replace(regex, '<span class="bg-yellow-300 text-gray-900">$1</span>')
    }
  }
}
</script>
