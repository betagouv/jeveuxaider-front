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
            Alertes, points de vigilance, l’IA c’est plus fort que toi.
          </div>
        </div>
      </div>
    </template>
    <div v-if="hasResults" class="flex space-y-6 flex-col">
      <Disclosure v-if="organisationHasDoublon">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" /> Potentiel doublon : {{ doublonAlgoliaOrganisations.total }}
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500 space-y-2">
          <div>{{ doublonAlgoliaOrganisations.total }} organisation(s) validée(s) avec un nom similaire.</div>
          <div>
            <nuxt-link
              v-for="algoliaOrganisation in doublonAlgoliaOrganisations.data"
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

      <Disclosure v-if="needSiret">
        <template #button="{ isOpen }">
          <div class="flex font-semibold text-sm items-center group">
            <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
              <RiAlertFill class="h-5 w-5 text-[#FA7A35] fill-current mr-2" aria-hidden="true" /> SIRET manquant
            </div>
            <div class="w-full border-t mt-1 mx-2" />
            <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
          </div>
        </template>
        <div class="ml-7 mt-3 text-sm text-gray-500">
          Le SIRET n'a pas été communiqué
        </div>
      </Disclosure>

      <DisclosureModerationAI :organisation="organisation" />
    </div>
    <div v-else class="text-sm text-gray-500">
      Rien à signaler
    </div>
  </Box>
</template>

<script>
import DisclosureModerationAI from '~/components/section/organisation/DisclosureModerationAI.vue'

export default {
  components: {
    DisclosureModerationAI
  },
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
      loading: true,
      doublonAlgoliaOrganisations: []
    }
  },
  async fetch () {
    this.loading = true

    const { data: response } = await this.$axios.post('/algolia/organisations', {
      search: this.organisation.name,
      filters: `id != ${this.organisation.id}`
    })
    this.doublonAlgoliaOrganisations = response

    this.loading = false
  },
  computed: {
    hasResults () {
      return this.needSiret || this.organisationHasDoublon || this.collectivityHasDoublon
    },
    needSiret () {
      return this.organisation.statut_juridique === 'Association' && !this.organisation.siret
    },
    organisationHasDoublon () {
      return this.organisation.statut_juridique !== 'Collectivité' && this.doublonAlgoliaOrganisations.total > 0
    }
  }
}
</script>
