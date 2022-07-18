<template>
  <div>
    <Breadcrumb
      :items="[{ label: 'Missions de bénévolat', link: '/missions-benevolat' }]"
      class="container md:px-8 border-b-0"
    />
    <AlgoliaSearch
      :secondary-filters="['is_autonomy','structure.name','publics_beneficiaires', 'domaines', 'structure.reseaux.name', 'department_name', 'template_subtitle']"
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
    return {
      title:
        'Devenez bénévole dans une association en quelques clics | Je Veux Aider, la plateforme publique du bénévolat par la Réserve Civique ',
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
