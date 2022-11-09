<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Tableau de bord', to: '/dashboard' },
        { text: 'Activités', to: '/admin/contenus/activites' },
        { text: activity.name },
      ]"
    />
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12">
      <div class="lg:col-span-3 space-y-6">
        <Box class="overflow-hidden" :padding="false">
          <Banner :activity="activity" :show-breadcrumb="false" :show-search="false" />
        </Box>
        <Box class="overflow-hidden" :padding="false">
          <Associations
            :activity="activity"
          />
        </Box>
        <Box class="overflow-hidden" :padding="false">
          <Engagement :activity="activity" />
        </Box>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <Heading :level="1" class="mb-4">
              Activité <span class=" font-normal text-gray-500 text-2xl">#{{ activity.id }}</span>
            </Heading>
            <div class="flex items-center space-x-4">
              <OnlineIndicator :published="activity.is_published" :link="activity.full_url" />
            </div>
          </div>
          <nuxt-link :to="`/admin/contenus/activites/${activity.id}/edit`">
            <Button icon="PencilIcon">
              Modifier
            </Button>
          </nuxt-link>
        </div>
        <client-only>
          <Tabs
            :tabs="[
              { name: 'Informations', to: '', icon: 'InformationCircleSolidIcon', current: $route.hash === '' },
              { name: 'Historique', to: '#historique', icon: 'ClockIcon', current: $route.hash === '#historique' }
            ]"
          />
          <div v-if="$route.hash === ''" class="space-y-8">
            <BoxInformations :activity="activity" />
            <BoxMission :activity="activity" :stats="stats" />
            <BoxParticipation :activity="activity" :stats="stats" />
          </div>
          <History v-if="$route.hash === '#historique'" :model-id="activity.id" model-type="activity" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History'
import OnlineIndicator from '~/components/custom/OnlineIndicator'
import BoxInformations from '@/components/section/activity/BoxInformations'
import BoxMission from '@/components/section/activity/BoxMission'
import BoxParticipation from '@/components/section/activity/BoxParticipation'
import Banner from '@/components/section/activity/Banner'
import Associations from '@/components/section/activity/Associations'
import Engagement from '@/components/section/activity/Engagement'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default {
  components: {
    OnlineIndicator,
    BoxInformations,
    BoxMission,
    BoxParticipation,
    History,
    Banner,
    Associations,
    Engagement,
    Breadcrumb
  },
  middleware: 'admin',
  async asyncData ({ $axios, params, error, store }) {
    const { data: activity } = await $axios.get(`/activities/${params.id}`)
    if (!activity) {
      return error({ statusCode: 404 })
    }

    const { data: stats } = await $axios.get(`/activities/${params.id}/statistics`)

    return {
      activity,
      stats
    }
  },
  data () {
    return {
    }
  },
  async fetch () {

  },
  methods: {

  }
}
</script>
