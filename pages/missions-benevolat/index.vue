<template>
  <div class="bg-gray-100">
    <Breadcrumb
      theme="dark"
      :items="[{ label: 'Missions de bénévolat', link: '/missions-benevolat' }]"
    />
    <SearchMissions />
  </div>
</template>

<script>
import Breadcrumb from '~/components/layout/Breadcrumb.vue'
import SearchMissions from '~/components/section/SearchMissions.vue'

export default {
  components: {
    Breadcrumb,
    SearchMissions
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
