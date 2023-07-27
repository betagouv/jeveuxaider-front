<template>
  <div>
    <Header :organisation="organisation" />
    <Presentation
      :organisation="organisation"
      :src-set="image1"
    />
    <Details
      :organisation="organisation"
      :src-set="image2"
      class="bg-[#F3EDE5]"
    />
    <SlideshowOrganisationMissions
      :organisation="organisation"
      title="Missions en présentiel"
      :search-parameters="{
        hitsPerPage: 6,
        facetFilters: [`structure.name:${organisation.name}`],
      }"
      :show-disponibilities="true"
    />

    <SlideshowOrganisationMissions
      class="bg-[#F3EDE5]"
      :organisation="organisation"
      title="Missions à distance"
      :search-parameters="{
        hitsPerPage: 6,
        facetFilters: [
          `structure.name:${organisation.name}`,
          'type:Mission à distance'
        ],
      }"
    />

    <!-- TESTIMONIALS -->
    <!-- <Testimonials
      :model="organisation"
      model-type="organisation"
    /> -->

    <!-- FAIRE UN DON -->
    <!-- <Donation :organisation="organisation" /> -->

    <!-- CONTACT -->
    <!-- <Contact :organisation="organisation" /> -->
  </div>
</template>

<script>
import Header from '@/components/section/organisation/Header'
import Presentation from '@/components/section/organisation/Presentation'
import Details from '@/components/section/organisation/Details'
import SlideshowOrganisationMissions from '@/components/section/organisation/SlideshowOrganisationMissions'
// import Contact from '@/components/section/organisation/Contact'
// import Donation from '@/components/section/organisation/Donation'
import MixinOrganisation from '@/mixins/organisation'
// import Testimonials from '@/components/section/temoignage/Testimonials'

export default {
  components: {
    Header,
    Presentation,
    Details,
    SlideshowOrganisationMissions
    // Contact,
    // Donation,
    // CardMission,
    // Testimonials
  },
  mixins: [MixinOrganisation],
  layout: 'default-without-header',
  async asyncData ({ $axios, params, error, redirect }) {
    const { data: organisation } = await $axios.get(`/associations/${params.slug}`).catch((err) => {
      return error({ statusCode: err.response.status, message: err.response.statusText })
    })

    if (/^\d+$/.test(params.slug)) {
      redirect(301, `/organisations/${organisation.slug}`)
    }

    if (!organisation) {
      return error({ statusCode: 404 })
    }

    return {
      organisation
    }
  },
  head () {
    const status =
      this.organisation.statut_juridique !== 'Autre'
        ? this.organisation.statut_juridique
        : ''

    return {
      title: `${status} ${this.organisation.name} - Devenez bénévole dans ${this.$options.filters.label(this.organisation.statut_juridique, 'structure_legal_status', 'label2')} ${this.organisation.name} - JeVeuxAider.gouv.fr`,
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr/organisations/${this.organisation.slug}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.organisation.description
            ? this.organisation.description
              .replace(/<\/?[^>]+>/gi, ' ')
              .substring(0, 300)
            : ''
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg'
        }
      ]
    }
  },
  computed: {
    image1 () {
      return this.organisation?.override_image1?.urls.large ??
        this.organisation?.illustrations?.[0]?.urls.large ??
        '/images/organisation-default-1.webp'
    },
    image2 () {
      return this.organisation?.override_image2?.urls.large ??
        this.organisation?.illustrations?.[1]?.urls.large ??
        '/images/organisation-default-2.webp'
    }
  },
  methods: {
    goTo (url) {
      this.$plausible.trackEvent('Click Module de don - Page Orga', {
        props: { isLogged: this.$store.getters.isLogged }
      })
      window.open(url, '_blank')
    }
  }
}
</script>
