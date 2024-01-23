<template>
  <div class="relative">
    <ClientOnly>
      <Teleport to="#teleport-sidebar">
        <div class="text-center lg:text-left text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
          Ça ne devrait pas prendre plus de 3 minutes 😉
        </div>
        <BaseSteps :steps="steps" />
      </Teleport>
    </ClientOnly>

    <div class="mb-6 lg:mb-12 text-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium leading-12 mb-4">
        Dites-nous en plus<br />
        sur vous
        <span class="font-bold">{{ $stores.auth.profile.first_name }}</span>
      </h1>
    </div>
    <div class="max-w-2xl mx-auto">
      <div class="px-8 py-8 bg-white text-black text-3xl font-extrabold leading-9 text-center">
        Renseignez vos compétences
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200">
        <div class="mb-8 text-md text-gray-500">
          Enrichissez votre profil avec les compétences que vous souhaitez mettre au service des
          organisations publiques ou associatives.
        </div>

        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <BaseFormControl label="Renseignez vos compétences" html-for="algolia-search">
            <AlgoliaInputAutocomplete
              index="termsIndex"
              attribute-right-label="group"
              :search-parameters="{
                facetFilters: [['vocabulary_name:Skills']],
                hitsPerPage: 6,
              }"
              @selected="handleSelectItems"
            />
          </BaseFormControl>
        </form>

        <div v-if="form.skills.length" class="mt-6">
          <div class="flex flex-wrap gap-2">
            <BaseTagFormItem
              v-for="item in form.skills"
              :key="item.id"
              :tag="item"
              @removed="onRemovedTagItem"
            >
              {{ item.name }}
            </BaseTagFormItem>
          </div>
        </div>

        <DsfrButton
          size="lg"
          form="inscription"
          :loading="loading"
          class="w-full mt-8"
          @click.native.prevent="onSubmit"
        >
          Terminer
        </DsfrButton>
      </div>
    </div>
  </div>
</template>

<script>
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  components: {},
  mixins: [FormErrors],
  setup() {
    definePageMeta({
      layout: 'register-steps',
      middleware: ['authenticated'],
    })
  },
  data() {
    return {
      loading: false,
      steps: [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/benevole/step/profile',
        },
        {
          name: 'Votre profil',
          status: 'complete',
          href: '/inscription/benevole/step/profile',
        },
        {
          name: 'Vos préférences',
          status: 'complete',
          href: '/inscription/benevole/step/preferences',
        },
        {
          name: 'Vos disponibilités',
          status: 'complete',
          href: '/inscription/benevole/step/disponibilites',
        },
        {
          name: 'Vos compétences',
          status: 'current',
        },
      ],
      form: _cloneDeep(this.$stores.auth.user.profile),
    }
  },
  methods: {
    handleSelectItems(item) {
      this.form.skills = [...this.form.skills, item]
    },
    onRemovedTagItem(item) {
      this.form.skills = this.form.skills.filter((skill) => skill.id !== item.id)
    },
    async onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.$stores.auth.updateProfile({
        id: this.$stores.auth.profile.id,
        ...this.form,
      })
      this.loading = false
      this.$plausible.trackEvent('Inscription bénévole - Étape 4 - Compétences')
      this.$router.push('/profile')
    },
  },
})
</script>
