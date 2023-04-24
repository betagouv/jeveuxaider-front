<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="flex uppercase font-semibold text-gray-600">
        <RiFlashlightLine class="h-5 w-5 fill-current mr-2" aria-hidden="true" /> Aide à la modération
      </div>
      <slot name="action" />
    </div>

    <Box variant="flat" padding="xs" :loading="loading">
      <div v-if="hasResults" class="flex space-y-2 flex-col">
        <Disclosure v-if="organisationHasDoublon">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiAlertFill class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" /> Potentiel doublon : {{ doublonAlgoliaOrganisations.total }}
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
                <RiAlertFill class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" /> SIRET manquant
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
  </div>
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
