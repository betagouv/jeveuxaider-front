<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Missions', link: '/admin/missions' },
        { label: mission.name },
      ]"
    />
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 py-12">
      <div class="lg:col-span-3 space-y-6">
        <Presentation :mission="mission" />
        <PresentielOrDistance :mission="mission" />
        <Details :mission="mission" />
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1">
              Mission <span class=" font-normal text-gray-500 text-2xl">#{{ mission.id }}</span>
            </Heading>
            <nuxt-link class="flex items-center space-x-2 mt-2" target="_blank" :to="`/missions-benevolat/${mission.id}/${mission.slug}`">
              <div
                :class="['h-3 w-3 rounded-full', hasPageOnline ? 'bg-jva-green-500' : 'bg-jva-red-500']"
              />
              <div class="underline text-sm">
                {{ hasPageOnline ? 'En ligne' : 'Hors ligne' }}
              </div>
              <ExternalLinkIcon class="h-4 w-4" />
            </nuxt-link>
          </div>
          <nuxt-link :to="`/admin/missions/${mission.id}/edit`">
            <Button icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
        </div>
        <Tabs
          :tabs="[
            { name: 'Informations', to: '', icon: 'InformationCircleIcon', current: !$route.hash },
            { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash == '#historique' }
          ]"
        />
        <div v-if="!$route.hash" class="space-y-8">
          <BoxPlace :mission="mission" />
          <BoxEnChiffre :mission="mission" />
          <BoxInformations :mission="mission" />
          <BoxResponsable :mission="mission" />
        </div>
        <History v-if="$route.hash == '#historique'" :model-id="mission.id" model-type="mission" />
      </div>
    </div>
  </div>
</template>

<script>
import PresentielOrDistance from '@/components/section/mission/PresentielOrDistance.vue'
import Presentation from '@/components/section/mission/Presentation.vue'
import Details from '@/components/section/mission/Details.vue'
import BoxPlace from '@/components/section/mission/BoxPlace.vue'
import BoxResponsable from '@/components/section/mission/BoxResponsable.vue'
import BoxInformations from '@/components/section/mission/BoxInformations.vue'
import BoxEnChiffre from '@/components/section/mission/BoxEnChiffre.vue'
import History from '@/components/section/History.vue'
import MixinMission from '@/mixins/mission'

export default {
  components: {
    PresentielOrDistance,
    Presentation,
    Details,
    BoxPlace,
    BoxResponsable,
    BoxInformations,
    BoxEnChiffre,
    History
  },
  mixins: [MixinMission],
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

    const { data: mission } = await $axios.get(`/missions/${params.id}`)
    if (!mission) {
      return error({ statusCode: 404 })
    }

    if (store.getters.contextRole == 'responsable') {
      if (store.getters.contextableId != mission.structure_id) {
        return error({ statusCode: 403 })
      }
    }

    return {
      mission
    }
  }
}
</script>
