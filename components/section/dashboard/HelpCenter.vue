<template>
  <div id="help-center" class="bg-[#0063CB] p-10 shadow-lg overflow-hidden">
    <div class="">
      <BaseHeading as="h2" :level="3" class="text-white font-extrabold mb-4">
        Centre d’aide
      </BaseHeading>
      <div class="text-xl text-white max-w-[260px] mb-6">
        Trouvez toutes les réponses à vos questions
      </div>
      <DsfrButton type="tertiary-no-outline" @click.native="onClick()">
        Foire aux questions
      </DsfrButton>
    </div>
  </div>
</template>

<script>
export default defineNuxtComponent({
  methods: {
    onClick() {
      let url = 'https://reserve-civique.crisp.help/fr/'
      switch (this.$stores.auth.contextRole) {
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
    },
  },
})
</script>

<style lang="postcss" scoped>
#help-center {
  background-image: url('/images/dashboard/illus-centre-aide.svg');
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 210px auto;
  @screen xl {
    background-position: right bottom;
  }
}
</style>
