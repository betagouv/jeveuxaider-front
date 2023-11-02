<template>
  <div class="relative bg-[#081992]">
    <img
      class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
      alt="JeVeuxAider.gouv.fr"
      src="/images/bg-jva.jpg"
      srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x"
      data-not-lazy
    />
    <div class="relative z-10 py-12 lg:py-24 px-6">
      <div class="text-center">
        <h2 class="text-3xl md:text-5xl text-white font-light !leading-tight tracking-tight">
          Un petit clic pour vous, <br />
          <span class="font-bold">un grand geste pour la solidarité.</span>
        </h2>
        <div class="text-xl md:text-3xl text-white mt-2 tracking-tight">
          Que peut-on faire pour vous ?
        </div>
      </div>
      <div
        class="flex flex-col space-y-4 items-center justify-center mt-12 mb-12 md:flex-row md:space-x-6 md:space-y-0"
      >
        <nuxt-link no-prefetch to="/inscription/benevole" class="w-full md:w-auto">
          <BoxItem
            icon="💪"
            title="Je veux devenir<br><strong>bénévole</strong>"
            subtitle="Vous avez plus de 16 ans, vous avez la nationalité française ou le statut de résident régulier."
          />
        </nuxt-link>
        <div class="text-white text-lg">ou</div>
        <nuxt-link no-prefetch to="/inscription/responsable" class="w-full md:w-auto">
          <BoxItem
            icon="📢"
            title="Je veux publier<br><strong>des missions</strong>"
            subtitle="Vous représentez une association, une organisation publique ou bien une collectivité territoriale."
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import BoxItem from '@/components/section/inscription/BoxItem.vue'

export default defineNuxtComponent({
  name: 'Inscription',
  components: {
    BoxItem,
  },
  setup() {
    definePageMeta({
      middleware: ['guest'],
    })

    useHead({
      title:
        'Devenez bénévole avec JeVeuxAider.gouv.fr, la plateforme publique du bénévolat par la Réserve Civique',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Créez votre page dédiée et centralisez les missions de vos associations et organisations publiques afin de promouvoir le bénévolat de proximité.',
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
