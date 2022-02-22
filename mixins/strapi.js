
export default {
  computed: {
    strapiSeoMetaTitle () {
      return this.page.attributes.seo.metaTitle || this.page.attributes.name
    },
    strapiSeoMetaDescription () {
      return this.page.attributes.seo.metaDescription
    },
    strapiSeoHead () {
      if (this.page.attributes.seo) {
        return {
          title: `${this.strapiSeoMetaTitle} | JeVeuxAider.gouv.fr`,
          link: [
            {
              rel: 'canonical',
              href: `https://www.jeveuxaider.gouv.fr/${this.page.slug}`
            }
          ],
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: this.strapiSeoMetaDescription
            },
            {
              hid: 'og:image',
              property: 'og:image',
              content: this.strapiSeoOgImage('large')
            }
          ]
        }
      }
    }

  },
  methods: {
    strapiSeoOgImage (format) {
      // console.log('this.page.attributes.seo.image.media.data.attributes.formats', this.page.attributes.seo.image.media.data.attributes.formats)
      return this.page.attributes.seo?.image?.media?.data ? this.$config.strapi.url + this.page.attributes.seo.image.media.data.attributes.formats[format].url : '/images/share-image.jpg'
    }
  }
}
