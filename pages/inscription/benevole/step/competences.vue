<template>
  <div class="relative">
    <client-only>
      <portal
        to="sidebar"
      >
        <div class="text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
          Ça ne devrait pas prendre plus de 3 minutes 😉
        </div>
        <Steps
          :steps="steps"
        />
      </portal>
    </client-only>

    <div class="mb-6 lg:mb-12 text-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium leading-12 mb-4">
        Dites-nous en plus<br>
        sur vous
        <span class="font-bold">{{ $store.getters.profile.first_name }}</span>
      </h1>
    </div>
    <div class="max-w-xl mx-auto">
      <div
        class="px-8 pt-6 pb-6 bg-white text-black text-3xl font-extrabold leading-9 text-center rounded-t-lg"
      >
        Renseignez vos compétences
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          @TODO
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import MixinForm from '@/mixins/form'

export default {
  mixins: [MixinForm],
  layout: 'register-steps',
  data () {
    return {
      loading: false,
      steps: [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/benevole/step/profile'
        },
        {
          name: 'Votre profil',
          status: 'complete',
          href: '/inscription/benevole/step/profile'
        },
        {
          name: 'Vos disponibilités',
          status: 'complete',
          href: '/inscription/benevole/step/disponibilites'
        },
        {
          name: 'Vos compétences',
          status: 'current'
        }
      ],
      form: _.cloneDeep(this.$store.state.auth.user.profile)
    }
  },
  methods: {
    async onSubmit () {
      this.loading = true
      await this.$store.dispatch('user/updateProfile', {
        id: this.$store.getters.profile.id,
        ...this.form
      })
      this.loading = false
      window.plausible &&
        window.plausible('Inscription bénévole - Étape 4 - Compétences')
      this.$router.push('/profile')
    }
  }

}
</script>

<style>

</style>
