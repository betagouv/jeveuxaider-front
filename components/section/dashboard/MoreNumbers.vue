<template>
  <div id="help-center" class="bg-jva-green-500 p-12 rounded-xl shadow-lg overflow-hidden">
    <div class="space-y-4">
      <Heading as="h2" :level="2" class="text-white font-extrabold">
        Plus de chiffres
      </Heading>
      <div class="text-xl text-white font-bold max-w-[260px]">
        Tout l'historique de votre activité sur la plateforme
      </div>
      <Button variant="white-green" @click.native="$router.push('/admin/numbers')">
        Vos performances
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClick () {
      window.open('https://reserve-civique.crisp.help/fr/', '_blank')
    }
  }
}
</script>

<style lang="postcss" scoped>

#help-center {
  background-image: url('/images/dashboard/bg-more-numbers.png');
  background-position: right -24px bottom;
  background-repeat: no-repeat;
}

</style>
