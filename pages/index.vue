<template>
  <div>
    <Banner />
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
          <Communaute class="min-w-[300px] mt-16 lg:mt-0" />
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4 xl:!max-w-[1412px]">
        <Heading as="h2" size="2xl" class="mb-12 text-center">
          Acteurs de l'engagement, rejoignez le mouvement !
        </Heading>

        <div class="grid gap-5 lg:grid-cols-2">
          <FacilitezRecrutement />
          <EncouragezEngagementLocal />
        </div>
      </div>
    </section>

    <Faq />
  </div>
</template>

<script>
import Banner from '@/components/section/homepage/Banner'
import Organisations from '@/components/section/homepage/Organisations'
import MissionsPrioritaires from '@/components/section/homepage/MissionsPrioritaires'
import Domaines from '@/components/section/homepage/Domaines'
import EngagezVous from '@/components/section/homepage/EngagezVous'
import Blog from '@/components/section/homepage/Blog'
import Temoignages from '@/components/section/homepage/Temoignages'
import Faq from '@/components/section/homepage/Faq'
import Newsletter from '@/components/section/homepage/Newsletter'
import Communaute from '@/components/section/homepage/Communaute'
import FacilitezRecrutement from '@/components/section/homepage/FacilitezRecrutement'
import EncouragezEngagementLocal from '@/components/section/homepage/EncouragezEngagementLocal'
import Heading from '@/components/dsfr/Heading.vue'

export default {
  components: {
    Banner,
    Organisations,
    MissionsPrioritaires,
    Domaines,
    EngagezVous,
    Blog,
    Temoignages,
    Faq,
    Newsletter,
    Communaute,
    FacilitezRecrutement,
    EncouragezEngagementLocal,
    Heading
  },
  head () {
    return {
      title:
        'Je Veux Aider | Devenez bénévole dans une association en quelques clics | La plateforme publique du bénévolat par la Réserve Civique',
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/'
        },
        {
          rel: 'preload',
          as: 'image',
          href: '/images/banner_mobile.jpg',
          imagesrcset: '/images/homepage/banner_mobile.webp, /images/homepage/banner_mobile.jpg, /images/homepage/banner_mobile@2x.webp 2x, /images/homepage/banner_mobile@2x.jpg  2x'
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
