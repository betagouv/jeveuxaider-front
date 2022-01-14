<template>
  <div>
    <!-- <SectionOrganisationEditShortcut
      :link="`/dashboard/structure/${organisation.id}/edit`"
    /> -->

    <!-- PRESENTATION -->
    <Presentation
      :organisation="organisation"
      :src-set="image1"
    >
      <footer
        slot="anchors"
        class="grid divide-x divide-gray-200 text-center border-t"
        :class="[
          { 'grid-cols-3': missions.data.length && organisation.donation },
          {
            'grid-cols-2':
              (missions.data.length && !organisation.donation) ||
              (organisation.donation && !missions.data.length),
          },
        ]"
      >
        <button
          v-if="missions.data.length"
          v-scroll-to="'#missions'"
          class="footer--button"
        >
          Devenir bénévole
        </button>

        <button
          v-if="organisation.donation"
          v-scroll-to="'#faire-un-don'"
          class="footer--button"
        >
          Faire un don
        </button>

        <button v-scroll-to="'#infos'" class="footer--button">
          Infos pratiques
        </button>
      </footer>
    </Presentation>

    <!-- DETAILS -->
    <Details :organisation="organisation" :src-set="image2">
      <div
        v-if="organisation.places_left > 0"
        class="text-2xl sm:text-4xl font-extrabold text-white mb-8 tracking-tight"
      >
        {{
          organisation.places_left
            | pluralize('bénévole recherché', 'bénévoles recherchés')
        }}
      </div>
    </Details>

    <!-- MISSIONS -->
    <div v-if="missions.data.length" id="missions" class="pt-16 pb-32">
      <div class="container px-4 mx-auto">
        <h2
          class="text-center mb-12 text-3xl sm:text-5xl sm:!leading-[1.1] tracking-tighter text-gray-900"
        >
          <span>Trouvez une mission dans {{ organisation.statut_juridique|label('structure_legal_status', 'label2') }}</span>
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
            :to="`/missions-benevolat?refinementList[structure.name][0]=${organisation.name}`"
          >
            <button
              class="uppercase shadow-lg text-sm font-bold rounded-full text-gray-500 bg-white py-3 px-8 hover:scale-105 transform transition"
            >
              Plus de missions
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- FAIRE UN DON -->
    <Donation :organisation="organisation" />

    <!-- CONTACT -->
    <Contact :organisation="organisation" />
  </div>
</template>

<script>
import Presentation from '@/components/section/organisation/Presentation'
import Details from '@/components/section/organisation/Details'
import Contact from '@/components/section/organisation/Contact'
import Donation from '@/components/section/organisation/Donation'
import CardMission from '@/components/card/CardMission'
import MixinOrganisation from '@/mixins/organisation'

export default {
  components: {
    Presentation,
    Details,
    Contact,
    Donation,
    CardMission
  },
  mixins: [MixinOrganisation],
  layout: 'default-without-header',
  async asyncData ({ $axios, params, error, redirect }) {
    const { data: organisation } = await $axios.get(`/association/${params.slug}`).catch((err) => {
      return error({ statusCode: err.response.status, message: err.response.statusText })
    })

    if (/^\d+$/.test(params.slug)) {
      redirect(301, `/organisations/${organisation.slug}`)
    }

    if (!organisation) {
      return error({ statusCode: 404 })
    }

    // @TODO: Utiliser plutôt $algoliaApi.getMissions
    const { data: missions } = await $axios.get(`/structure/${organisation.id}/availableMissions`, {
      append: 'domaines',
      itemsPerPage: 6,
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
  methods: {
    goTo (url) {
      window.plausible &&
        window.plausible('Click Module de don - Page Orga', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="postcss" scoped>
* {
  @apply border-gray-200;
}

.card--mission--wrapper {
  width: 100%;
  @apply border-0 shadow-none p-0 mb-6;
  @screen sm {
    width: 330px;
    @apply m-3 flex flex-col;
  }
}

.gradient {
  background: linear-gradient(
    to bottom,
    #ffffff 43.75%,
    rgba(255, 255, 255, 0) 100%
  );
}

.card--don {
  max-width: 1038px;
}
</style>
