<template>
  <div>
    <MissionApiPage v-if="mission.isFromApi" :mission="mission" />
    <div v-else>
      Redirection en cours
    </div>
  </div>
</template>

<script>
import MissionApiPage from '~/components/custom/MissionApiPage'

export default {
  components: {
    MissionApiPage
  },
  async asyncData ({ $axios, params, error, route, redirect }) {
    const { data: mission } = await $axios.get(`/missions/${params.id}`).catch((err) => {
      return error({ statusCode: err.response.status, message: err.response.statusText })
    })

    if (!mission.isFromApi) {
      const query = new URLSearchParams(route.query)
      let urlWithSlug = `/missions-benevolat/${mission.id}/${mission.slug}`
      if (route.query) {
        urlWithSlug = `${urlWithSlug}?${query.toString()}`
      }
      redirect(301, urlWithSlug)
    }

    return {
      mission
    }
  },
  head () {
    return {
      title: this.mission.name.substring(0, 80),
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr/missions-benevolat/${this.mission.id}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.mission.description
            .replace(/<\/?[^>]+>/gi, ' ')
            .substring(0, 300)
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg'
        },
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
