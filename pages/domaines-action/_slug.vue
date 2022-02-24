<template>
  <div>
    <div class="relative">
      <img
        v-if="domaine.banner"
        :srcset="domaine.banner.urls.large"
        :alt="domaine.title"
        class="absolute object-cover object-center w-full h-full"
      >

      <div
        :class="[
          $options.filters.label(domaine.id, 'domaines', 'bg'),
          'absolute',
          'inset-0',
          { 'opacity-75': domaine.banner },
        ]"
      />

      <div class="relative pt-1 pb-12">
        <div class="container mx-auto px-4">
          <Breadcrumb
            theme="transparent"
            :items="[{ label: `Domaines d'action` }, { label: domaine.name }]"
          />

          <div class="py-8 text-center sm:text-left">
            <h1
              class="text-4xl max-w-4xl leading-none font-bold text-white sm:text-5xl md:text-6xl"
            >
              {{ domaine.title }}
            </h1>

            <h2
              class="mt-5 text-base text-gray-100 max-w-xl sm:text-lg md:text-xl"
            >
              {{ domaine.description }}
            </h2>

            <div
              class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
            >
              <div class="text-center">
                <p class="text-xs mb-4 font-medium text-white">
                  Je veux aider
                </p>
                <nuxt-link
                  v-if="!$store.getters.isLogged"
                  to="/inscription"
                  :class="$options.filters.label(domaine.id, 'domaines', 'color')"
                  class="shadow-lg w-full flex items-center justify-center px-10 py-3 text-base mb-4 font-medium rounded-full bg-white hover:bg-white !outline-none focus:ring transition md:py-4 md:text-lg md:px-15"
                >
                  Devenir bénévole
                </nuxt-link>
                <a
                  v-else
                  href="#search-wrapper"
                  :class="$options.filters.label(domaine.id, 'domaines', 'color')"
                  class="shadow-lg w-full flex items-center justify-center px-10 py-3 text-base mb-4 font-medium rounded-full bg-white hover:bg-white !outline-none focus:ring transition md:py-4 md:text-lg md:px-15"
                >
                  Trouver une mission
                </a>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-6 text-center">
                <p class="text-xs mb-4 font-medium text-white">
                  Mon organisation a besoin de renfort
                </p>
                <nuxt-link
                  :to="
                    $store.getters.isLogged &&
                      $store.getters.contextRole == 'responsable'
                      ? `/dashboard/structures/${$store.getters.contextableId}/missions/add`
                      : '/login'
                  "
                  class="shadow-lg w-full flex items-center justify-center px-8 py-3 border-transparent border text-base mb-4 font-medium rounded-full text-white bg-red-600 hover:bg-red-700 !outline-none focus:ring transition md:py-4 md:text-lg md:px-9"
                >
                  Proposer une mission
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white">
      <div class="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <div class="col-span-1 flex justify-center">
            <p
              class="text-center text-base my-auto font-semibold uppercase text-gray-800 tracking-wider"
            >
              En partenariat avec
            </p>
          </div>
          <div
            v-for="media in domaine.logos_partenaires"
            :key="media.id"
            class="col-span-1 flex justify-center"
          >
            <img
              class="h-14 object-contain"
              alt="logo-partenaire-domaine"
              :srcset="media.urls.small"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white z-10">
      <div>
        <div class="grid grid-cols-2 gap-0 md:grid-cols-6 lg:grid-cols-6">
          <div
            v-for="media in domaine.illustrations"
            :key="media.id"
            class="justify-center md:col-span-2 lg:col-span-1"
          >
            <img
              :srcset="media.urls.carousel"
              :alt="`illustration ${domaine.name}`"
              height="430"
              width="430"
            >
          </div>
        </div>
      </div>
    </div>

    <div :class="$options.filters.label(domaine.id, 'domaines', 'bg')">
      <div
        class="container mx-auto py-12 pt-16 px-4 sm:py-16 sm:px-6 lg:px-8"
      >
        <div class="max-w-6xl mx-auto text-center">
          <h2
            class="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10"
          >
            Rejoignez le mouvement #JeVeuxAider
          </h2>
          <p class="text-xl max-w-2xl mx-auto leading-8 text-gray-200 mt-2">
            Sur l’ensemble du territoire français, des milliers de bénévoles
            et d’organisations se sont déjà ralliés à JeVeuxAider.gouv.fr pour
            soutenir ce domaine d'action.
          </p>
          <dl
            class="mt-12 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8"
          >
            <div class="flex flex-col">
              <dd class="text-5xl leading-none font-bold text-white">
                {{ statistics.volontaires_count | formatNumber }}
              </dd>
              <dt class="mt-2 text-lg font-medium text-white">
                Bénévoles
              </dt>
            </div>
            <div class="flex flex-col mt-10 sm:mt-0">
              <dd class="text-5xl leading-none font-bold text-white">
                {{ statistics.structures_count | formatNumber }}
              </dd>
              <dt class="mt-2 text-lg font-medium text-white">
                Organisations
              </dt>
            </div>
            <div class="flex flex-col mt-10 sm:mt-0">
              <dd class="text-5xl leading-none font-bold text-white">
                {{ statistics.participations_count | formatNumber }}
              </dd>
              <dt class="mt-2 text-lg font-medium text-white">
                Mises en relation
              </dt>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <SearchMissions
      id="search-wrapper"
      :facets="[
        'template_title',
        'department_name',
        'structure.name',
        'is_priority',
      ]"
      :filters="`domaines:&quot;${domaine.name}&quot;`"
      :domaine="domaine"
      :title-tag="'h2'"
    />

    <div class="bg-gray-50 border-b border-gray-200 py-12 lg:py-16">
      <div
        class="container mx-auto px-4 sm:px-6"
      >
        <div class="flex flex-col items-center justify-center text-center">
          <p class="text-3xl leading-9 font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Votre organisation a besoin de
            <span :class="$options.filters.label(domaine.id, 'domaines', 'color')">bénévoles</span>&nbsp;?
          </p>
          <div class="mt-8">
            <div class="inline-flex rounded-full shadow">
              <nuxt-link
                :to="
                  $store.getters.isLogged &&
                    $store.getters.contextRole == 'responsable'
                    ? `/admin/organisations/${$store.getters.contextableId}/missions/add`
                    : '/inscription/responsable'
                "
                :class="$options.filters.label(domaine.id, 'domaines', 'bg')"
                class="inline-flex items-center justify-center px-7 py-3 border border-transparent text-base font-medium rounded-full text-white !outline-none focus:ring transition"
              >
                Rejoignez JeVeuxAider.gouv.fr
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white border-gray-200 border-b">
      <div class="container mx-auto py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          class="text-center pb-12 text-base mb-4 font-semibold uppercase text-gray-400 tracking-wider"
        >
          Parmi les organisations déjà actives sur JeVeuxAider.gouv.fr
        </div>
        <div class="flex flex-wrap justify-center -m-4 sm:-m-6">
          <div
            v-for="media in domaine.logos_partenaires_actifs"
            :key="media.id"
            class="flex justify-center m-4 sm:m-6"
          >
            <img
              alt="Partenaire"
              class="h-14 object-contain"
              :srcset="media.urls.small"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchMissions from '~/components/section/SearchMissions.vue'

