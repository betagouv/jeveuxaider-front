
export default {
  computed: {
    strapiSeoMetaTitle () {
      return this.metaTitle || this.page.attributes.seo?.metaTitle || this.page.attributes.name
    },
    strapiSeoMetaDescription () {
      return this.page.attributes.seo?.metaDescription
    },
    strapiSeoHead () {
      const head = {
        title: `${this.strapiSeoMetaTitle} | JeVeuxAider.gouv.fr`,
        link: [{
          rel: 'canonical',
          href: `${this.$config.appUrl}${this.$router.currentRoute.fullPath}`
        }],
        meta: []
      }

      if (!this.page) {
        return head
      }

      if (this.strapiSeoMetaDescription) {
        head.meta.push({
          hid: 'description',
          name: 'description',
          content: this.strapiSeoMetaDescription
        })
      }

      const seoOgImgUrl = this.strapiSeoOgImage('large')
      if (seoOgImgUrl) {
        head.meta.push({
          hid: 'og:image',
          property: 'og:image',
          content: seoOgImgUrl
        })
      }

      return head
    }
  },
  methods: {
    strapiSeoOgImage (format) {
      if (!this.page.attributes.seo) {
        return '/images/share-image.jpg'
      }
      if (!this.page.attributes.seo?.image.media.data.attributes.formats[format]) {
        return '/images/share-image.jpg'
      }
      return this.$config.strapi.url + this.page.attributes.seo?.image.media.data.attributes.formats[format].url
    }
  }
}
