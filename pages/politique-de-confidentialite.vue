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
import MixinStrapi from '@/mixins/strapi'
export default {
  mixins: [MixinStrapi],
  async asyncData ({ $config, $strapi, error }) {
    $strapi.setToken($config.strapi.token)

    const response = await $strapi.find('api/pages',
      {
        'filters[slug][$eq]': 'politique-de-confidentialite',
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
