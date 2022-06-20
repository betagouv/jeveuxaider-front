<template>
  <div>
    <client-only>
      <portal v-if="!activity.is_published" to="header-top">
        <transition name="fade">
          <Banner icon="ExclamationIcon">
            L'activité n'est pas visible car elle est non publiée
            <template #action>
              <nuxt-link :to="`/admin/contenus/activites/${activity.id}/edit`">
                <Button variant="white">
                  Gérer
                </Button>
              </nuxt-link>
            </template>
          </Banner>
        </transition>
      </portal>
    </client-only>
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

export default {
  components: {
    ActivityBanner,
    Search,
    Promote,
    Associations,
    Engagement,
    Subscribe
  },
  async asyncData ({ $axios, params, error, store }) {
    const { data: activity } = await $axios.get(`/activities/${params.slug}`)

    if (!activity) {
      return error({ statusCode: 404 })
    }

    if (
      store.getters.contextRole !== 'admin' && !activity.is_published) {
      return error({ statusCode: 403 })
    }

    return {
      activity
    }
  },
  head () {
    const title = this.activity.metatags?.properties?.title ?? `Bénévolat ${this.activity.name}`
    return {
      title: `${title} | JeVeuxAider.gouv.fr`,
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr${this.activity.full_url}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.activity.metatags?.properties?.description ?? `Trouvez une mission de bénévolat ${this.activity.name} parmi les missions actuellement disponibles et faites vivre l'engagement de chacun pour tous`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
::v-deep .section-associations {
  @apply pt-40;
}

</style>
