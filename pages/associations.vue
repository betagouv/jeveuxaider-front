<template>
  <div>
    <Breadcrumb
      :items="[{ label: 'Associations', link: '/associations' }]"
      class="container md:px-8 border-b-0"
    />
    <AlgoliaSearch
      :secondary-filters="['domaines.name', 'reseaux.name', 'department_name']"
    />
  </div>
</template>

<script>
import AlgoliaSearch from '~/components/section/search/organisations/AlgoliaSearch.vue'

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
        'Découvrez toutes les associations | Je Veux Aider, la plateforme publique du bénévolat par la Réserve Civique ',
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
            "Plus de 6 000 associations dans 10 domaines d'action : solidarité, insertion, éducation, environnement, santé, sport, culture ... Trouvez la mission qui vous correspond, sur le terrain ou à distance, partout en France, dès 16 ans."
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
