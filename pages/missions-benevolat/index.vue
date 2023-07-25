<template>
  <div class="mt-6 sm:mt-10">
    <AlgoliaSearch
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
        'publisher_name'
      ]"
    />
  </div>
</template>

<script>
import AlgoliaSearch from '~/components/section/search/missions/AlgoliaSearch.vue'

export default {
  components: {
    AlgoliaSearch
  },
  middleware: 'search',
  data () {
    return {
    }
  },
  head () {
    let title = 'Devenez bénévole dans une association en quelques clics | Je Veux Aider, la plateforme publique du bénévolat par la Réserve Civique'
    if (this.$route.query?.page) {
      title = `${title} - Recherche page ${this.$route.query?.page}`
    }
    return {
      title,
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/missions-benevolat'
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "50 000 places disponibles dans 10 domaines d'action : solidarité, insertion, éducation, environnement, santé, sport, culture ... Trouvez la mission qui vous correspond, sur le terrain ou à distance, partout en France, dès 16 ans."
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg'
        }
      ]
    }
  }

}
</script>
