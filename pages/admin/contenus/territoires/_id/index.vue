<template>
  <div class="container">
    <Breadcrumb
      :items="[
        { label: 'Tableau de bord', link: '/dashboard' },
        { label: 'Territoires', link: '/admin/contenus/territoires' },
        { label: territoire.name },
      ]"
    />
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 py-12">
      <div class="lg:col-span-3 space-y-6">
        MON CONTENU ICI
        <!-- <Presentation :mission="mission" />
        <PresentielOrDistance :mission="mission" />
        <Details :mission="mission" /> -->
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1">
              Territoire <span class=" font-normal text-gray-500 text-2xl">#{{ territoire.id }}</span>
            </Heading>
            <OnlineIndicator :published="territoire.is_published" :link="territoire.full_url" class="mt-2" />
          </div>
          <nuxt-link :to="`/admin/contenues/territoires/${territoire.id}/edit`">
            <Button icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
        </div>
        <Tabs
          :tabs="[
            { name: 'Informations', to: '', icon: 'InformationCircleIcon', current: !$route.hash },
            { name: 'Responsables', to: '#responsables', icon: 'InformationCircleIcon', current: $route.hash == '#responsables' },
            { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash == '#historique' }
          ]"
        />
        <div v-if="!$route.hash" class="space-y-8">
          <BoxInformations :territoire="territoire" />
          <BoxMission :territoire="territoire" :stats="stats" />
          <BoxParticipation :territoire="territoire" :stats="stats" />
        </div>
        <History v-if="$route.hash == '#historique'" :model-id="territoire.id" model-type="territoire" />
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History'
import OnlineIndicator from '~/components/custom/OnlineIndicator'
import BoxInformations from '@/components/section/territoire/BoxInformations'
import BoxMission from '@/components/section/territoire/BoxMission'
import BoxParticipation from '@/components/section/territoire/BoxParticipation'

export default {
  components: {
    OnlineIndicator,
    BoxInformations,
    BoxMission,
    BoxParticipation,
    History
  },
  layout: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: territoire } = await $axios.get(`/territoires/${params.id}`)
    if (!territoire) {
      return error({ statusCode: 404 })
    }

    if (store.getters.contextRole == 'responsable_territoire') {
      if (store.getters.contextableId != territoire.id) {
        return error({ statusCode: 403 })
      }
    }

    const { data: stats } = await $axios.get(`/territoires/${params.id}/statistics`)

    return {
      territoire,
      stats
    }
  }
}
</script>
