<template>
  <div v-if="reseau">
    <Header :organisation="reseau" class="lg:fixed z-30 lg:w-full" />
    <div id="presentation" class="relative lg:pt-[98px]">
      <Presentation
        :organisation="reseau"
        :src-set="image1"
        :redirect-parameters="{
          'structure.reseaux.name': reseau.name,
        }"
        suffixTitle="Découvrez le réseau"
      />
      <Details
        :organisation="reseau"
        :src-set="image2"
        class="bg-[#F3EDE5]"
        :redirect-parameters="{
          'structure.reseaux.name': reseau.name,
        }"
      />
      <div id="missions" :data-offset-anchor="-98">
        <SectionSlideshowMissions
          v-if="reseau.statistics.missions_available_presentiel_count > 0"
          :organisation="reseau"
          title="Missions sur le terrain"
          :search-parameters="{
            hitsPerPage: 6,
            facetFilters: [`structure.reseaux.name:${reseau.name}`, 'type:Mission en présentiel'],
            aroundPrecision: 2000,
            aroundLatLngViaIP: true,
            aroundRadius: 'all',
          }"
          :show-disponibilities="true"
          :redirect-parameters="{
            'structure.reseaux.name': reseau.name,
          }"
          :plausible-parameters="{
            isLogged: $stores.auth.isLogged,
            reseau: reseau.name,
          }"
        />

        <SectionSlideshowMissions
          v-if="reseau.statistics.missions_available_distance_count > 0"
          class="bg-[#F3EDE5]"
          :organisation="reseau"
          title="Missions à distance"
          :search-parameters="{
            hitsPerPage: 6,
            facetFilters: [`structure.reseaux.name:${reseau.name}`, 'type:Mission à distance'],
          }"
          :redirect-parameters="{
            'structure.name': reseau.name,
            type: 'Mission à distance',
          }"
          :plausible-parameters="{
            isLogged: $stores.auth.isLogged,
            reseau: reseau.name,
          }"
        />

        <MissionsActivities
          :title="`Au programme des activités bénévoles proposées chez ${reseau.name}`"
          :activities="activities"
          :redirect-parameters="{
            'structure.reseaux.name': reseau.name,
          }"
        />

        <SectionSlideshowMissions
          class="bg-[#F3EDE5]"
          :organisation="reseau"
          title="Missions similaires disponibles"
          :search-parameters="{
            hitsPerPage: 6,
            facetFilters: [
              activities.map((a) => `activities.name:${a.name}`),
              `structure.reseaux.name:-${reseau.name}`,
            ],
            aroundPrecision: 2000,
            aroundLatLngViaIP: true,
            aroundRadius: 'all',
          }"
          :redirect-parameters="{
            'activities.name': activities.map((a) => a.name).join('|'),
          }"
        />
      </div>

      <SectionTemoignages v-if="testimonials?.length > 0" :testimonials="testimonials" />

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
import Header from '@/components/section/organisation/Header.vue'
import Presentation from '@/components/section/organisation/Presentation.vue'
import Details from '@/components/section/organisation/Details.vue'
import SectionSlideshowMissions from '@/components/section/search/SectionSlideshowMissions.vue'
import MissionsActivities from '@/components/section/MissionActivities.vue'
import SectionDonation from '@/components/section/SectionDonation.vue'
import SectionTemoignages from '@/components/section/SectionTemoignages.vue'

export default defineNuxtComponent({
  components: {
    Header,
    Presentation,
    Details,
    SectionSlideshowMissions,
    MissionsActivities,
    SectionDonation,
    SectionTemoignages,
  },
  async setup() {
    definePageMeta({
      layout: 'default-without-header',
    })

    const route = useRoute()
    const { data: reseau, error } = await useApiFetch(`/reseaux/${route.params.slug}/view`)

    useHead({
      title: `${reseau.value.name} - Devenez bénévole - JeVeuxAider.gouv.fr`,
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr/reseaux/${reseau.value.slug}`,
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: reseau.value.description
            ? reseau.value.description.replace(/<\/?[^>]+>/gi, ' ').substring(0, 300)
            : '',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg',
        },
      ],
    })

    if (/^\d+$/.test(route.params.slug)) {
      return await navigateTo(`/reseaux/${reseau.value.slug}`, 301)
    }

    let activities = []
    let testimonials = []
    const fetchActivities = async () => {
      const { data } = await useApiFetch(`/reseaux/${reseau.value.id}/activities`)
      activities = data
    }
    const fetchTestimonials = async () => {
      const { data } = await useApiFetch(`/temoignages/reseaux/${reseau.value.id}`)
      testimonials = data
    }
    await Promise.all([fetchActivities(), fetchTestimonials()])

    return {
      reseau,
      activities,
      testimonials,
    }
  },
  computed: {
    image1() {
      return (
        this.reseau?.override_image1?.urls.large ??
        this.reseau?.illustrations?.[0]?.urls.large ??
        '/images/organisation-default-1.webp'
      )
    },
    image2() {
      return (
        this.reseau?.override_image2?.urls.large ??
        this.reseau?.illustrations?.[1]?.urls.large ??
        '/images/organisation-default-2.webp'
      )
    },
  },
  methods: {
    goTo(url) {
      this.$plausible.trackEvent('Click Module de don - Page Reseau', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      window.open(url, '_blank')
    },
  },
})
</script>
