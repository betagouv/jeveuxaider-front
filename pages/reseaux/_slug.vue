<template>
  <div>
    <Presentation :organisation="reseau" :src-set="image1">
      <footer
        slot="anchors"
        class="grid divide-x divide-gray-200 text-center border-t"
        :class="[
          { 'grid-cols-3': antennesWithMissions.length && reseau.donation },
          { 'grid-cols-2': (antennesWithMissions.length && !reseau.donation) || (!antennesWithMissions.length && reseau.donation) },
        ]"
      >
        <button
          v-if="antennesWithMissions.length"
          v-scroll-to="'#antennes'"
          class="footer--button"
        >
          Devenir bénévole
        </button>

        <button
          v-if="reseau.donation"
          v-scroll-to="{
            el: '#faire-un-don',
            offset: -80,
          }"
          class="footer--button"
        >
          Faire un don
        </button>

        <button v-scroll-to="'#infos'" class="footer--button">
          Infos pratiques
        </button>
      </footer>
    </Presentation>

    <Details :organisation="reseau" :src-set="image2">
      <div
        v-if="reseau.participations_max > 0"
        slot="nbBenevoles"
        class="text-2xl sm:text-4xl font-extrabold text-white mb-8 tracking-tight"
      >
        {{ reseau.participations_max | formatNumber }}
        {{
          reseau.participations_max
            | pluralize([
              'bénévole recherché partout en France',
              'bénévoles recherchés partout en France',
            ])
        }}
      </div>
    </Details>

    <!-- ANTENNES -->
    <section
      v-if="antennesWithMissions.length"
      id="antennes"
      class="pt-16 pb-8"
    >
      <div class="container px-4 md:px-8 mx-auto">
        <h2
          class="text-center mb-12 text-3xl sm:text-5xl sm:!leading-[1.1] text-gray-900 tracking-tighter max-w-3xl mx-auto"
        >
          <span>Les antennes de l'organisation</span>
          <span class="font-extrabold">{{ reseau.name }}</span>
        </h2>

        <div
          class="mt-12 max-w-5xl mx-auto flex flex-wrap gap-4 items-center justify-center"
        >
          <a
            v-for="antenne in antennesWithMissions"
            :key="antenne.name"
            class="text-[#696974] leading-none truncate px-[18px] h-[40px] flex items-center rounded-full text-[13px] shadow-md font-extrabold tracking-wide uppercase bg-white transform transition will-change-transform hover:scale-105"
            :href="`#${antenne.id}`"
          >
            {{ antenne.city }}
          </a>

          <nuxt-link
            v-if="reseau.structures_count - 5 > 0"
            :to="`/missions-benevolat?structure.reseaux.name=${reseau.name}`"
            class="text-[#696974] leading-none truncate px-[18px] h-[40px] flex items-center rounded-full text-[13px] shadow-md font-extrabold tracking-wide uppercase bg-white transform transition will-change-transform hover:scale-105"
          >
            + {{ reseau.structures_count - 5 }} antennes
          </nuxt-link>
        </div>
      </div>
    </section>

    <template v-if="missions.length">
      <section
        v-for="(antenne, index) in antennesWithMissions"
        :id="antenne.id"
        :key="antenne.id"
        class="py-16"
        :class="[{ 'bg-white': Math.abs(index % 2) == 1 }]"
      >
        <div class="container px-4 md:px-8 mx-auto">
          <div class="max-w-5xl mx-auto">
            <span class="font-bold uppercase text-[#696974] ml-[2px]">
              Antenne
            </span>
            <div class="lg:flex items-baseline mb-12">
              <h3
                class="text-3xl lg:text-4xl lg:!leading-normal text-gray-900 tracking-tighter font-extrabold relative lg:pr-4 lg:truncate"
              >
                <!-- {{ reseau.name }} de  -->
                {{ antenne.city }}
              </h3>

              <nuxt-link
                :to="`/missions-benevolat?structure.name=${antenne.name}`"
                class="flex-none text-[#696974] text-lg hover:underline ml-auto"
              >
                {{ missionsFrom(antenne.id).missionCount | formatNumber }}
                {{
                  missionsFrom(antenne.id).missionCount
                    | pluralize('mission ›', 'missions ›', false)
                }}
              </nuxt-link>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              <nuxt-link
                v-for="mission in missionsFrom(antenne.id).missions"
                :key="mission.id"
                class="card--mission--wrapper"
                :to="`/missions-benevolat/${mission.id}/${mission.slug}`"
              >
                <CardMission :mission="mission" class="!h-full" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>
    </template>

    <template v-if="reseau.structures_count - 5 > 0">
      <hr class="mt-4">

      <section class="container mx-auto px-4 md:px-8 py-16">
        <div class="max-w-5xl mx-auto">
          <h4 class="tracking-tight text-2xl mb-8">
            Les {{ reseau.structures_count - 5 }} autres antennes de
            <span class="font-extrabold">{{ reseau.name }}</span> en France
          </h4>

          <ul class="columns-layout list-disc pl-6">
            <li
              v-for="antenne in autresAntennes"
              :key="antenne.id"
              class="text-[#6A6A6A] text-sm"
            >
              <nuxt-link
                :to="antenne.full_url"
                class="hover:underline truncate block"
              >
                {{ antenne.city }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </section>
    </template>

    <!-- FAIRE UN DON -->
    <Donation v-if="reseau.donation" :organisation="reseau" />

    <Contact :organisation="reseau" />
  </div>
</template>

<script>

import Presentation from '@/components/section/organisation/Presentation'
import Details from '@/components/section/organisation/Details'
import Contact from '@/components/section/organisation/Contact'
import Donation from '@/components/section/organisation/Donation'
import CardMission from '@/components/card/CardMission'

export default {
  components: {
    Presentation,
    Details,
    Contact,
    Donation,
    CardMission
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
    return {
      reseau
    }
  },
  data () {
    return {
      missions: [],
      structures: []
    }
  },
  async fetch () {
    const missions = []
    await Promise.all(
      this.reseau.structures.map(async (antenne) => {
        const config = {
          filters: `structure.id = ${antenne.id}`,
          hitsPerPage: 3
        }
        const missionsData = await this.$algoliaApi.getMissions(config)
        if (missionsData.json.nbHits) {
          missions.push({
            antenneId: antenne.id,
            missions: missionsData.json.hits,
            missionCount: missionsData.json.nbHits
          })
        }
      })
    )
    this.$set(this, 'missions', missions)

    const { data: structures } = await this.$axios(`/reseaux/${this.reseau.id}/structures`)
    this.$set(this, 'structures', structures)
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
    color () {
      return this.reseau.color ?? '#B91C1C'
    },
    autresAntennes () {
      return this.structures.filter(
        antenne =>
          !this.reseau.structures.find(
            highlightedAntennas => highlightedAntennas.id == antenne.id
          )
      )
    },
    antennesWithMissions () {
      return this.reseau.structures.filter((structure) => {
        const missions = this.missions.find(
          mission => mission.antenneId == structure.id
        )
        return missions?.missionCount > 0
      })
    }
  },
  methods: {
    goTo (url) {
      window.plausible &&
        window.plausible('Click Module de don - Page Reseau', {
          props: { isLogged: this.$store.getters.isLogged }
        })
      window.open(url, '_blank')
    },
    missionsFrom (antenneId) {
      return this.missions.find((antenne) => {
        return antenne.antenneId == antenneId
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
* {
  @apply border-gray-200;
}

.columns-layout {
  @media screen and (min-width: 425px) {
    column-count: 2;
    column-gap: 2rem;
  }
  @screen sm {
    column-count: 3;
  }
  @screen lg {
    column-count: 4;
  }
  @apply space-y-6;
}

.gradient {
  background: linear-gradient(
    to bottom,
    #ffffff 43.75%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
