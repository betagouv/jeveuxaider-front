<template>
  <div>
    <Header :organisation="organisation" class="lg:fixed z-30 lg:w-full" />
    <div id="presentation" class="relative lg:pt-[98px]">
      <Presentation
        :organisation="organisation"
        :src-set="image1"
      />
      <Details
        :organisation="organisation"
        :src-set="image2"
        class="bg-[#F3EDE5]"
      />
      <div id="missions" :data-offset-anchor="-98">
        <SectionSlideshowMissions
          v-if="organisation.statistics.missions_available_presentiel_count > 0"
          :organisation="organisation"
          title="Missions sur le terrain"
          :search-parameters="{
            hitsPerPage: 6,
            facetFilters: [
              `structure.name:${organisation.name}`,
              'type:Mission en présentiel'
            ],
          }"
          :show-disponibilities="true"
          :redirect-parameters="{
            'structure.name': organisation.name,
          }"
          :plausible-parameters="{
            isLogged: $store.getters.isLogged,
            organisation: organisation.name
          }"
        />

        <SectionSlideshowMissions
          v-if="organisation.statistics.missions_available_distance_count > 0"
          class="bg-[#F3EDE5]"
          :organisation="organisation"
          title="Depuis chez moi"
          :search-parameters="{
            hitsPerPage: 6,
            facetFilters: [
              `structure.name:${organisation.name}`,
              'type:Mission à distance'
            ],
          }"
          :redirect-parameters="{
            'structure.name': organisation.name,
            'type': 'Mission à distance'
          }"
          :plausible-parameters="{
            isLogged: $store.getters.isLogged,
            organisation: organisation.name
          }"
        />

        <OrganisationActivities
          :title="`Au programme des activités bénévoles proposées chez ${organisation.name}`"
          :activities="activities"
          :redirect-parameters="{
            'structure.name': organisation.name
          }"
        />

        <SectionSlideshowMissions
          class="bg-[#F3EDE5]"
          :organisation="organisation"
          title="Missions similaires disponibles"
          :search-parameters="{
            hitsPerPage: 6,
            facetFilters: [
              facetFiltersActivities,
            ],
          }"
          :redirect-parameters="{
            'activities.name': activities.map(a => a.name).join('|')
          }"
        />
      </div>

      <SectionTemoignages
        v-if="testimonials.length > 0"
        :testimonials="testimonials"
      />

      <SectionDonation
        v-if="organisation.donation"
        id="donation"
        :data-offset-anchor="-98"
        :destinataire="organisation.name"
        :url="organisation.donation"
        class="bg-[#F3EDE5]"
      />
    </div>
  </div>
</template>

<script>
import Header from '@/components/section/organisation/Header'
import Presentation from '@/components/section/organisation/Presentation'
import Details from '@/components/section/organisation/Details'
import SectionSlideshowMissions from '@/components/section/search/SectionSlideshowMissions'
import OrganisationActivities from '@/components/section/OrganisationActivities'
import SectionDonation from '@/components/section/SectionDonation'
import SectionTemoignages from '@/components/section/SectionTemoignages'
import MixinOrganisation from '@/mixins/organisation'

export default {
  components: {
    Header,
    Presentation,
    Details,
    SectionSlideshowMissions,
    OrganisationActivities,
    SectionDonation,
    SectionTemoignages
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

    const { data: activities } = await $axios.get(`/structures/${organisation.id}/activities`)
    const { data: testimonials } = await $axios.get(`/temoignages/organisations/${organisation.id}`)

    return {
      organisation,
      activities,
      testimonials
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
    },
    facetFiltersActivities () {
      return this.activities.map(a => `activities.name:${a.name}`)
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
