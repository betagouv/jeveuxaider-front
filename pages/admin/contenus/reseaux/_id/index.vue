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
        <Box class="overflow-hidden" :padding="false">
          <Banner :territoire="territoire" :show-breadcrumb="false" :show-search="false" />
        </Box>
        <Box class="overflow-hidden opacity-25" :padding="false">
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO ORGANISATIONS PARTENAIRES
          </div>
          <Associations
            v-if="territoire.promoted_organisations && territoire.promoted_organisations.length"
            :territoire="territoire"
          />
        </Box>
        <Box class="overflow-hidden opacity-25" :padding="false">
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO SEO
          </div>
          <Engagement :territoire="territoire" />
        </Box>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1">
              Territoire <span class=" font-normal text-gray-500 text-2xl">#{{ territoire.id }}</span>
            </Heading>
            <OnlineIndicator :published="territoire.is_published" :link="territoire.full_url" class="mt-2" />
          </div>
          <nuxt-link :to="`/admin/contenus/territoires/${territoire.id}/edit`">
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
        <template v-if="$route.hash == '#responsables'">
          <div class="space-y-2">
            <Box v-for="responsable in territoire.responsables" :key="responsable.id" variant="flat" padding="xs">
              <DescriptionList v-if="responsable">
                <DescriptionListItem term="Nom" :description="responsable.full_name" />
                <DescriptionListItem term="E-mail" :description="responsable.email" />
                <DescriptionListItem term="Mobile" :description="responsable.mobile" />
              </DescriptionList>
            </Box>
            <Button variant="white" class="opacity-50">
              <UsersIcon class="h-4 w-4 mr-2" /> Inviter un membre
            </Button>
          </div>
        </template>
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
import Banner from '@/components/section/territoire/Banner'
import Associations from '@/components/section/territoire/Associations'
import Engagement from '@/components/section/territoire/Engagement'

export default {
  components: {
    OnlineIndicator,
    BoxInformations,
    BoxMission,
    BoxParticipation,
    History,
    Banner,
    Associations,
    Engagement
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
