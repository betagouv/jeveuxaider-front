<template>
  <div class="bg-[#F9F6F2]">
    <BlocBanner />
    <BlocInscriptionBenevole />
    <BlocInscriptionResponsable />
    <BlocActivities />
    <PrintempsPourLaPlanete />
    <BlocMissionsCourtes />
    <BlocActionsBenevolesPopulaires />
    <BlocTemoignages />
    <BlocActualites v-if="$store.state.settings.general.blog_active" />
    <BlocActeursEngagement />

    <!-- <Banner />
    <Organisations />

    <hr class="mt-12 pt-12 md:hidden border-[#CDCDCD]">

    <MissionsPrioritaires />

    <Domaines />
    <EngagezVous />
    <Blog v-if="$store.state.settings.general.blog_active" />
    <Temoignages />

    <section class="py-16 bg-[#ECECFE] border-t border-[#C1C1FB]">
      <div class="container mx-auto px-4 ">
        <div class="lg:flex w-full">
          <Newsletter class="w-full max-w-[690px] flex-grow" />
          <div class="hidden lg:flex flex-none self-stretch w-[1px] bg-[#C1C1FB] mx-16 xl:mx-24" />
          <Communaute class="sm:min-w-[300px] mt-16 lg:mt-0" />
        </div>
      </div>
    </section>

    <section class="pt-16">
      <div class="container mx-auto px-4 xl:!max-w-[1412px]">
        <RejoindreLaCommunaute />
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4 xl:!max-w-[1412px]">
        <Heading as="h2" size="2xl" class="mb-16 text-center">
          Acteurs de l'engagement, <br class="hidden md:block xl:hidden">rejoignez le mouvement !
        </Heading>

        <div class="grid gap-5 lg:grid-cols-2">
          <FacilitezRecrutement />
          <EncouragezEngagementLocal />
        </div>
      </div>
    </section>

    <Faq /> -->
  </div>
</template>

<script>
import BlocBanner from '~/components/section/home/BlocBanner.vue'
import BlocInscriptionBenevole from '~/components/section/home/BlocInscriptionBenevole.vue'
import BlocInscriptionResponsable from '~/components/section/home/BlocInscriptionResponsable.vue'
import BlocActivities from '@/components/section/home/BlocActivities.vue'
import PrintempsPourLaPlanete from '@/components/section/operations/PrintempsPourLaPlanete.vue'
import BlocMissionsCourtes from '@/components/section/home/BlocMissionsCourtes.vue'
import BlocActionsBenevolesPopulaires from '@/components/section/home/BlocActionsBenevolesPopulaires.vue'
import BlocTemoignages from '@/components/section/home/BlocTemoignages.vue'
import BlocActualites from '@/components/section/home/BlocActualites.vue'
import BlocActeursEngagement from '@/components/section/home/BlocActeursEngagement.vue'

export default {
  components: {
    BlocBanner,
    BlocInscriptionBenevole,
    BlocInscriptionResponsable,
    BlocActivities,
    PrintempsPourLaPlanete,
    BlocMissionsCourtes,
    BlocActionsBenevolesPopulaires,
    BlocTemoignages,
    BlocActualites,
    BlocActeursEngagement
  },
  head () {
    return {
      title:
        'Je Veux Aider | Devenez bénévole dans une association en quelques clics | La plateforme publique du bénévolat par la Réserve Civique',
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/'
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "Trouvez une mission de bénévolat dans une association, organisation publique ou une commune, partout en France, sur le terrain ou à distance. 50 000 places disponibles dans 10 domaines d'action : solidarité, insertion, éducation, environnement, santé, sport, culture ..."
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/share-image.jpg'
        },
        {
          hid: 'facebook-domain-verification',
          name: 'facebook-domain-verification',
          content: '8jnmyx2s1iopvryhthxappg6b3tryp'
        }
      ]
    }
  }
}
</script>
