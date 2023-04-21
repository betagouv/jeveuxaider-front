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

        <Disclosure v-if="collectivityHasDoublon">
          <template #button="{ isOpen }">
            <div class="flex font-semibold text-sm items-center group">
              <div class="flex items-center flex-shrink-0 group-hover:text-gray-600">
                <RiAlertFill class="h-5 w-5 text-yellow-600 fill-current mr-2" aria-hidden="true" /> Potentiel doublon : {{ doublonsCollectivities.total }}
              </div>
              <div class="w-full border-t mt-1 mx-2" />
              <MinusCircleIcon v-if="isOpen" class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
              <PlusCircleIcon v-else class="text-gray-400 group-hover:text-gray-600 h-5 w-5 flex-shrink-0 mt-0.5" />
            </div>
          </template>
          <div class="ml-7 mt-3 text-sm text-gray-500 space-y-2">
            <div>{{ doublonsCollectivities.total }} collectivité(s) avec un nom similaire.</div>
            <div>
              <nuxt-link
                v-for="collectivity in doublonsCollectivities.data.filter((item) => item.id !== organisation.id)"
                :key="collectivity.id"
                :to="`/admin/organisations/${collectivity.id}`"
                class="flex hover:underline hover:text-jva-blue-500"
                target="_blank"
              >
                #{{ collectivity.id }} - {{ collectivity.name }} ›
              </nuxt-link>
            </div>
            <div>
              <nuxt-link class="underline" :to="`/admin/organisations?filter[search]=${organisation.name}&filter[statut_juridique]=Collectivité`" target="_blank">
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
      doublonAlgoliaOrganisations: [],
      doublonsCollectivities: []
    }
  },
  async fetch () {
    this.loading = true

    if (this.organisation.statut_juridique !== 'Collectivité') {
      const { data: response } = await this.$axios.post('/algolia/organisations', {
        search: this.organisation.name,
        filters: `id != ${this.organisation.id}`
      })
      this.doublonAlgoliaOrganisations = response
    } else {
      const { data: response } = await this.$axios.get('/structures', {
        params: {
          'filter[search]': this.organisation.name,
          'filter[statut_juridique]': this.organisation.statut_juridique
        }
      })
      this.doublonsCollectivities = response
    }

    this.loading = false
  },
  computed: {
    needSiret () {
      return this.organisation.statut_juridique === 'Association' && !this.organisation.siret
    },
    organisationHasDoublon () {
      return this.organisation.statut_juridique !== 'Collectivité' && this.doublonAlgoliaOrganisations.total > 0
    },
    collectivityHasDoublon () {
      return this.organisation.statut_juridique === 'Collectivité' && this.doublonsCollectivities.total > 1
    }
  }
}
</script>
