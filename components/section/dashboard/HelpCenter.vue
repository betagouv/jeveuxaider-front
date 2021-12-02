<template>
  <div id="help-center" class="bg-jva-blue-400 p-12 rounded-xl shadow-lg">
    <div class="space-y-4">
      <Heading as="h2" :level="2" class="text-white font-extrabold">
        Centre d'aide
      </Heading>
      <div class="text-xl text-white font-bold max-w-[260px]">
        Trouvez toutes les réponses à vos questions
      </div>
      <Button variant="white" @click.native="onClick()">
        Foire aux questions
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClick () {
      console.log('onClick')
      window.open('https://reserve-civique.crisp.help/fr/', '_blank')
    }
  }
}
</script>

<style lang="postcss" scoped>

#help-center {
  background-image: url('/images/dashboard/bg-help-center.png');
  background-position: right 38px center;
  background-repeat: no-repeat;
}

</style>
