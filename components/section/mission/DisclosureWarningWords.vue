<template>
  <BaseDisclosure v-if="sentencesWithBlacklistedWords?.length > 0">
    <template #button="{ isOpen }">
      <div class="flex font-semibold text-sm items-center group">
        <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
          <RiAlertFill class="h-5 w-5 text-[#C9191E] fill-current mr-2" aria-hidden="true" />
          Le contenu présente un risque
        </div>
        <div class="w-full border-t mt-1 mx-2" />
        <RiIndeterminateCircleLine
          v-if="isOpen"
          class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
        />
        <RiAddCircleLine
          v-else
          class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5"
        />
      </div>
    </template>
    <div class="ml-7 mt-3 text-sm space-y-4 text-gray-500">
      <ul class="pl-5 space-y-4">
        <li
          v-for="(sentence, i) in sentencesWithBlacklistedWords"
          :key="i"
          class="list-disc italic"
          v-html="` ... ${highlightBlacklistedWordInSentence(sentence)} ...`"
        />
      </ul>
      <div class="text-xs bg-gray-50 px-2 py-2 rounded">
        <RiInformationLine class="text-gray-400 fill-current h-4 w-4 inline" />
        L’outil détecte des mots clés qui peuvent présenter un risque. Par exemple, les mots stage,
        CDD, CDI, 35h seront mis en avant. Une vérification humaine est nécessaire.
      </div>
    </div>
  </BaseDisclosure>
</template>

<script>
import MixinAideModeration from '@/mixins/mission-aide-moderation'

export default defineNuxtComponent({
  mixins: [MixinAideModeration],
  props: {
    mission: {
      type: Object,
      required: true,
    },
  },
  methods: {
    highlightBlacklistedWordInSentence(sentence) {
      const regex = new RegExp(`(${this.blacklistedWords.join('|')})`, 'gi')
      return sentence.replace(regex, '<span class="bg-yellow-300 text-gray-900">$1</span>')
    },
  },
})
</script>
