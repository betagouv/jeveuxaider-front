<template>
  <div class="mt-6">
    <AlgoliaSearch
      id="recherche"
      :secondary-filters="[
        'is_autonomy',
        'structure.name',
        'is_ponctual',
        'publics_beneficiaires',
        'is_minors',
        'tags',
        'domaines',
        'structure.reseaux.name',
        'department_name',
        'template_subtitle',
        'publisher_name',
      ]"
      :with-slideshow-remote="true"
      class="pt-2 sm:pt-6"
    />
    <SectionSearchBlocFaq />
  </div>
</template>

<script>
import AlgoliaSearch from '@/components/section/search/missions/AlgoliaSearch.vue'

export default defineNuxtComponent({
  components: {
    AlgoliaSearch,
  },
  setup() {
    definePageMeta({
      middleware: ['old-search-redirections'],
    })

    const route = useRoute()
    let title =
      'Devenez bénévole dans une association en quelques clics | JeVeuxAider.gouv.fr, la plateforme publique du bénévolat par la Réserve Civique'
    if (route.query?.page) {
      title = `${title} - Recherche page ${route.query?.page}`
    }

    useHead({
      title,
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/missions-benevolat',
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Plus de 15 000 missions disponibles dans 10 domaines d'action : solidarité, insertion, éducation, environnement, santé, sport, culture ... Trouvez la mission qui vous correspond, sur le terrain ou à distance, partout en France, dès 16 ans.",
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg',
        },
      ],
    })
  },
})
</script>
