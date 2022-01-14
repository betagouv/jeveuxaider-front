<template>
  <div id="petit-mot" class="bg-[#FEF8F4] p-12 rounded-xl shadow-lg border-l-4 border-[#EADBD1] text-gray-800">
    <template v-if="loading">
      <LoadingIndicator> Récupération du petit mot</LoadingIndicator>
    </template>
    <template v-else>
      <div v-if="messages" class="flex justify-center flex-col lg:flex-row lg:items-start gap-6 items-start">
        <img
          srcset="/images/dashboard/giulietta.png, /images/dashboard/giulietta@2x.png 2x"
          alt="Gulietta"
          data-not-lazy
        >
        <div class="flex-1">
          <div class="text-xl mb-6">
            <span class="font-bold">{{ messages.title }}</span> de l'équipe JeVeuxAider.gouv.fr
          </div>
          <div class="text-lg">
            “{{ petitMotByRole }}”
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingIndicator from '@/components/custom/LoadingIndicator'

export default {
  components: {
    LoadingIndicator
  },
  data () {
    return {
      loading: true,
      messages: null
    }
  },
  computed: {
    petitMotByRole () {
      if (this.$store.getters.currentRole.key === 'responsable') {
        return this.messages.responsable_organisation
      } else if (this.$store.getters.currentRole.key === 'responsable_territoire') {
        return this.messages.responsable_territoire
      } else if (this.$store.getters.currentRole.key === 'tete_de_reseau') {
        return this.messages.responsable_reseau
      } else if (this.$store.getters.currentRole.key === 'referent') {
        return this.messages.referent_departemental
      } else if (this.$store.getters.currentRole.key === 'referent_regional') {
        return this.messages.referent_regional
      } else if (this.$store.getters.currentRole.key === 'analyste') {
        return this.messages.analyste
      } else if (this.$store.getters.currentRole.key === 'admin') {
        return this.messages.admin
      } else {
        return this.messages.benevole
      }
    }
  },
  created () {
    this.$axios.get('/settings/messages').then((response) => {
      this.messages = response.data
      this.loading = false
    })
  }
}
</script>

<style lang="postcss" scoped>
#petit-mot{
  background-image: url('/images/dashboard/bg-petit-mot.png');
  background-position: right 38px bottom 38px;
  background-repeat: no-repeat;
}
</style>
