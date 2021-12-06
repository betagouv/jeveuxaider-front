<template>
  <div>
    <Banner />
    <Organisations />

    <hr class="mt-12 pt-12 md:hidden border-[#CDCDCD]">

    <MissionsPrioritaires />

    <Domaines />
    <EngagezVous />
    <Blog />
    <Temoignages />

    <section>
      <div class="container mx-auto px-4 xl:max-w-[1412px]">
        <div class="grid gap-5 md:grid-cols-2">
          <Newsletter />
          <Facebook />
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4 xl:max-w-[1412px]">
        <h2
          class="text-4xl lg:text-[40px] lg:leading-[42px] tracking-tight text-center text-[#AFAFAE] mb-16"
        >
          Acteurs de l'engagement,
          <strong class="font-extrabold">rejoignez le mouvement !</strong>
        </h2>

        <div class="grid gap-5 md:grid-cols-2">
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
import Facebook from '@/components/section/homepage/Facebook'
import FacilitezRecrutement from '@/components/section/homepage/FacilitezRecrutement'
import EncouragezEngagementLocal from '@/components/section/homepage/EncouragezEngagementLocal'

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
    Facebook,
    FacilitezRecrutement,
    EncouragezEngagementLocal
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
