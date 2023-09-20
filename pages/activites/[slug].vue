<template>
  <div>
    <ClientOnly>
      <Teleport v-if="!activity.is_published" to="#teleport-header-top">
        <transition name="fade">
          <BaseBanner>
            L'activité n'est pas visible car elle est non publiée
            <template #action>
              <DsfrLink
                icon="RiArrowRightLine"
                :to="`/admin/contenus/activites/${activity.id}/edit`"
              >
                Gérer
              </DsfrLink>
            </template>
          </BaseBanner>
        </transition>
      </Teleport>
    </ClientOnly>

    <ActivityBanner :activity="activity" />
    <Search :activity="activity" />
    <Promote :activity="activity" class="mb-24" />
    <Associations :activity="activity" />
    <Engagement :activity="activity" />
    <Subscribe :activity="activity" />
  </div>
</template>

<script>
import ActivityBanner from '@/components/section/activity/Banner'
import Search from '@/components/section/activity/Search'
import Promote from '@/components/section/activity/Promote'
import Associations from '@/components/section/activity/Associations'
import Engagement from '@/components/section/activity/Engagement'
import Subscribe from '@/components/section/activity/Subscribe'

export default defineNuxtComponent({
  components: {
    ActivityBanner,
    Search,
    Promote,
    Associations,
    Engagement,
    Subscribe,
  },
  async setup() {
    const { $stores } = useNuxtApp()
    const route = useRoute()
    const { data: activity, error } = await useApiFetch(`/activities/${route.params.slug}`)

    if (error.value) {
      showError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      })
    }
    if (!activity.value) {
      showError({
        statusCode: 404,
      })
    }
    if ($stores.auth.contextRole !== 'admin' && !activity.value.is_published) {
      return error({ statusCode: 403 })
    }

    const title = activity.value.metatags?.properties?.title ?? `Bénévolat ${activity.value.name}`
    useHead({
      title: `${title} | JeVeuxAider.gouv.fr`,
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr${activity.value.full_url}`,
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            activity.value.metatags?.properties?.description ??
            `Trouvez une mission de bénévolat ${activity.value.name} parmi les missions actuellement disponibles et faites vivre l'engagement de chacun pour tous`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg',
        },
      ],
    })

    return {
      activity,
    }
  },
})
</script>

<style lang="postcss" scoped>
:deep(.section-associations) {
  @apply pt-8 lg:pt-12;
}
</style>