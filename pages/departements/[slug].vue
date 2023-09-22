<template>
  <TerritoirePage :territoire="territoire" />
</template>

<script>
import TerritoirePage from '@/components/section/territoire/Page.vue'

export default defineNuxtComponent({
  components: {
    TerritoirePage,
  },
  async setup() {
    const route = useRoute()

    const { data: territoire, error } = await useApiFetch(`/territoires/${route.params.slug}`)

    if (error.value) {
      showError({
        statusCode: error.value.statusCode,
      })
    }

    if (
      !territoire.value ||
      !territoire.value.is_published ||
      territoire.value.state !== 'validated' ||
      territoire.value.type !== 'department'
    ) {
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

    return {
      territoire,
    }
  },
})
</script>
