<template>
  <div class="container">
    <Breadcrumb
      :links="[
        { text: 'Administration', to: '/admin' },
        { text: 'Activités', to: '/admin/contenus/activites' },
        { text: activity.name },
      ]"
    />
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-12">
      <div class="lg:col-span-3 space-y-6">
        <BaseBox class="overflow-hidden" :padding="false">
          <Banner :activity="activity" :show-breadcrumb="false" :show-search="false" />
        </BaseBox>
        <BaseBox class="overflow-hidden" :padding="false">
          <Associations :activity="activity" />
        </BaseBox>
        <BaseBox class="overflow-hidden" :padding="false">
          <Engagement :activity="activity" />
        </BaseBox>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-start justify-between">
          <div>
            <BaseHeading :level="1" class="mb-4">
              Activité
              <span class="font-normal text-gray-500 text-2xl">#{{ activity.id }}</span>
            </BaseHeading>
            <div class="flex items-center space-x-4">
              <OnlineIndicator :published="activity.is_published" :link="activity.full_url" />
            </div>
          </div>
          <nuxt-link :to="`/admin/contenus/activites/${activity.id}/edit`">
            <BaseButton icon="RiPencilLine"> Modifier </BaseButton>
          </nuxt-link>
        </div>
        <ClientOnly>
          <BaseTabs
            :tabs="[
              {
                name: 'Informations',
                to: '#infos',
                icon: 'RiInformationFill',
                current: $route.hash === '#infos' || !$route.hash,
              },
              {
                name: 'Historique',
                to: '#historique',
                icon: 'RiTimeFill',
                current: $route.hash === '#historique',
              },
            ]"
          />

          <div v-if="$route.hash === '#infos' || !$route.hash" class="space-y-8">
            <BoxInformations :activity="activity" />
            <BoxMission :activity="activity" :stats="stats" />
            <BoxParticipation :activity="activity" :stats="stats" />
          </div>
          <History
            v-if="$route.hash === '#historique'"
            :model-id="activity.id"
            model-type="activity"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/components/section/History'
import OnlineIndicator from '@/components/custom/OnlineIndicator'
import BoxInformations from '@/components/section/activity/BoxInformations'
import BoxMission from '@/components/section/activity/BoxMission'
import BoxParticipation from '@/components/section/activity/BoxParticipation'
import Banner from '@/components/section/activity/Banner'
import Associations from '@/components/section/activity/Associations'
import Engagement from '@/components/section/activity/Engagement'
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    OnlineIndicator,
    BoxInformations,
    BoxMission,
    BoxParticipation,
    History,
    Banner,
    Associations,
    Engagement,
    Breadcrumb,
  },
  async setup() {
    definePageMeta({
      middleware: ['admin'],
    })

    const route = useRoute()
    let activity = null
    let stats = null

    const fetchActivity = async () => {
      const { data } = await useApiFetch(`/activities/${route.params.id}`)
      activity = data
    }
    const fetchStats = async () => {
      const { data } = await useApiFetch(`/activities/${route.params.id}/statistics`)
      stats = data
    }

    await Promise.all([fetchActivity(), fetchStats()])
    if (!activity.value) {
      return showError({ statusCode: 404 })
    }

    return {
      activity,
      stats,
    }
  },
})
</script>
