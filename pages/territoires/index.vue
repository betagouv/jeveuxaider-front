<template>
  <div>
    <div class="container">
      <Breadcrumb
        :items="[{ label: 'Territoires engagés', link: '/territoires' }]"
      />
    </div>
    <div class="bg-cool-gray-50 px-4 max-w-3xl mx-auto lg:max-w-7xl">
      <div class="pt-8 md:pt-12 lg:pt-20 relative">
        <img
          class="hidden lg:block absolute transform translate-y-1 opacity-50"
          style="left: 100%; transform: translateX(-75%)"
          src="/images/territoires/france.svg"
          width="904"
          alt=""
        >

        <div class="relative">
          <Heading as="h1" size="2xl" class="text-center">
            Rejoignez JeVeuxAider.gouv.fr
            <br class="hidden md:block">
            dans votre territoire
          </Heading>

          <p class="mt-4 text-center max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
            Sur l'ensemble du territoire français, des milliers de bénévoles,
            de structures et d'association ont déjà rejoint
            <b>JeVeuxAider.gouv.fr</b>.
          </p>
        </div>

        <!-- Search bar -->
        <div class="flex-1 flex justify-between lg:mx-auto mt-10">
          <div class="flex-1 flex bg-white z-10 shadow-md rounded-lg">
            <form class="w-full flex md:ml-0 mb-0" action="#" method="GET">
              <label for="search_field" class="sr-only">Recherche</label>
              <div
                class="relative w-full text-cool-gray-400 focus-within:text-cool-gray-600"
              >
                <div
                  class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                >
                  <SearchIcon class="h-5 w-5 ml-3 sm:ml-6 text-gray-900" />
                </div>

                <input
                  id="search_field"
                  v-model="query"
                  class="block w-full h-full pl-10 pr-4 py-4 sm:px-16 sm:py-6 rounded-md text-cool-gray-900 placeholder-cool-gray-500 focus:placeholder-cool-gray-400 !outline-none focus:ring transition truncate text-md sm:text-lg md:text-xl border-none"
                  placeholder="Trouvez votre ville ou département"
                  type="search"
                >
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="relative my-8">
        <nav
          class="flex overflow-scroll sm:overflow-visible pt-1 pb-3 sm:py-0 sm:justify-center sm:gap-4"
        >
          <span
            v-for="(type, index) in types"
            :key="type.slug"
            tabindex="0"
            :class="[
              {
                'text-white bg-jva-blue-500 focus:text-white focus:bg-jva-blue-500':
                  activeType == type.slug,
              },
              {
                'text-gray-500 hover:text-jva-blue-500 bg-white':
                  activeType != type.slug,
              },
              {
                'mr-4 sm:mr-0':
                  types[index].slug == types[types.length - 1].slug,
              },
            ]"
            class="px-3 text-center lg:px-5 py-3 lg:py-4 shadow cursor-pointer font-medium text-md lg:text-xl leading-6 rounded-md focus:ring transition sm:w-full lg:w-auto flex-none sm:flex-initial ml-4 sm:ml-0 !outline-none"
            @click="activeType = type.slug"
          >
            {{ type.label }} ({{ typeCount(type.slug) }})
          </span>
        </nav>
      </div>

      <!-- Tab content -->
      <div class="relative mb-12">
        <div class="mx-auto">
          <div v-for="(group, index) in groups[activeType]" :key="index">
            <div
              v-if="territoriesByGroup(group).length > 0"
              class="mt-10 text-xl font-bold"
            >
              <span>{{ group[0] }}</span>
              <span v-if="group.length > 1">
                - {{ group[group.length - 1] }}
              </span>

              <div
                class="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
              >
                <nuxt-link
                  v-for="territory in territoriesByGroup(group)"
                  :key="territory.id"
                  :to="territory.full_url"
                  class="col-span-1 flex justify-center items-center text-center px-4 py-2 bg-white shadow-md rounded-lg border-jva-blue-500 border-b-2 text-gray-800 hover:shadow-lg hover:text-gray-900 !outline-none focus:ring transition"
                  style="min-height: 80px"
                >
                  <span class="font-semibold">{{ territory.name }}</span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Heading
  },
  async asyncData ({ $axios }) {
    const { data: cities } = await $axios.get('/territoires', {
      params: {
        'filter[state]': 'validated',
        'filter[is_published]': true,
        'filter[type]': 'city',
        pagination: 9999
      }
    })

    const { data: departments } = await $axios.get('/territoires', {
      params: {
        'filter[state]': 'validated',
        'filter[is_published]': true,
        'filter[type]': 'department',
        pagination: 9999
      }
    })

    return {
      cities: cities.data,
      departments: departments.data
    }
  },
  data () {
    const types = [
      {
        slug: 'cities',
        label: 'Villes'
      },
      {
        slug: 'departments',
        label: 'Départements'
      }
    ]

    return {
      query: '',
      types,
      activeType: types[0].slug,
      groups: {
        cities: [
          ['A', 'À', 'Á', 'Ã', 'Â', 'B', 'C', 'Ç', 'D', 'É', 'È', 'Ê', 'E'],
          ['F', 'G', 'H', 'I', 'J'],
          ['K', 'L', 'M', 'N', 'Ó', 'Ò', 'Ô', 'Õ', 'O'],
          ['P', 'Q', 'R', 'S', 'T'],
          ['U', 'Ú', 'Ù', 'Û', 'Ü', 'V', 'W', 'X', 'Y', 'Z']
        ],
        departments: [
          ['A'],
          ['B', 'C'],
          ['D', 'E', 'F'],
          ['G', 'H'],
          ['I'],
          ['J', 'L'],
          ['M', 'N'],
          ['O', 'P'],
          ['R', 'S', 'T'],
          ['V', 'Y']
        ]
      }
    }
  },
  head () {
    return {
      title:
        'Inscrivez votre territoire sur JeVeuxAider.gouv.fr, la plateforme publique du bénévolat proposée par la Réserve Civique',
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/territoires'
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Partout en France, des milliers de bénévoles, d'associations et de communes se mobilisent sur JeVeuxAider.gouv.fr. Rejoignez la plateforme et faites vivre la solidarité locale. "
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
    typeCount (type) {
      return this[type].filter(item =>
        this.slugify(item.name).includes(this.slugify(this.query))
      ).length
    },
    territoriesByGroup (group) {
      return this[this.activeType]
        .filter(
          territory =>
            group.includes(territory.name[0]) &&
            this.slugify(territory.name).includes(this.slugify(this.query))
        )
        .sort((a, b) => (a.name < b.name ? -1 : 1))
    },
    slugify (str) {
      const map = {
        '-': ' ',
        a: 'á|à|ã|â|À|Á|Ã|Â',
        e: 'é|è|ê|É|È|Ê',
        i: 'í|ì|î|Í|Ì|Î',
        o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        c: 'ç|Ç',
        n: 'ñ|Ñ'
      }
      for (const pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern)
      }
      return str.toLowerCase()
    }
  }
}
</script>

<style lang="postcss" scoped>
input::placeholder {
  font-weight: 400 !important;
}
</style>
