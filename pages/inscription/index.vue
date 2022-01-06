<template>
  <div class="relative bg-[#081992] overflow-hidden">
    <img
      class="z-1 object-cover absolute h-screen lg:h-auto"
      alt="JeVeuxAider"
      srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x, /images/bg-jva.jpg"
      data-not-lazy
    >
    <div class="relative z-10 py-12 lg:py-24">
      <div class=" text-center">
        <h2
          class="text-3xl md:text-5xl text-white font-light !leading-tight tracking-tight"
        >
          Un petit clic pour vous, <br>
          <span class="font-bold">un grand geste pour la solidarité.</span>
        </h2>
        <div class="text-xl md:text-3xl text-white mt-2 tracking-tight">
          Que peut-on faire pour vous ?
        </div>
      </div>
      <div
        class="flex flex-col space-y-4 items-center justify-center mt-12 mb-12 md:flex-row md:space-x-6 md:space-y-0"
      >
        <nuxt-link to="/inscription/benevole">
          <BoxItem
            icon="💪"
            title="Je veux devenir<br><strong>bénévole</strong>"
            subtitle="Citoyens français et résidents réguliers (mineurs inclus)"
          />
        </nuxt-link>
        <div class="text-white text-lg">
          ou
        </div>
        <nuxt-link to="/inscription/responsable">
          <BoxItem
            icon="📢"
            title="Je veux publier<br><strong>des missions</strong>"
            subtitle="Organisations publiques, collectivités et associations"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import BoxItem from '@/components/section/inscription/BoxItem'

export default {
  name: 'Inscription',
  components: {
    BoxItem
  },
  middleware: 'guest',
  head () {
    return {
      title:
        'Devenez bénévole avec JeVeuxAider.gouv.fr, la plateforme publique du bénévolat par la Réserve Civique',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Créez votre page dédiée et centralisez les missions de vos associations et organisations publiques afin de promouvoir le bénévolat de proximité.'
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
