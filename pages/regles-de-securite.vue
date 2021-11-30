<template>
  <div class="py-12">
    <div class="container">
      <Heading as="h1" :level="1">
        Règles de sécurité
      </Heading>
      <Box class="mt-12">
        <Heading as="h2" :level="2">
          Des gestes simples pour préserver votre santé et celle des autres
        </Heading>
        <div class="mt-20">
          <ul class="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <li>
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center font-semibold h-12 w-12 rounded-md bg-[#070191] text-white"
                  >
                    1
                  </div>
                </div>
                <div class="ml-4">
                  <h5 class="text-lg text-gray-900">
                    En toutes circonstances,
                    <b>je fais en sorte de garder ma distance de sécurité</b>
                    d’au moins un mètre avec les bénéficiaires et les autres
                    bénévoles.
                  </h5>
                </div>
              </div>
            </li>
            <li class="mt-10 md:mt-0">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center font-semibold h-12 w-12 rounded-md bg-[#070191] text-white"
                  >
                    2
                  </div>
                </div>
                <div class="ml-4">
                  <h5 class="text-lg text-gray-900">
                    En toutes circonstances,
                    <b>j’applique les gestes barrières</b> pour me protéger et
                    protéger les bénéficiaires et les autres bénévoles.
                  </h5>
                </div>
              </div>
            </li>
            <li class="mt-10 md:mt-0">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center h-12 w-12 font-semibold rounded-md bg-[#070191] text-white"
                  >
                    3
                  </div>
                </div>
                <div class="ml-4">
                  <h5 class="text-lg text-gray-900">
                    <b>Je suis un ambassadeur des règles de sécurité</b> et
                    des gestes barrière que j’explique et promeus auprès des
                    bénéficiaires et des autres bénévoles.
                  </h5>
                </div>
              </div>
            </li>
            <!-- <li class="mt-10 md:mt-0">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center font-semibold h-12 w-12 rounded-md bg-[#070191] text-white"
                    >4</div>
                  </div>
                  <div class="ml-4">
                    <h5 class="text-lg text-gray-900">
                      Pour accomplir ma mission bénévole,
                      <b>je n’utilise pas les transports en commun</b> afin de
                      limiter les risques de contamination.
                    </h5>
                  </div>
                </div>
              </li> -->
            <li class="mt-10 md:mt-0">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center h-12 w-12 font-semibold rounded-md bg-[#070191] text-white"
                  >
                    4
                  </div>
                </div>
                <div class="ml-4">
                  <h5 class="text-lg text-gray-900">
                    <b>Au moindre doute d’infection</b>, sans attendre,
                    j’informe l’association et je reste chez moi.
                  </h5>
                </div>
              </div>
            </li>
            <li class="mt-10 md:mt-0">
              <div class="flex">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center font-semibold h-12 w-12 rounded-md bg-[#070191] text-white"
                  >
                    5
                  </div>
                </div>
                <div class="ml-4">
                  <h5 class="text-lg text-gray-900">
                    <b>
                      Âgé de 70 ans ou plus ou porteur d’une maladie
                      chronique</b>, je ne m’engage que dans des missions à distance, depuis
                    mon domicile, pour protéger au maximum ma santé et celle
                    des autres.
                  </h5>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Box>
    </div>
  </div>
</template>

<script>

export default {
  head () {
    return {
      title: 'Règles de sécurité | JeVeuxAider.gouv.fr',
      link: [
        {
          rel: 'canonical',
          href: 'https://www.jeveuxaider.gouv.fr/mentions-legales'
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            "La plateforme JeVeuxAider.gouv.fr est un service public numérique destiné à organiser l'engagement civique bénévole en France. Elle permet à toute personne âgée de plus de 16 ans de s’engager dans des missions de bénévolat."
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
