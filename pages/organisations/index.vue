<template>
  <div class="mt-6 sm:mt-12">
    <AlgoliaSearch
      :secondary-filters="['domaines.name', 'reseaux.name', 'department_name', 'statut_juridique']"
    />
  </div>
</template>

<script>
import AlgoliaSearch from '@/components/section/search/organisations/AlgoliaSearch.vue'

export default defineNuxtComponent({
  components: {
    AlgoliaSearch,
  },
  async setup() {
    useHead({
      title:
        'Découvrez toutes les associations | JeVeuxAider.gouv.fr, la plateforme publique du bénévolat par la Réserve Civique ',
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
            "Plus de 6 000 associations dans 10 domaines d'action : solidarité, insertion, éducation, environnement, santé, sport, culture ... Trouvez la mission qui vous correspond, sur le terrain ou à distance, partout en France, dès 16 ans.",
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
