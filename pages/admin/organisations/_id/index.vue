<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Organisations', link: '/admin/organisations' },
        { label: organisation.name },
      ]"
    />
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 py-12">
      <div class="lg:col-span-3 space-y-6">
        <Box class="relative z-10">
          <div class="flex justify-between mb-6">
            <div class="flex flex-wrap gap-2">
              <Badge
                class="uppercase"
                color="sante"
              >
                Santé
              </Badge>
              <Badge
                class="uppercase"
                color="gray-light"
              >
                Éducation
              </Badge>
            </div>
            <div>Share todo</div>
          </div>
          <Heading as="h1" :level="1">
            {{ organisation.name }}
          </Heading>
          <div class="flex items-center gap-4 mb-4">
            <div
              class="flex-none font-bold text-xs uppercase text-gray-500"
            >
              Publics aidés
            </div>
            <hr class="text-gray-200 w-full">
          </div>
          <div class="flex flex-wrap gap-2">
            <Badge

              class="uppercase"
            >
              Personnes âgés
            </Badge>
            <Badge

              class="uppercase"
            >
              Personnes handicapées
            </Badge>
          </div>
        </Box>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1">
              Organisation <span class=" font-normal text-gray-500 text-2xl">#{{ organisation.id }}</span>
            </Heading>
            <nuxt-link class="flex items-center space-x-2 mt-2" target="_blank" :to="`/organisations/${organisation.slug}`">
              <div
                :class="['h-3 w-3 rounded-full', hasPageOnline ? 'bg-jva-green-500' : 'bg-jva-red-500']"
              />
              <div class="underline text-sm">
                {{ hasPageOnline ? 'En ligne' : 'Hors ligne' }}
              </div>
              <ExternalLinkIcon class="h-4 w-4" />
            </nuxt-link>
          </div>
          <nuxt-link :to="`/admin/organisations/${organisation.id}/edit`">
            <Button icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
        </div>
        <Tabs
          :tabs="[
            { name: 'Informations', to: '', icon: 'InformationCircleIcon', current: !$route.hash },
            { name: 'Membres', to: '#membres', icon: 'UsersIcon', current: $route.hash == '#membres' },
            { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash == '#historique' }
          ]"
        />
        <div v-if="!$route.hash" class="space-y-8">
          <!-- <BoxPlace :mission="mission" />
          <BoxEnChiffre :mission="mission" />
          <BoxInformations :mission="mission" />
          <BoxResponsable :mission="mission" /> -->
        </div>
        <History v-if="$route.hash == '#historique'" :model-id="organisation.id" model-type="structure" />
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History.vue'
import MixinOrganisation from '@/mixins/organisation'

export default {
  components: {
    History
  },
  mixins: [MixinOrganisation],
  layout: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    if (
      ![
        'admin',
        'referent',
        'referent_regional',
        'tete_de_reseau',
        'responsable'
      ].includes(store.getters.contextRole)
    ) {
      return error({ statusCode: 403 })
    }

    const { data: organisation } = await $axios.get(`/structure/${params.id}`)
    if (!organisation) {
      return error({ statusCode: 404 })
    }

    if (store.getters.contextRole == 'responsable') {
      if (store.getters.contextableId != organisation.id) {
        return error({ statusCode: 403 })
      }
    }

    return {
      organisation
    }
  }
}
</script>
