<template>
  <div>
    <div>
      <div class="relative">
        <img
          v-if="thematique.image && thematique.image.large"
          :src="thematique.image.large"
          :alt="thematique.title"
          class="absolute object-cover object-center w-full h-full"
        >

        <div
          :class="[
            $options.filters.label(thematique.domaine_id, 'domaines', 'bg'),
            'absolute',
            'inset-0',
            { 'opacity-75': thematique.image },
          ]"
        />

        <Breadcrumb
          theme="transparent"
          class="relative z-10 px-4"
          :items="[{ label: 'Domaines d\'action' }, { label: thematique.name }]"
        />

        <div class="relative pt-1 pb-12 lg:py-12">
          <div class="container mx-auto px-4">
            <div class="py-8 text-center sm:text-left">
              <h1
                class="text-4xl max-w-4xl leading-none font-bold text-white sm:text-5xl md:text-6xl"
              >
                {{ thematique.title }}
              </h1>

              <h2
                class="mt-5 text-base text-gray-100 max-w-xl sm:text-lg md:text-xl"
              >
                {{ thematique.description }}
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
                    :class="$options.filters.label(thematique.domaine_id, 'domaines', 'color')"
                    class="shadow-lg w-full flex items-center justify-center px-10 py-3 text-base mb-4 font-medium rounded-full bg-white hover:bg-white !outline-none focus:ring transition md:py-4 md:text-lg md:px-15"
                  >
                    Devenir bénévole
                  </nuxt-link>
                  <a
                    v-else
                    href="#search-wrapper"
                    :class="$options.filters.label(thematique.domaine_id, 'domaines', 'color')"
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
                        ? `/dashboard/structure/${$store.getters.contextStructure.id}/missions/add`
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
            <div class="col-span-1 flex justify-center lg:col-span-1">
              <p
                class="text-center text-base mb-4 mt-2 font-semibold uppercase text-gray-800 tracking-wider"
              >
                En partenariat avec
              </p>
            </div>
            <div class="col-span-1 flex justify-center lg:col-span-1">
              <img
                class="h-14 object-contain"
                alt="logo-partenaire-thematique"
                :src="`/images/thematiques/partenaires/${thematique.slug}-1.jpg`"
              >
            </div>

            <div class="col-span-1 flex justify-center lg:col-span-1">
              <img
                class="h-14 object-contain"
                alt="logo-partenaire-thematique"
                :src="`/images/thematiques/partenaires/${thematique.slug}-2.jpg`"
              >
            </div>

            <div class="col-span-1 flex justify-center lg:col-span-1">
              <img
                class="h-14 object-contain"
                alt="logo-partenaire-thematique"
                :src="`/images/thematiques/partenaires/${thematique.slug}-3.jpg`"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white z-10">
        <div>
          <div class="grid grid-cols-2 gap-0 md:grid-cols-6 lg:grid-cols-6">
            <div class="col-span-1 justify-center md:col-span-2 lg:col-span-1">
              <img
                :src="`/images/thematiques/${thematique.slug}-1.jpg`"
                alt=""
                height="auto"
                width="auto"
              >
            </div>
            <div class="col-span-1 justify-center md:col-span-2 lg:col-span-1">
              <img
                :src="`/images/thematiques/${thematique.slug}-6.jpg`"
                alt=""
                height="auto"
                width="auto"
              >
            </div>
            <div class="col-span-1 justify-center md:col-span-2 lg:col-span-1">
              <img
                :src="`/images/thematiques/${thematique.slug}-5.jpg`"
                alt=""
                height="auto"
                width="auto"
              >
            </div>
            <div class="col-span-1 justify-center md:col-span-2 lg:col-span-1">
              <img
                :src="`/images/thematiques/${thematique.slug}-3.jpg`"
                alt=""
                height="auto"
                width="auto"
              >
            </div>
            <div class="col-span-1 justify-center md:col-span-2 lg:col-span-1">
              <img
                :src="`/images/thematiques/${thematique.slug}-4.jpg`"
                alt=""
                height="auto"
                width="auto"
              >
            </div>
            <div class="col-span-1 justify-center md:col-span-2 lg:col-span-1">
              <img
                :src="`/images/thematiques/${thematique.slug}-2.jpg`"
                alt=""
                height="auto"
                width="auto"
              >
            </div>
          </div>
        </div>
      </div>

      <div :class="$options.filters.label(thematique.domaine_id, 'domaines', 'bg')">
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
        v-if="thematique.domaine"
        id="search-wrapper"
        :facets="[
          'template_title',
          'department_name',
          'structure.name',
          'is_priority',
        ]"
        :filters="`domaines:&quot;${thematique.domaine.name.fr}&quot;`"
        :thematique="thematique"
        :title-tag="'h2'"
      />

      <div class="bg-gray-50 border-b border-gray-200">
        <div
          class="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
        >
          <p
            class="text-3xl leading-9 font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
          >
            Votre organisation a besoin de
            <span :class="$options.filters.label(thematique.domaine_id, 'domaines', 'color')">bénévoles</span> ?
          </p>
          <div class="mt-8 flex lg:flex-shrink-0 lg:mt-0">
            <div class="inline-flex rounded-full shadow">
              <nuxt-link
                :to="
                  $store.getters.isLogged &&
                    $store.getters.contextRole == 'responsable'
                    ? `/admin/organisations/${$store.getters.contextStructure.id}/missions/add`
                    : '/inscription/responsable'
                "
                :class="$options.filters.label(thematique.domaine_id, 'domaines', 'bg')"
                class="inline-flex items-center justify-center px-7 py-3 border border-transparent text-base font-medium rounded-full text-white !outline-none focus:ring transition"
              >
                Rejoignez JeVeuxAider.gouv.fr
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border-gray-200 border-b">
        <div class="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div
            class="text-center pb-12 text-base mb-4 font-semibold uppercase text-gray-400 tracking-wider"
          >
            Parmi les organisations déjà actives sur JeVeuxAider.gouv.fr
          </div>
          <div class="grid grid-cols-2 gap-8 lg:grid-cols-5">
            <div class="col-span-1 flex justify-center lg:col-span-1">
              <img
                alt="logo-partenaire-thematique"
                class="h-14 object-contain"
                :src="`/images/thematiques/organisations-actives/orga-${thematique.slug}-1.jpg`"
              >
            </div>
            <div class="col-span-1 flex justify-center lg:col-span-1">
              <img
                alt="logo-partenaire-thematique"
                class="h-14 object-contain"
                :src="`/images/thematiques/organisations-actives/orga-${thematique.slug}-2.jpg`"
              >
            </div>
            <div class="col-span-1 flex justify-center lg:col-span-1">
              <img
                alt="logo-partenaire-thematique"
                class="h-14 object-contain"
                :src="`/images/thematiques/organisations-actives/orga-${thematique.slug}-3.jpg`"
              >
            </div>
            <div class="col-span-1 flex justify-center lg:col-span-1">
              <img
                alt="logo-partenaire-thematique"
                class="h-14 object-contain"
                :src="`/images/thematiques/organisations-actives/orga-${thematique.slug}-4.jpg`"
              >
            </div>
            <div class="col-span-1 flex justify-center lg:col-span-1">
              <img
                alt="logo-partenaire-thematique"
                class="h-14 object-contain"
                :src="`/images/thematiques/organisations-actives/${thematique.slug}-5.jpg`"
              >
            </div>
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
    const { data: thematique } = await $axios.get(`/thematique/${params.slug}`)
    if (!thematique) {
      return error({ statusCode: 404 })
    }
    if (!thematique.published && store.getters.contextRole !== 'admin') {
      return error({ statusCode: 403 })
    }
    const { data: statistics } = await $axios.get(`/thematique/${thematique.id}/statistics`)
    return {
      thematique,
      statistics
    }
  },
  head () {
    return {
      title: `Devenez bénévole dans une association pour ${this.thematiqueSeo} | Je Veux Aider`,
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr/domaines-action/${this.thematique.slug}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Des milliers de places sont disponibles dans des associations pour ${this.thematiqueSeo}. Trouvez la mission qui vous correspond, sur le terrain ou à distance, partout en France, dès 16 ans.`
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
    thematiqueSeo () {
      let thematiqueSeo = this.thematique.name

      switch (this.thematique.name) {
        case 'Solidarité et insertion':
          thematiqueSeo = " la solidarité et l'insertion sociale"
          break
        case 'Protection de la nature':
          thematiqueSeo = "la protection de la nature et l'environnement."
          break
        case 'Santé pour tous':
          thematiqueSeo = 'la santé'
          break
        case 'Éducation pour tous':
          thematiqueSeo = "la solidarité et l'insertion"
          break
      }
      return thematiqueSeo
    }
  }
}
</script>
