<template>
  <div>
    <Presentation
      :domaine="domaine"
      :src-set="image1"
      :places-left="statistics?.places_left_count"
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
      :title="`Au programme des activités bénévoles pour ${suffixeTitle}`"
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
        // 'is_autonomy',
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
      pagination-anchor-content-id="recherche"
      class="py-4 my-4 sm:py-8 sm:my-8 lg:py-12 lg:my-12"
    />
    <SectionPartenairesEngagementSousToutesSesFormes
      :partenaires="$labels.domaines.find((item) => item.key === domaine.id)?.partenaires"
      :title="$labels.domaines.find((item) => item.key === domaine.id)?.engagementTitle"
    />
    <SectionFaqParagraph
      v-if="domaine.faq"
      :paragraphs="domaine.faq"
      :title="$labels.domaines.find((item) => item.key === domaine.id)?.benevolatTitle"
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

    const title = domaine.value.metatags?.properties?.title ?? domaine.value.title
    useHead({
      title: `${title} | JeVeuxAider.gouv.fr`,
      link: [
        {
          rel: 'canonical',
          href: `https://www.jeveuxaider.gouv.fr${domaine.value.full_url}`,
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: domaine.value.metatags?.properties?.description ?? domaine.value.description,
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
    suffixeTitle() {
      switch (this.domaine?.id) {
        case 1:
          return 'la santé'
        case 2:
          return 'la prévention et la protection'
        case 3:
          return 'l‘art et la culture'
        case 4:
          return 'le sport'
        case 5:
          return 'la Covid-19'
        case 6:
          return 'la coopération internationale'
        case 7:
          return 'la solidarité et l‘insertion'
        case 8:
          return 'la mémoire et la citoyenneté'
        case 9:
          return 'l‘éducation'
        case 10:
          return 'la protection de la nature'
        case 11:
          return 'le bénévolat de compétences'
        default:
          return this.domaine?.name
      }
    },
  },
})
</script>
