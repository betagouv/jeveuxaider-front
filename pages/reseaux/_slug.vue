<template>
  <div>
    <Header :organisation="reseau" class="lg:fixed z-30 lg:w-full" />
    <div id="presentation" class="relative lg:pt-[98px]">
      <Presentation
        :organisation="reseau"
        :src-set="image1"
        :redirect-parameters="{
          'structure.reseaux.name': reseau.name,
        }"
      />
      <Details
        :organisation="reseau"
        :src-set="image2"
        class="bg-[#F3EDE5]"
      />

      <div id="missions" :data-offset-anchor="-98">
        <SectionSlideshowMissions
          v-if="reseau.statistics.missions_available_presentiel_count > 0"
          :organisation="reseau"
          title="Missions sur le terrain"
          :search-parameters="{
            hitsPerPage: 6,
            facetFilters: [
              `structure.reseaux.name:${reseau.name}`,
              'type:Mission en présentiel'
            ],
          }"
          :show-disponibilities="true"
          :redirect-parameters="{
            'structure.reseaux.name': reseau.name,
          }"
          :plausible-parameters="{
            isLogged: $store.getters.isLogged,
            reseau: reseau.name
          }"
        />

        <SectionSlideshowMissions
          v-if="reseau.statistics.missions_available_distance_count > 0"
          class="bg-[#F3EDE5]"
          :organisation="reseau"
          title="Depuis chez moi"
          :search-parameters="{
            hitsPerPage: 6,
            facetFilters: [
              `structure.reseaux.name:${reseau.name}`,
              'type:Mission à distance'
            ],
          }"
          :redirect-parameters="{
            'structure.reseaux.name': reseau.name,
            'type': 'Mission à distance'
          }"
          :plausible-parameters="{
            isLogged: $store.getters.isLogged,
            reseau: reseau.name
          }"
        />

        <MissionsActivities
          :title="`Au programme des activités bénévoles proposées chez ${reseau.name}`"
          :activities="activities"
          :redirect-parameters="{
            'structure.reseaux.name': reseau.name
          }"
        />

        <SectionSlideshowMissions
          class="bg-[#F3EDE5]"
          :organisation="reseau"
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
        v-if="reseau.donation"
        id="donation"
        :data-offset-anchor="-98"
        :destinataire="reseau.name"
        :url="reseau.donation"
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
import MissionsActivities from '@/components/section/MissionsActivities'
import SectionDonation from '@/components/section/SectionDonation'
import SectionTemoignages from '@/components/section/SectionTemoignages'

export default {
  components: {
    Header,
    Presentation,
    Details,
    SectionSlideshowMissions,
    MissionsActivities,
    SectionDonation,
    SectionTemoignages
  },
  layout: 'default-without-header',
  async asyncData ({ $axios, params, error, store }) {
    const { data: reseau } = await $axios.get(`/reseaux/${params.slug}`)
    if (!reseau) {
      return error({ statusCode: 404 })
    }
    if (!reseau.is_published && store.getters.contextRole != 'admin') {
      return error({ statusCode: 403 })
    }
    const { data: activities } = await $axios.get(`/reseaux/${reseau.id}/activities`)
    const { data: testimonials } = await $axios.get(`/temoignages/reseaux/${reseau.id}`)

    return {
      reseau,
      activities,
      testimonials
    }
  },
  head () {
    return {
      title: `Découvrez l'organisation ${this.reseau.name} | JeVeuxAider.gouv.fr`,
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr${this.reseau.full_url}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.reseau.description
            ? this.reseau.description
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
      return this.reseau.override_image1?.urls.large ??
        this.reseau.illustrations?.[0]?.urls.large ??
        '/images/organisation-default-1.webp'
    },
    image2 () {
      return this.reseau?.override_image2?.urls.large ??
        this.reseau?.illustrations?.[1]?.urls.large ??
        '/images/organisation-default-2.webp'
    },
    facetFiltersActivities () {
      return this.activities.map(a => `activities.name:${a.name}`)
    }
  },
  methods: {
    goTo (url) {
      this.$plausible.trackEvent('Click Module de don - Page Reseau', {
        props: { isLogged: this.$store.getters.isLogged }
      })
      window.open(url, '_blank')
    }
  }
}
</script>
