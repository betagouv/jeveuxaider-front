<template>
  <div v-if="organisation">
    <Header :organisation="organisation" class="lg:fixed z-30 lg:w-full" />
    <div id="presentation" class="relative lg:pt-[98px]">
      <Presentation
        :organisation="organisation"
        :src-set="image1"
        :redirect-parameters="{
          'structure.name': organisation.name,
        }"
      />
      <Details
        :organisation="organisation"
        :src-set="image2"
        class="bg-[#F3EDE5]"
        :redirect-parameters="{
          'structure.name': organisation.name,
        }"
      />
      <div id="missions" class="scroll-mt-24">
        <SectionSlideshowMissions
          v-if="organisation.statistics.missions_available_presentiel_count > 0"
          :organisation="organisation"
          title="Missions sur le terrain"
          :search-parameters="{
            hitsPerPage: 6,
            facetFilters: [`structure.name:${organisation.name}`, 'type:Mission en présentiel'],
            aroundPrecision: 2000,
            aroundLatLngViaIP: true,
            aroundRadius: 'all',
          }"
          :show-disponibilities="true"
          :redirect-parameters="{
            'structure.name': organisation.name,
          }"
          :plausible-parameters="{
            isLogged: $stores.auth.isLogged,
            organisation: organisation.name,
          }"
        />

        <SectionSlideshowMissions
          v-if="organisation.statistics.missions_available_distance_count > 0"
          class="bg-[#F3EDE5]"
          :organisation="organisation"
          title="Missions à distance"
          :search-parameters="{
            hitsPerPage: 6,
            facetFilters: [`structure.name:${organisation.name}`, 'type:Mission à distance'],
          }"
          :redirect-parameters="{
            'structure.name': organisation.name,
            type: 'Mission à distance',
          }"
          :plausible-parameters="{
            isLogged: $stores.auth.isLogged,
            organisation: organisation.name,
          }"
        />

        <MissionsActivities
          :title="`Au programme des activités bénévoles proposées chez ${organisation.name}`"
          :activities="activities"
          :redirect-parameters="{
            'structure.name': organisation.name,
          }"
        />

        <SectionSlideshowMissions
          class="bg-[#F3EDE5]"
          :organisation="organisation"
          title="Missions similaires disponibles"
          :search-parameters="{
            hitsPerPage: 6,
            facetFilters: [
              activities.map((a) => `activities.name:${a.name}`),
              `structure.name:-${organisation.name}`,
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

      <SectionTemoignages v-if="testimonials.length > 0" :testimonials="testimonials" />

      <SectionDonation
        v-if="organisation.donation"
        id="donation"
        :destinataire="organisation.name"
        :url="organisation.donation"
        class="bg-[#F3EDE5] scroll-mt-24"
      />

      <SectionRejoignezLeMouvement id="join" class="bg-white" />
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
import SectionRejoignezLeMouvement from '@/components/section/RejoignezLeMouvement.vue'
import SectionTemoignages from '@/components/section/SectionTemoignages.vue'
import MixinOrganisation from '@/mixins/organisation'

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
  mixins: [MixinOrganisation],
  async setup() {
    definePageMeta({
      layout: 'default-without-header',
    })

    const route = useRouter().currentRoute.value
    const { $filters } = useNuxtApp()

    const { data: organisation, error } = await useApiFetch(`/associations/${route.params.slug}`)

    if (error.value) {
      showError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      })
    }

    const status =
      organisation.value.statut_juridique !== 'Autre' ? organisation.value.statut_juridique : ''

    useHead({
      title: `${status} ${organisation.value.name} - Devenez bénévole dans ${$filters.label(
        organisation.value.statut_juridique,
        'structure_legal_status',
        'label2'
      )} ${organisation.value.name} - JeVeuxAider.gouv.fr`,
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr/organisations/${organisation.value.slug}`,
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: organisation.value.description
            ? organisation.value.description.replace(/<\/?[^>]+>/gi, ' ').substring(0, 300)
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
      return await navigateTo(`/organisations/${organisation.value.slug}`, 301)
    }

    let activities = []
    let testimonials = []
    const fetchActivities = async () => {
      const { data } = await useApiFetch(`/structures/${organisation.value.id}/activities`)
      activities = data
    }
    const fetchTestimonials = async () => {
      const { data } = await useApiFetch(`/temoignages/organisations/${organisation.value.id}`)
      testimonials = data
    }

    if (organisation?.value?.id) {
      await Promise.all([fetchActivities(), fetchTestimonials()])
    }

    return {
      organisation,
      activities,
      testimonials,
    }
  },
  computed: {
    image1() {
      return (
        this.organisation?.override_image1?.urls.large ??
        this.organisation?.illustrations?.[0]?.urls.large ??
        '/images/organisation-default-1.webp'
      )
    },
    image2() {
      return (
        this.organisation?.override_image2?.urls.large ??
        this.organisation?.illustrations?.[1]?.urls.large ??
        '/images/organisation-default-2.webp'
      )
    },
  },
  methods: {
    goTo(url) {
      this.$plausible.trackEvent('Click Module de don - Page Orga', {
        props: { isLogged: this.$stores.auth.isLogged },
      })
      window.open(url, '_blank')
    },
  },
})
</script>
