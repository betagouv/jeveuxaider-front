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
              @updated="validate('disponibilities')"
            />
          </BaseFormControl>
          <div>
            <BaseFormLabel html-for="commitment" required>
              À quelle fréquence souhaitez-vous vous engager&nbsp;?
            </BaseFormLabel>
            <DsfrFormControl :error="errors.commitment" class="mt-4">
              <DsfrTagsGroup
                v-model="form.commitment"
                name="commitment"
                context="radio"
                :options="$labels.commitment"
                @updated="validate('commitment')"
              />
            </DsfrFormControl>
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
import { object, array, string } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  setup() {
    definePageMeta({
      layout: 'register-steps',
      middleware: ['authenticated'],
    })

    const { schemaDisponibilities, schemaCommitment } = useProfileValidation()

    return {
      schemaDisponibilities,
      schemaCommitment,
    }
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
        disponibilities: this.schemaDisponibilities,
        commitment: this.schemaCommitment,
      }),
    }
  },
  created() {
    if (!this.$stores.auth.profile?.disponibilities) {
      this.form.disponibilities = ['flexible', 'jours_feries', 'weekend', 'vacances']
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
