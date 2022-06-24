<template>
  <div class="relative">
    <client-only>
      <portal
        to="sidebar"
      >
        <div class="text-center lg:text-left text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
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
        class="px-8 py-8 bg-white text-black text-3xl font-extrabold leading-9 text-center rounded-t-lg"
      >
        Renseignez vos compétences
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div class="mb-8 text-md text-gray-500">
          Enrichissez votre profil avec les compétences que vous souhaitez mettre au service des organisations publiques ou associatives.
        </div>

        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <FormControl label="Renseignez vos compétences" html-for="algolia-search">
            <AlgoliaSkillsInput
              :items="form.skills"
              @add-item="handleSelectItems"
            />
          </FormControl>
        </form>

        <div v-if="form.skills.length" class="mt-6">
          <div class="flex flex-wrap gap-2">
            <TagFormItem
              v-for="item in form.skills"
              :key="item.id"
              :tag="item"
              @removed="onRemovedTagItem"
            >
              {{ item.name }}
            </TagFormItem>
          </div>
        </div>

        <Button
          class="mt-8"
          type="submit"
          size="xl"
          form="inscription"
          variant="green"
          full
          :loading="loading"
          @click="onSubmit"
        >
          Terminer
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import FormErrors from '@/mixins/form/errors'
import AlgoliaSkillsInput from '@/components/section/search/AlgoliaSkillsSearch'

export default {
  components: {
    AlgoliaSkillsInput
  },
  mixins: [FormErrors],
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
          name: 'Vos préférences',
          status: 'complete',
          href: '/inscription/benevole/step/preferences'
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
      form: cloneDeep(this.$store.state.auth.user.profile)
    }
  },
  methods: {
    handleSelectItems (item) {
      this.$set(this.form, 'skills', [...this.form.skills, item])
    },
    onRemovedTagItem (item) {
      this.form.skills = this.form.skills.filter(skill => skill.id !== item.id)
    },
    async onSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$store.dispatch('auth/updateProfile', {
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
