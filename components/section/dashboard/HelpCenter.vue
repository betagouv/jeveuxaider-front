<template>
  <div id="help-center" class="bg-jva-blue-400 p-12 rounded-xl shadow-lg">
    <div class="space-y-4">
      <Heading as="h2" :level="2" class="text-white font-extrabold">
        Centre d'aide
      </Heading>
      <div class="text-xl text-white font-bold max-w-[260px]">
        Trouvez toutes les réponses à vos questions
      </div>
      <Button variant="white-blue" @click.native="onClick()">
        Foire aux questions
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClick () {
      let url = 'https://reserve-civique.crisp.help/fr/'
      switch (this.$store.getters.contextRole) {
        case 'referent':
        case 'referent_regional':
          url = 'https://reserve-civique.crisp.help/fr/category/referent-1j08uk0/'
          break
        case 'responsable':
          url = 'https://reserve-civique.crisp.help/fr/category/organisation-1u4m061/'
          break
        case 'responsable_territoire':
          url = 'https://reserve-civique.crisp.help/fr/category/collectivites-1s01ktj/'
          break
        case 'tete_de_reseau':
          url = 'https://reserve-civique.crisp.help/fr/category/tetes-de-reseau-1pfzcje/'
          break
        case 'volontaire':
          url = 'https://reserve-civique.crisp.help/fr/category/benevole-1avwdvi/'
          break
      }
      window.open(url, '_blank')
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
