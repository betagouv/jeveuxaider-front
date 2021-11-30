<template>
  <div class="py-12">
    <div class="container">
      <Heading as="h1" :level="1">
        {{ page.title }}
      </Heading>
      <Box class="mt-12">
        <TextFormatted :text="page.description" class="text-gray-800 wysiwyg-field" />
      </Box>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const { data: page } = await $axios.get('/page/2')
    return {
      page
    }
  },
  head () {
    return {
      title: 'Conditions générales d\'utilisation (CGU) | JeVeuxAider.gouv.fr',
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/mentions-legales'
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "La plateforme JeVeuxAider.gouv.fr est un service public numérique destiné à organiser l'engagement civique bénévole en France. Elle permet à toute personne âgée de plus de 16 ans de s’engager dans des missions de bénévolat."
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
