<template>
  <div>
    <MissionApiPage v-if="mission.isFromApi" :mission="mission" />
    <div v-else>Redirection en cours</div>
  </div>
</template>

<script>
import MissionApiPage from '@/components/custom/MissionApiPage'

export default defineNuxtComponent({
  components: {
    MissionApiPage,
  },
  async setup() {
    const route = useRoute()
    const { data: mission, error } = await useApiFetch(`/missions/${route.params.id}`)

    if (error.value) {
      showError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      })
    }

    if (!mission.value.isFromApi) {
      let urlWithSlug = `/missions-benevolat/${mission.value.id}/${mission.value.slug}`
      if (route.query) {
        const query = new URLSearchParams(route.query)
        urlWithSlug = `${urlWithSlug}?${query.toString()}`
      }
      navigateTo(urlWithSlug, 301)
    }

    useHead({
      title: mission.value.name.substring(0, 80),
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr/missions-benevolat/${mission.value.id}`,
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: mission.value.description.replace(/<\/?[^>]+>/gi, ' ').substring(0, 300),
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg',
        },
        { hid: 'robots', name: 'robots', content: 'noindex' },
      ],
    })

    return {
      mission,
    }
  },
})
</script>
