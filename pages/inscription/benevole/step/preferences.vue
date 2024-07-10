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
        Bienvenue
        <span class="font-bold">{{ $stores.auth.profile.first_name }}</span> !
      </h1>
      <div class="text-lg font-medium">Nous sommes ravis de vous compter parmi nos bénévoles.</div>
    </div>
    <div class="max-w-2xl mx-auto">
      <div class="px-8 py-8 bg-white text-black text-3xl font-extrabold leading-9 text-center">
        Sélectionnez vos préférences
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <BaseFormControl
            label="Quelles activités de bénévolat pourraient vous intéresser ?"
            html-for="activites"
          >
            <DsfrTagsGroup
              v-model="form.activities"
              name="activites"
              variant="button"
              :options="activitiesOptions"
              is-model
              class="mt-4"
            />
          </BaseFormControl>
          <BaseFormControl label="Décrivez vos motivations" html-for="description">
            <BaseTextarea
              v-model="form.description"
              name="description"
              placeholder="Vos motivations en quelques mots..."
            />
          </BaseFormControl>
          <DsfrButton
            size="lg"
            :loading="loading"
            :is-submit="true"
            class="w-full"
            @click.native.prevent="onSubmit"
          >
            Continuer
          </DsfrButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import activitiesOptions from '@/assets/activities.json'

export default defineNuxtComponent({
  mixins: [FormErrors, FormUploads],
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
          status: 'current',
        },
        {
          name: 'Vos disponibilités',
          status: 'upcoming',
        },
        {
          name: 'Vos compétences',
          status: 'upcoming',
        },
      ],
      form: _cloneDeep(this.$stores.auth.user.profile),
      formSchema: object({}),
      activitiesOptions: activitiesOptions.sort((a, b) => a.name.localeCompare(b.name)),
      domainsOptions: [
        'Art et culture pour tous',
        'Bénévolat de compétences',
        'Éducation pour tous',
        'Mémoire et citoyenneté',
        'Prévention et protection',
        'Protection de la nature',
        'Solidarité et insertion',
        'Sport pour tous',
      ],
    }
  },
  methods: {
    onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.$stores.auth.updateProfile({
            id: this.$stores.auth.profile?.id,
            ...this.form,
          })
          this.$plausible.trackEvent('Inscription bénévole - Étape 3 - Préférences')
          this.$router.push('/inscription/benevole/step/disponibilites')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
