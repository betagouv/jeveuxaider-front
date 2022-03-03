
export default {
  computed: {
    strapiSeoMetaTitle () {
      return this.page.attributes.seo.metaTitle || this.page.attributes.name
    },
    strapiSeoMetaDescription () {
      return this.page.attributes.seo.metaDescription
    },
    strapiSeoHead () {
      if (this.page && this.page.attributes.seo) {
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
      if (!this.page.attributes.seo) {
        return '/images/share-image.jpg'
      }
      if (!this.page.attributes.seo.image.media.data.attributes.formats[format]) {
        return '/images/share-image.jpg'
      }
      return this.$config.strapi.url + this.page.attributes.seo.image.media.data.attributes.formats[format].url
    }
  }
}
