<template>
  <div>
    <Presentation
      :domaine="domaine"
      :src-set="image1"
      :places-left="statistics?.places_left"
      :redirect-parameters="{
        domaines: domaine.name,
      }"
    />
    <Details
      :domaine="domaine"
      :statistics="statistics"
      :redirect-parameters="{
        domaines: domaine.name,
      }"
    />
    <SectionAlgoliaFacetsActivities
      :title="`Au programme des activités bénévoles pour ${domaine.name}`"
      :redirect-parameters="{
        domaines: domaine.name,
      }"
      :search-parameters="{
        filters: `domaines:&quot;${domaine.name}&quot;`,
        hitsPerPage: 6,
      }"
    />
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
  </div>
</template>

<script>
import AlgoliaSearch from '~/components/section/search/missions/AlgoliaSearch.vue'
import Presentation from '@/components/section/domaine/Presentation.vue'
import Details from '@/components/section/domaine/Details.vue'

export default defineNuxtComponent({
  components: {
    Presentation,
    Details,
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
  computed: {
    image1() {
      return this.domaine?.banner?.urls?.large ?? '/images/organisation-default-1.webp'
    },
    // image2() {
    //   return (
    //     this.organisation?.override_image2?.urls.large ??
    //     this.organisation?.illustrations?.[1]?.urls.large ??
    //     '/images/organisation-default-2.webp'
    //   )
    // },
  },
})
</script>
