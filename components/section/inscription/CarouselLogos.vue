<template>
  <BaseSlideshow
    :dots="false"
    :loop="true"
    :autoplay="true"
    class="mt-12"
    container-padding-bottom="0"
    aria-labelledby="label-carousel-logos-inscription-benevoles"
  >
    <swiper-slide
      v-for="(logo, i) in logos"
      :key="i"
      :class="[
        'px-8 m-auto !flex w-auto h-full',
        { 'swiper-slide-active': i === 0 },
        { 'swiper-slide-next': i === 1 },
      ]"
    >
      <img
        :src="logo.src"
        :srcset="logo.srcset"
        :alt="logo.alt"
        class="flex-none max-w-[150px] max-h-[60px] object-contain"
        data-not-lazy
        draggable="false"
      />
    </swiper-slide>
  </BaseSlideshow>
</template>

<script>
export default defineNuxtComponent({
  data() {
    return {
      logos: [
        {
          alt: 'Article1',
          src: '/images/inscription/logo-article1.png',
          srcset:
            '/images/inscription/logo-article1.png, /images/inscription/logo-article1@2x.png 2x',
        },
        {
          alt: 'APHP',
          src: '/images/inscription/logo_aphp.png',
        },
        {
          alt: 'Emmaus',
          src: '/images/inscription/logo_emmaus.png',
        },
        {
          alt: 'Banque Alimentaire',
          src: '/images/inscription/logo_banquealimentaire.png',
        },
        {
          alt: "J'agis pour la nature",
          src: '/images/inscription/logo-fnh.png',
          srcset: '/images/inscription/logo-fnh.png, /images/inscription/logo-fnh@2x.png 2x',
        },
        {
          alt: 'AFEV',
          src: '/images/inscription/logo-afev.png',
          srcset: '/images/inscription/logo-afev.png, /images/inscription/logo-afev@2x.png 2x',
        },
        {
          alt: 'Benenova',
          src: '/images/inscription/logo-benenova.png',
          srcset:
            '/images/inscription/logo-benenova.png, /images/inscription/logo-benenova@2x.png 2x',
        },
        {
          alt: 'Benevolt',
          src: '/images/inscription/logo-benevolt.png',
          srcset:
            '/images/inscription/logo-benevolt.png, /images/inscription/logo-benevolt@2x.png 2x',
        },
        {
          alt: 'Makesense',
          src: '/images/inscription/logo-makesense.png',
          srcset:
            '/images/inscription/logo-makesense.png, /images/inscription/logo-makesense@2x.png 2x',
        },
        {
          alt: 'Singa',
          src: '/images/inscription/logo-singa.png',
          srcset: '/images/inscription/logo-singa.png, /images/inscription/logo-singa@2x.png 2x',
        },
        {
          alt: 'Pays de grasse',
          src: '/images/inscription/logo-pays-de-grasse.png',
          srcset:
            '/images/inscription/logo-pays-de-grasse.png, /images/inscription/logo-pays-de-grasse@2x.png 2x',
        },
        {
          alt: 'Pro bono lab',
          src: '/images/inscription/logo-pro-bono-lab.png',
          srcset:
            '/images/inscription/logo-pro-bono-lab.png, /images/inscription/logo-pro-bono-lab@2x.png 2x',
        },
        {
          alt: 'Protection Civile',
          src: '/images/inscription/logo-protection-civile.png',
          srcset:
            '/images/inscription/logo-protection-civile.png, /images/inscription/logo-protection-civile@2x.png 2x',
        },
        {
          alt: 'Sciences Po',
          src: '/images/inscription/logo-sciences-po.png',
          srcset:
            '/images/inscription/logo-sciences-po.png, /images/inscription/logo-sciences-po@2x.png 2x',
        },
      ],
    }
  },
})
</script>
