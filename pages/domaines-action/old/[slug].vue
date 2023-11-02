<template>
  <div>
    <div class="relative">
      <NuxtImg
        ref="banner"
        v-if="domaine.banner"
        :src="domaine.banner.urls.original"
        :srcset="domaine.banner.urls.large"
        :alt="domaine.title"
        sizes="100vw"
        class="absolute object-cover object-center w-full h-full"
        @error="$refs.banner.$el.srcset = '/images/organisation-default-2.webp'"
      />

      <div :class="['bg-black', 'absolute', 'inset-0', { 'opacity-50': domaine.banner }]" />

      <div class="relative pt-1 pb-12">
        <div class="container mx-auto px-4">
          <DsfrBreadcrumb
            theme="white"
            :links="[{ text: `Domaines d'action` }, { text: domaine.name }]"
          />

          <div class="pb-8 text-center sm:text-left">
            <h1
              class="text-4xl max-w-4xl leading-none font-bold text-white sm:text-5xl md:text-6xl"
            >
              {{ domaine.title }}
            </h1>

            <h2 class="mt-5 text-base text-gray-100 max-w-xl sm:text-lg md:text-xl">
              {{ domaine.description }}
            </h2>

            <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div class="text-center">
                <p class="text-xs mb-4 font-medium text-white">Je veux aider</p>
                <NuxtLink
                  v-if="!$stores.auth.isLogged"
                  to="/inscription"
                  :class="$filters.label(domaine.id, 'domaines', 'color')"
                  class="shadow-lg w-full flex items-center justify-center px-10 py-3 text-base mb-4 font-medium rounded-full bg-white hover:bg-white !outline-none focus:ring transition md:py-4 md:text-lg md:px-15"
                >
                  Devenir bénévole
                </NuxtLink>
                <a
                  v-else
                  href="#recherche"
                  :class="$filters.label(domaine.id, 'domaines', 'color')"
                  class="shadow-lg w-full flex items-center justify-center px-10 py-3 text-base mb-4 font-medium rounded-full bg-white hover:bg-white !outline-none focus:ring transition md:py-4 md:text-lg md:px-15"
                >
                  Trouver une mission
                </a>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-6 text-center">
                <p class="text-xs mb-4 font-medium text-white">
                  Mon organisation a besoin de renfort
                </p>
                <NuxtLink
                  :to="
                    $stores.auth.isLogged && $stores.auth.contextRole == 'responsable'
                      ? `/admin/organisations/${$stores.auth.contextableId}/missions/add`
                      : '/inscription/responsable'
                  "
                  class="shadow-lg w-full flex items-center justify-center px-8 py-3 border-transparent border text-base mb-4 font-medium rounded-full text-white bg-red-600 hover:bg-red-700 !outline-none focus:ring transition md:py-4 md:text-lg md:px-9"
                >
                  Proposer une mission
                </NuxtLink>
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
            <NuxtImg
              ref="logo"
              class="h-14 object-contain"
              alt="logo-partenaire-domaine"
              :src="media.urls.original"
              :srcset="media.urls.small"
              @error="$refs.logo.$el.remove()"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="hidden sm:block bg-white z-10">
      <div>
        <div class="grid grid-cols-2 gap-0 md:grid-cols-6 lg:grid-cols-6">
          <div
            v-for="media in domaine.illustrations"
            :key="media.id"
            class="justify-center md:col-span-2 lg:col-span-1"
          >
            <NuxtImg
              ref="carousel"
              :src="media.urls.original"
              :srcset="media.urls.carousel"
              :alt="`illustration ${domaine.name}`"
              sizes="(min-width: 1024px) 16.666vw, (min-width: 768px) 33.333vw, 50vw"
              height="430"
              width="430"
              @error="$refs.carousel.$el.remove()"
            />
          </div>
        </div>
      </div>
    </div>

    <div :class="$filters.label(domaine.id, 'domaines', 'bg')">
      <div class="container mx-auto py-12 pt-16 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto text-center">
          <h2 class="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
            Rejoignez le mouvement #JeVeuxAider
          </h2>
          <p class="text-xl max-w-2xl mx-auto leading-8 text-white mt-2">
            Sur l’ensemble du territoire français, des milliers de bénévoles et d’organisations se
            sont déjà ralliés à JeVeuxAider.gouv.fr pour soutenir ce domaine d'action.
          </p>
          <dl class="mt-12 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div class="flex flex-col">
              <dd class="text-5xl leading-none font-bold text-white">
                {{ $numeral(statistics.volontaires_count) }}
              </dd>
              <dt class="mt-2 text-lg font-medium text-white">Bénévoles</dt>
            </div>
            <div class="flex flex-col mt-10 sm:mt-0">
              <dd class="text-5xl leading-none font-bold text-white">
                {{ $numeral(statistics.structures_count) }}
              </dd>
              <dt class="mt-2 text-lg font-medium text-white">Organisations</dt>
            </div>
            <div class="flex flex-col mt-10 sm:mt-0">
              <dd class="text-5xl leading-none font-bold text-white">
                {{ $numeral(statistics.participations_count) }}
              </dd>
              <dt class="mt-2 text-lg font-medium text-white">Mises en relation</dt>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <AlgoliaSearch
      id="recherche"
      :initial-filters="`domaines:&quot;${domaine.name}&quot;`"
      :with-slideshow-remote="true"
      :secondary-filters="[
        'is_autonomy',
        'structure.name',
        'is_ponctual',
        'publics_beneficiaires',
        'is_minors',
        'tags',
        'structure.reseaux.name',
        'department_name',
        'template_subtitle',
        'publisher_name',
      ]"
      class="my-8 sm:my-16 lg:my-24"
    />

    <div class="bg-gray-50 border-b border-gray-200 py-12 lg:py-16">
      <div class="container mx-auto px-4 sm:px-6">
        <div class="flex flex-col items-center justify-center text-center">
          <p
            class="text-3xl leading-9 font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
          >
            Votre organisation a besoin de
            <span :class="$filters.label(domaine.id, 'domaines', 'color')">bénévoles</span>&nbsp;?
          </p>
          <div class="mt-8">
            <div class="inline-flex rounded-full shadow">
              <NuxtLink
                :to="
                  $stores.auth.isLogged && $stores.auth.contextRole == 'responsable'
                    ? `/admin/organisations/${$stores.auth.contextableId}/missions/add`
                    : '/inscription/responsable'
                "
                :class="$filters.label(domaine.id, 'domaines', 'bg')"
                class="inline-flex items-center justify-center px-7 py-3 border border-transparent text-base font-medium rounded-full text-white !outline-none focus:ring transition"
              >
                Rejoignez JeVeuxAider.gouv.fr
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="domaine.logos_partenaires_actifs.length" class="bg-white border-gray-200 border-b">
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
            <NuxtImg
              :ref="`partenaire-${media.id}`"
              alt="Partenaire"
              class="h-14 object-contain"
              :src="media.urls.original"
              :srcset="media.urls.small"
              @error="$refs[`partenaire-${media.id}`]?.$el.remove()"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlgoliaSearch from '~/components/section/search/missions/AlgoliaSearch.vue'

