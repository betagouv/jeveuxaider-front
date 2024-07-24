<template>
  <div id="more-numbers" class="bg-jva-green-500 p-10 shadow-lg overflow-hidden">
    <div class="">
      <BaseHeading as="h2" :level="3" class="text-white font-extrabold mb-4">
        Plus de chiffres
      </BaseHeading>
      <div class="text-xl text-white max-w-[260px] mb-6">
        Tout l'historique de votre activité sur la plateforme
      </div>
      <DsfrButton
        type="tertiary-no-outline"
        class="text-jva-green-500"
        @click.native="
          $router.push(
            `/admin/statistics?start_date=${$dayjs()
              .subtract(1, 'year')
              .format('YYYY-MM-DD')}&end_date=${$dayjs().format('YYYY-MM-DD')}`
          )
        "
      >
        Vos statistiques
      </DsfrButton>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  methods: {
    onClick() {
      window.open('https://reserve-civique.crisp.help/fr/', '_blank')
    },
  },
})
</script>

<style lang="postcss" scoped>
#more-numbers {
  background-image: url('/images/dashboard/bg-more-numbers.png');
  background-position: right -24px bottom;
  background-repeat: no-repeat;
}
</style>
