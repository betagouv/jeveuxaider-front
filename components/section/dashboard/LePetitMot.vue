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
          <div class="flex">
            <svg
              class=" flex-shrink-0 mr-2"
              fill="#F0E7DE"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            ><path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" /></svg>

            <div class="content text-lg" v-html="petitMotByRole" />
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
      if (this.$store.getters.currentRole?.key === 'responsable') {
        return this.messages.responsable_organisation
      } else if (this.$store.getters.currentRole?.key === 'responsable_territoire') {
        return this.messages.responsable_territoire
      } else if (this.$store.getters.currentRole?.key === 'tete_de_reseau') {
        return this.messages.responsable_reseau
      } else if (this.$store.getters.currentRole?.key === 'referent') {
        return this.messages.referent_departemental
      } else if (this.$store.getters.currentRole?.key === 'referent_regional') {
        return this.messages.referent_regional
      } else if (this.$store.getters.currentRole?.key === 'admin') {
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

#petit-mot .content :deep(a) {
  text-decoration: underline !important;
}
</style>
