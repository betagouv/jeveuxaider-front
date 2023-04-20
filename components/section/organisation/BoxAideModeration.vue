<template>
  <div>
    <div class="text-sm flex justify-between px-2 mb-2 items-center">
      <div class="flex uppercase font-semibold text-gray-600">
        <RiFlashlightLine class="h-5 w-5 fill-current mr-2" aria-hidden="true" /> Aide à la modération
      </div>
      <slot name="action" />
    </div>

    <Box variant="flat" padding="xs">
      <div class="flex space-y-2 flex-col">
        <Disclosure v-if="hasPotentialDoublon">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiAlertFill class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" /> Potentiel doublon : {{ algoliaOrganisations.total }}
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm text-gray-500 space-y-2">
            <div>{{ algoliaOrganisations.total }} organisations validées ont le même nom ou un nom similaire.</div>
            <div>
              <nuxt-link
                v-for="algoliaOrganisation in algoliaOrganisations.data"
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

        <Disclosure v-if="!organisation.siret">
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
      </div>
    </Box>
  </div>
</template>

<script>
export default {
  components: {
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
      algoliaOrganisations: []
    }
  },
  async fetch () {
    this.loading = true
    const { data: response } = await this.$axios.post('/algolia/organisations', {
      search: this.organisation.name
    })
    this.algoliaOrganisations = response
    this.loading = false
  },
  computed: {
    hasPotentialDoublon () {
      return this.algoliaOrganisations.total > 0
    }
  }
}
</script>
