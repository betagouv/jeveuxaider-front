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
    <BlocOrganisationMissions :organisation="organisation" />

    <!-- MISSIONS -->
    <!-- <div v-if="missions.data.length" id="missions" class="pt-16 pb-32">
      <div class="container px-4 mx-auto">
        <h2
          class="text-center mb-12 text-3xl sm:text-5xl sm:!leading-[1.1] tracking-tighter text-gray-900"
        >
          <span>Trouvez une mission dans {{ organisation.statut_juridique|label('structure_legal_status', 'label2') }} </span>
          <br class="hidden xl:block">
          <span class="font-extrabold">{{ organisation.name }}</span>
        </h2>

        <div class="flex flex-wrap justify-center">
          <nuxt-link
            v-for="mission in missions.data"
            :key="mission.id"
            class="card--mission--wrapper"
            :to="`/missions-benevolat/${mission.id}/${mission.slug}`"
          >
            <CardMission :mission="mission" />
          </nuxt-link>
        </div>

        <div class="text-center mt-6">
          <nuxt-link
            :to="`/missions-benevolat?structure.name=${organisation.name}`"
          >
            <button
              class="uppercase shadow-lg text-sm font-bold rounded-full text-gray-500 bg-white py-3 px-8 hover:scale-105 transform transition"
              tabindex="-1"
            >
              Plus de missions
            </button>
          </nuxt-link>
        </div>
      </div>
    </div> -->

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
import BlocOrganisationMissions from '@/components/section/organisation/BlocOrganisationMissions'
// import Contact from '@/components/section/organisation/Contact'
// import Donation from '@/components/section/organisation/Donation'
// import CardMission from '@/components/card/CardMission'
import MixinOrganisation from '@/mixins/organisation'
// import Testimonials from '@/components/section/temoignage/Testimonials'

export default {
  components: {
    Header,
    Presentation,
    Details,
    BlocOrganisationMissions
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

    const { data: missions } = await $axios.get(`/structures/${organisation.id}/available-missions`, {
      append: 'domaines',
      pagination: 6,
      sort: '-places_left'
    })

    return {
      organisation,
      missions
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
