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
        <span class="font-bold">{{ form.name }}</span> en images !
      </h1>
    </div>
    <div class="max-w-xl mx-auto">
      <div
        class="px-8 py-6 bg-white text-black text-3xl font-extrabold leading-9 text-center rounded-t-lg"
      >
        Faites briller votre organisation
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <FormControl label="Logo" html-for="logo">
            <ImageCrop
              :default-value="form.logo"
              :ratio="null"
              :min-height="112"
              :preview-width="235"
              :preview-height="56"
              preview-fit="contain"
              preview-classes="p-2"
              @add="addFiles({ files: [$event], collection: 'structure__logo' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </FormControl>

          <div class="bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: Media picker illustration 1 & 2
          </div>

          <Button
            type="submit"
            size="xl"
            variant="green"
            full
            :loading="loading"
            @click="onSubmit"
          >
            Terminer
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import FormUploads from '@/mixins/form/uploads'

export default {
  mixins: [FormUploads],
  layout: 'register-steps',
  async asyncData ({ $axios, store, error }) {
    if (
      !store.getters.currentRole || store.getters.currentRole.contextable_type !== 'structure'
    ) {
      return error({ statusCode: 403 })
    }
    const { data: organisation } = await $axios.get(`/structures/${store.getters.currentRole.contextable_id}`)
    return {
      form: organisation
    }
  },
  data () {
    return {
      loading: false,
      steps: [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/responsable/step/profile'
        },
        {
          name: 'Votre profil',
          status: 'complete',
          href: '/inscription/responsable/step/profile'
        },
        {
          name: 'Informations sur l\'organisation',
          status: 'complete',
          href: '/inscription/responsable/step/organisation'
        },
        {
          name: 'Quelques mots sur l\'organisation',
          status: 'complete',
          href: '/inscription/responsable/step/organisation-details'
        },
        {
          name: 'Votre organisation en images',
          status: 'current'
        }
      ]
    }
  },
  methods: {
    async onSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true

      await this.uploadFiles('structure', this.form.id)

      window.plausible &&
        window.plausible(
          'Inscription responsable - Étape 5 - Votre organisation en images'
        )

      if (this.form.territoire) {
        this.$router.push(
          '/inscription/responsable/step/collectivite-confirmation'
        )
      } else {
        this.$router.push(
          '/inscription/responsable/step/organisation-confirmation'
        )
      }

      this.loading = false
    }
  }

}
</script>

<style>

</style>
