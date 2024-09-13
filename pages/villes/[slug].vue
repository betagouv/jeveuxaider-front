<template>
  <TerritoirePage :territoire="territoire" :cities="cities" />
</template>

<script>
import TerritoirePage from '@/components/section/territoire/Page.vue'

export default defineNuxtComponent({
  components: {
    TerritoirePage,
  },
  async setup() {
    const route = useRouter().currentRoute.value
    const { $stores } = useNuxtApp()

    let territoire = null
    let cities = []
    const fetchTerritoire = async () => {
      const { data } = await useApiFetch(`/territoires/${route.params.slug}/view`)
      territoire = data
    }
    const fetchCities = async () => {
      const { data } = await useApiFetch(`/territoires/${route.params.slug}/available-cities`)
      cities = data
    }
    await Promise.all([fetchTerritoire(), fetchCities()])

    if (!territoire.value) {
      return showError({ statusCode: 404 })
    }

    useHead({
      title: `Devenez bénévole ${territoire.value.suffix_title} | Bénévolat ${territoire.value.name} | JeVeuxAider.gouv.fr`,
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr${territoire.value.full_url}`,
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Trouvez une mission de bénévolat ${territoire.value.suffix_title} parmi les missions actuellement disponibles et faites vivre l'engagement de chacun pour tous`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg',
        },
      ],
    })

    if (
      $stores.auth.contextRole !== 'admin' &&
      (!territoire.value.is_published ||
        territoire.value.state !== 'validated' ||
        territoire.value.type !== 'city')
    ) {
      showError({ statusCode: 403 })
    }

    return {
      territoire,
      cities,
    }
  },
})
</script>
