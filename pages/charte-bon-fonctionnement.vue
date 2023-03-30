<template>
  <StrapiPage :page="page" />
</template>

<script>
import MixinStrapi from '@/mixins/strapi'
import StrapiPage from '@/components/section/StrapiPage.vue'

export default {
  components: {
    StrapiPage
  },
  mixins: [MixinStrapi],
  async asyncData ({ $config, $strapi, error }) {
    $strapi.setToken($config.strapi.token)
    const response = await $strapi.find('api/pages',
      {
        'filters[slug][$eq]': 'charte-de-bon-fonctionnement',
        'populate[zone][populate]': '*',
        'populate[seo][populate][image][populate]': '*'

      })
    if (response.data.length) {
      return {
        page: response.data[0]
      }
    } else {
      return error({ statusCode: 404 })
    }
  },
  head () {
    if (this.strapiSeoHead) {
      return this.strapiSeoHead
    }
  }
}
</script>