export default {
  components: {
    SearchMissions
  },
  async asyncData ({ params, error, $axios, store }) {
    const { data: domaine } = await $axios.get(`/domaines/${params.slug}`)
    if (!domaine) {
      return error({ statusCode: 404 })
    }
    if (!domaine.published && store.getters.contextRole !== 'admin') {
      return error({ statusCode: 403 })
    }
    const { data: statistics } = await $axios.get(`/domaines/${domaine.id}/statistics`)
    return {
      domaine,
      statistics
    }
  },
  head () {
    return {
      title: `Devenez bénévole dans une association pour ${this.domaineSeo} | Je Veux Aider`,
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr/domaines-action/${this.domaine.slug}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Des milliers de places sont disponibles dans des associations pour ${this.domaineSeo}. Trouvez la mission qui vous correspond, sur le terrain ou à distance, partout en France, dès 16 ans.`
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
    domaineSeo () {
      let domaineSeo = this.domaine.name

      switch (this.domaine.name) {
        case 'Solidarité et insertion':
          domaineSeo = " la solidarité et l'insertion sociale"
          break
        case 'Protection de la nature':
          domaineSeo = "la protection de la nature et l'environnement."
          break
        case 'Santé pour tous':
          domaineSeo = 'la santé'
          break
        case 'Éducation pour tous':
          domaineSeo = "la solidarité et l'insertion"
          break
      }
      return domaineSeo
    }
  }
}
</script>
