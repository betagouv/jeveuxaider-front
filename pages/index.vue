<template>
  <div>
    <BlocBanner />
    <template v-if="$stores.auth.isLogged">
      <BlocCaDevraitVousPlaire />
      <SeptembrePourApprendre />
      <BlocProfileActivities />
      <BlocTemoignages />
      <BlocActualites v-if="$stores.settings.general?.blog_active" />
      <BlocNewsletter />
    </template>
    <template v-if="!$stores.auth.isLogged">
      <div
        class="container md:!max-w-full xl:!max-w-[1680px] grid gap-6 xl:gap-8 md:grid-cols-2 py-4 md:py-6 lg:py-8"
      >
        <BlocInscriptionBenevole />
        <BlocInscriptionResponsable />
      </div>
      <BlocActivities />
      <SeptembrePourApprendre />
      <BlocMissionsCourtes />
      <BlocActionsBenevolesPopulaires />
      <BlocTemoignages />
      <BlocActualites v-if="$stores.settings.general?.blog_active" />
      <BlocActeursEngagement />
      <BlocNewsletter />
      <BlocFaq />
    </template>
  </div>
</template>

<script>
import BlocBanner from '@/components/section/home/BlocBanner.vue'
import BlocInscriptionBenevole from '@/components/section/home/BlocInscriptionBenevole.vue'
import BlocInscriptionResponsable from '@/components/section/home/BlocInscriptionResponsable.vue'
import BlocActivities from '@/components/section/home/BlocActivities.vue'
import BlocCaDevraitVousPlaire from '@/components/section/home/BlocCaDevraitVousPlaire.vue'
import SeptembrePourApprendre from '@/components/section/operations/SeptembrePourApprendre.vue'
import BlocMissionsCourtes from '@/components/section/home/BlocMissionsCourtes.vue'
import BlocActionsBenevolesPopulaires from '@/components/section/home/BlocActionsBenevolesPopulaires.vue'
import BlocTemoignages from '@/components/section/home/BlocTemoignages.vue'
import BlocActualites from '@/components/section/home/BlocActualites.vue'
import BlocActeursEngagement from '@/components/section/home/BlocActeursEngagement.vue'
import BlocNewsletter from '@/components/section/home/BlocNewsletter.vue'
import BlocFaq from '@/components/section/home/BlocFaq.vue'
import BlocProfileActivities from '@/components/section/home/BlocProfileActivities.vue'

export default defineNuxtComponent({
  setup() {
    useHead({
      title:
        'JeVeuxAider.gouv.fr | Devenez bénévole dans une association en quelques clics | La plateforme publique du bénévolat par la Réserve Civique',
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/',
        },
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Trouvez une mission de bénévolat dans une association, organisation publique ou une commune, partout en France, sur le terrain ou à distance. 50 000 places disponibles dans 10 domaines d'action : solidarité, insertion, éducation, environnement, santé, sport, culture ...",
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg',
        },
        {
          hid: 'facebook-domain-verification',
          name: 'facebook-domain-verification',
          content: '8jnmyx2s1iopvryhthxappg6b3tryp',
        },
      ],
    })
  },
  components: {
    BlocBanner,
    BlocInscriptionBenevole,
    BlocInscriptionResponsable,
    BlocActivities,
    BlocCaDevraitVousPlaire,
    BlocMissionsCourtes,
    BlocActionsBenevolesPopulaires,
    BlocTemoignages,
    BlocActualites,
    BlocActeursEngagement,
    BlocNewsletter,
    BlocFaq,
    BlocProfileActivities,
    SeptembrePourApprendre,
  },
})
</script>
