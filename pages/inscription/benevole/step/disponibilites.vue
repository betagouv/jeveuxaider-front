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
        <span class="font-bold">{{ $stores.auth.profile?.first_name }}</span
        >, faisons connaissance
      </h1>
    </div>
    <div class="max-w-2xl mx-auto">
      <div class="px-8 py-8 bg-white text-black text-3xl font-extrabold leading-9 text-center">
        Sélectionnez vos disponibilités
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200">
        <div class="mb-8 text-md text-gray-500">
          Un profil visible vous offre plus de chances de trouver une mission qui répond à votre
          envie d'engagement, en permettant à une organisation publique ou associative de vous
          contacter en fonction des domaines d'action que vous avez sélectionnés.
        </div>

        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <BaseToggle
            v-model="form.is_visible"
            :label="form.is_visible ? 'Visible des organisations' : 'Invisible des organisations'"
            description="Souhaitez-vous que les organisations de la plateforme vous proposent des missions ?"
          />
          <BaseFormControl
            label="Sélectionnez vos disponibilités"
            html-for="disponibilities"
            required
            :error="errors.disponibilities"
          >
            <DsfrTagsGroup
              v-model="form.disponibilities"
              name="disponibilities"
              variant="button"
              :options="$labels.disponibilities"
            />
          </BaseFormControl>
          <div>
            <BaseFormLabel html-for="frequence" required>
              À quelle fréquence souhaitez-vous vous engager&nbsp;?
            </BaseFormLabel>
            <div class="flex flex-col lg:flex-row gap-2 lg:gap-8 lg:items-center lg:justify-center">
              <div class="lg:w-1/2">
                <BaseSelectAdvanced
                  v-model="form.commitment__duration"
                  name="commitment__duration"
                  placeholder="Sélectionnez une durée"
                  :options="$labels.duration"
                />
                <BaseFormError v-if="errors.commitment__duration">
                  {{ errors.commitment__time_period }}
                </BaseFormError>
              </div>
              <div class="flex-none text-sm">par</div>
              <div class="lg:w-1/2">
                <BaseSelectAdvanced
                  v-model="form.commitment__time_period"
                  name="commitment__time_period"
                  placeholder="Sélectionnez une durée"
                  :options="$labels.time_period"
                />
                <BaseFormError v-if="errors.commitment__time_period">
                  {{ errors.commitment__time_period }}
                </BaseFormError>
              </div>
            </div>
          </div>

          <DsfrButton size="lg" :loading="loading" class="w-full" @click.native.prevent="onSubmit">
            Continuer
          </DsfrButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { object, array } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
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
      model: 'profile',
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
          status: 'current',
        },
        {
          name: 'Vos compétences',
          status: 'upcoming',
        },
      ],
      form: _cloneDeep(this.$stores.auth.profile),
      formSchema: object({
        disponibilities: array().min(1, 'Merci de sélectionner au moins 1 disponibilité'),
      }),
    }
  },
  created() {
    if (!this.$stores.auth.profile?.disponibilities) {
      this.form.disponibilities = ['flexible', 'jours_feries', 'weekend', 'vacances']
    }
    if (!this.$stores.auth.profile?.commitment__duration) {
      this.form.commitment__duration = '2_hours'
    }
    if (!this.$stores.auth.profile?.commitment__time_period) {
      this.form.commitment__time_period = 'year'
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
          this.$router.push('/inscription/benevole/step/competences')
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
