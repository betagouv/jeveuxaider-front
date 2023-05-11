<template>
  <Box padding="sm" :loading="loading">
    <template #header>
      <div class="flex gap-6 border-b border-gray-100 pb-6 mb-6">
        <div class="bg-[#E9F7FF] border-[#CCE0EB] border h-[56px] w-[56px] flex-none flex items-center justify-center">
          <div class="text-[30px]">
            🧞‍♂️
          </div>
        </div>
        <div>
          <div class="text-lg text-gray-900 font-bold">
            On peut vous aider à modérer ?
          </div>
          <div class="text-sm text-gray-600">
            Vérifiez les alertes remontées par l’outil 🔍
          </div>
        </div>
      </div>
    </template>
    <div v-if="hasResults" class="grid grid-cols-1 gap-6">
      <DisclosureModerationAI :organisation="organisation" />
      <DisclosureWarningWords :organisation="organisation" />

      <Disclosure v-if="organisationHasDuplicates">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" /> Potentiel doublon : {{ duplicatesOrganisations.total }}
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500 space-y-2">
          <div>{{ duplicatesOrganisations.total }} organisation(s) validée(s) avec un nom similaire.</div>
          <div>
            <nuxt-link
              v-for="algoliaOrganisation in duplicatesOrganisations.data"
              :key="algoliaOrganisation.id"
              :to="`/admin/organisations/${algoliaOrganisation.id}`"
              class="flex hover:underline hover:text-jva-blue-500"
              target="_blank"
            >
              #{{ algoliaOrganisation.id }} - {{ algoliaOrganisation.name }} ›
            </nuxt-link>
          </div>
          <div>
            <nuxt-link class="underline" :to="`/organisations?search=${organisation.name}`" target="_blank">
              Visualiser les potentiels doublons ›
            </nuxt-link>
          </div>
        </div>
      </Disclosure>

      <Disclosure v-if="needRNA">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" /> RNA manquant
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          Le numéro RNA n'a pas été communiqué
          <template v-if="organisation.is_alsace_moselle">
            car le responsable a précisé être une association de droit local (Alsace-Moselle)
          </template>.
        </div>
      </Disclosure>
    </div>
    <div v-else class="text-sm text-gray-500">
      Rien à signaler, tout semble correct, mais rien ne vaut une vérification humaine.
    </div>
  </Box>
</template>

<script>
import DisclosureModerationAI from '~/components/section/organisation/DisclosureModerationAI.vue'
import DisclosureWarningWords from '~/components/section/organisation/DisclosureWarningWords.vue'
import MixinAideModeration from '@/mixins/organisation-aide-moderation'

export default {
  components: {
    DisclosureModerationAI,
    DisclosureWarningWords
  },
  mixins: [MixinAideModeration],
  props: {
    organisation: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: 'Aide à la modération'
    }
  },
  data () {
    return {
      loading: false
    }
  },
  async fetch () {
    this.loading = true
    await Promise.all([
      this.fetchAlgoliaOrganisations(),
      this.fetchAIReportScore()
    ]).finally(() => {
      this.loading = false
    })
  }
}
</script>
