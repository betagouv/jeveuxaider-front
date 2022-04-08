<template>
  <div>
    <Banner :activity="activity" />
    <Search :activity="activity" />
    <Promote :activity="activity" class="-mb-32" />
    <Associations :activity="activity" />
    <Engagement :activity="activity" />
    <Subscribe :activity="activity" />
  </div>
</template>

<script>
import Banner from '@/components/section/activity/Banner'
import Search from '@/components/section/activity/Search'
import Promote from '@/components/section/activity/Promote'
import Associations from '@/components/section/activity/Associations'
import Engagement from '@/components/section/activity/Engagement'
import Subscribe from '@/components/section/activity/Subscribe'

export default {
  components: {
    Banner,
    Search,
    Promote,
    Associations,
    Engagement,
    Subscribe
  },
  async asyncData ({ $axios, params, error, store }) {
    const { data: activity } = await $axios.get(`/activities/${params.slug}`)

    console.log('activity', activity)

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
    return {
      title: `Bénévolat ${this.activity.name} | JeVeuxAider.gouv.fr`,
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
          content: `Trouvez une mission de bénévolat ${this.activity.name} parmi les missions actuellement disponibles et faites vivre l'engagement de chacun pour tous`
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
