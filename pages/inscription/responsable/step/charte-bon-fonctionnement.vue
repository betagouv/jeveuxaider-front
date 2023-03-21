<template>
  <div class="relative bg-[#081992]">
    <img
      class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
      alt="JeVeuxAider.gouv.fr"
      srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x, /images/bg-jva.jpg"
      data-not-lazy
    >
    <div class="relative container py-12 lg:py-16">
      <div class="mb-12 text-center text-white">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4 lg:mb-8 max-w-4xl mx-auto tracking-tight">
          Les règles de bon fonctionnement
        </h1>
        <p class="text-lg lg:text-2xl">
          Charte co-rédigée avec les responsables d’organisation de la plateforme
        </p>
      </div>
      <Box :padding="false" class="max-w-[1000px] mx-auto px-6 py-8 md:py-12 md:px-16 lg:px-24 lg:py-16">
        <p class="md:text-center md:text-lg lg:text-xl mb-4 lg:mb-8">
          En vous inscrivant sur la plateforme, vous vous engagez à suivre des règles de fonctionnement qui facilitent la mobilisation de bénévoles.
        </p>

        <AccordionsGroup>
          <Accordion title-variant="xxl">
            <template slot="title">
              <!-- @todo: icone -->
              Proposer des missions de bénévolat d’intérêt général, à l’exclusion de tout autre type de mission.
            </template>

            <div class="formatted-text md:text-lg lg:text-xl">
              <p>
                Nous portons une attention toute particulière au fait que les missions publiées ne se substituent pas à l’emploi, et sont bien d’intérêt général.
              </p>
              <p>
                <span aria-hidden="true">❗</span> Si nous observons que votre mission ne respecte pas ce cadre, nous serons contraints de la signaler et de la supprimer de la plateforme. Ce serait dommage !
              </p>
            </div>
          </Accordion>
          <!-- @todo suite -->
        </AccordionsGroup>
      </Box>
    </div>
  </div>
</template>

<script>
import Accordion from '~/components/dsfr/Accordion.vue'
import AccordionsGroup from '~/components/dsfr/AccordionsGroup.vue'

export default {
  components: {
    Accordion,
    AccordionsGroup
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
