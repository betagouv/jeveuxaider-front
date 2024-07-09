<template>
  <div id="more-numbers" class="bg-jva-green-500 p-12 shadow-lg overflow-hidden">
    <div class="space-y-4">
      <BaseHeading as="h2" :level="2" class="text-white font-extrabold">
        Plus de chiffres
      </BaseHeading>
      <div class="text-xl text-white font-bold max-w-[260px]">
        Tout l'historique de votre activité sur la plateforme
      </div>
      <BaseButton
        variant="white-green"
        @click.native="
          $router.push(
            `/admin/statistics?start_date=${$dayjs()
              .subtract(1, 'year')
              .format('YYYY-MM-DD')}&end_date=${$dayjs().format('YYYY-MM-DD')}`
          )
        "
      >
        Vos statistiques
      </BaseButton>
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