export default defineNuxtComponent({
  components: {
    AlgoliaSearch,
  },
  async setup() {
    const route = useRoute()
    const { $stores } = useNuxtApp()

    const { data: domaine, error: errorDomaine } = await useApiFetch(
      `/domaines/${route.params.slug}`
    )

    if (errorDomaine.value) {
      showError({
        statusCode: errorStatistics.value.statusCode,
      })
    }
    if (!domaine.value) {
      return showError({ statusCode: 404 })
    }
    if (!domaine.value.published && $stores.auth.contextRole !== 'admin') {
      return showError({ statusCode: 403 })
    }

    const { data: statistics, error: errorStatistics } = await useApiFetch(
      `/domaines/${domaine.value.id}/statistics`
    )
    if (errorStatistics.value) {
      showError({
        statusCode: errorStatistics.value.statusCode,
      })
    }

    let domaineSeo
    switch (domaine.value.name) {
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

    useHead({
      title: `Devenez bénévole dans une association pour ${domaineSeo} | Je Veux Aider`,
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr/domaines-action/${domaine.value.slug}`,
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Des milliers de places sont disponibles dans des associations pour ${domaineSeo}. Trouvez la mission qui vous correspond, sur le terrain ou à distance, partout en France, dès 16 ans.`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg',
        },
      ],
    })

    return {
      domaine,
      statistics,
    }
  },
})
</script>
