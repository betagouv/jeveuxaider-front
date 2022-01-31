<template>
  <div class="py-12">
    <div v-if="page" class="container">
      <div class="max-w-4xl mx-auto">
        <Heading as="h1" :level="1">
          {{ page.attributes.name }}
        </Heading>
        <div class="text-lg mt-12">
          {{ page.attributes.subtitle }}
        </div>
        <Box class="mt-12">
          <template v-for="component in page.attributes.zone">
            <template v-if="component.__component === 'fields.rich-text'">
              <TextFormatted :key="component.id" :text="$options.filters.marked(component.body)" />
            </template>
          </template>
        </Box>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ $config }) {
    const { data: page } = await axios.get(
      `${$config.strapi.url}/api/pages?filters[slug][$eq]=mentions-legales&populate[zone][populate]=*&populate[seo][populate][image][populate]=*`, {
        headers: {
          Authorization: `Bearer ${$config.strapi.token}`
        }
      }
    )
    console.log('page', page)
    return {
      page: page.data.length ? page.data[0] : null
    }
  }
  // head () {
  //   return {
  //     title: 'Mentions légales | JeVeuxAider.gouv.fr',
  //     link: [
  //       {
  //         rel: 'canonical',
  //         href: 'https://www.jeveuxaider.gouv.fr/mentions-legales'
  //       }
  //     ],
  //     meta: [
  //       {
  //         hid: 'description',
  //         name: 'description',
  //         content:
  //           "La plateforme JeVeuxAider.gouv.fr est un service public numérique destiné à organiser l'engagement civique bénévole en France. Elle permet à toute personne âgée de plus de 16 ans de s’engager dans des missions de bénévolat."
  //       },
  //       {
  //         hid: 'og:image',
  //         property: 'og:image',
  //         content: '/images/share-image.jpg'
  //       }
  //     ]
  //   }
  // }
}
</script>
