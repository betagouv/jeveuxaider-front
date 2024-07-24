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
        <span class="font-bold">{{ $stores.auth.profile?.first_name }}</span> !
      </h1>
      <div class="text-lg font-medium">Nous sommes ravis de vous compter parmi nos bénévoles.</div>
    </div>
    <div class="max-w-2xl mx-auto">
      <div class="px-8 py-8 bg-white text-black text-3xl font-extrabold leading-9 text-center">
        Complétez votre profil
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <BaseFormControl label="Photo de profil" html-for="avatar">
            <BaseImageCrop
              :default-value="form.avatar"
              :preview-width="100"
              :min-width="200"
              @add="addFiles({ files: [$event], collection: 'profile__avatar' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </BaseFormControl>
          <BaseFormControl label="Profession" html-for="type" required :error="errors.type">
            <BaseSelectAdvanced
              v-model="form.type"
              name="type"
              placeholder="Sélectionnez votre profession"
              :options="$labels.profile_type"
              @blur="validate('type')"
            />
          </BaseFormControl>
          <BaseFormControl
            label="Téléphone mobile"
            html-for="mobile"
            required
            :error="errors.mobile"
          >
            <BaseInput
              v-model="form.mobile"
              name="mobile"
              placeholder="0612345678"
              @blur="validate('mobile')"
            />
          </BaseFormControl>
          <BaseFormControl label="Téléphone fixe" html-for="phone" :error="errors.phone">
            <BaseInput
              v-model="form.phone"
              name="phone"
              type="tel"
              maxlength="14"
              placeholder="0123456789"
              @blur="validate('phone')"
            />
          </BaseFormControl>

          <template v-if="canViewScAndCej">
            <div class="flex lg:space-x-8">
              <img
                src="/images/service_civique.png"
                srcset="/images/service_civique.png, /images/service_civique@2x.png 2x"
                alt="Service Civique"
                title="Service Civique"
                class="hidden lg:block h-10 flex-none w-[75px] object-contain object-left"
                data-not-lazy
              />
              <BaseToggle
                v-model="form.service_civique"
                class="flex-1"
                label="Êtes-vous volontaire en Service Civique ?"
                :description="
                  form.service_civique
                    ? 'Oui, je suis volontaire'
                    : 'Non, je ne suis pas volontaire'
                "
              />
            </div>
            <BaseFormControl
              v-if="form.service_civique"
              label="Date de début de votre Service Civique"
              html-for="service_civique_completion_date"
              :error="errors.service_civique_completion_date"
            >
              <BaseInputDateNative
                v-model="form.service_civique_completion_date"
                required
                name="service_civique_completion_date"
                @blur="validate('service_civique_completion_date')"
              />
            </BaseFormControl>
            <div class="flex lg:space-x-8">
              <img
                src="/images/cej.png"
                srcset="/images/cej.png, /images/cej@2x.png 2x"
                alt="Contrat d'Engagement Jeune"
                title="Contrat d'Engagement Jeune"
                class="hidden lg:block h-10 flex-none w-[75px] object-contain object-left"
                data-not-lazy
              />
              <BaseToggle
                v-model="form.cej"
                class="flex-1"
                label="Êtes-vous engagé Contrat d'Engagement Jeune ?"
                :description="
                  form.cej
                    ? 'Oui, je suis en Contrat d\'Engagement Jeune'
                    : 'Non, je ne suis pas en Contrat d\'Engagement Jeune'
                "
              />
            </div>
            <BaseFormControl
              v-if="form.cej"
              label="Email de votre conseiller CEJ"
              html-for="cej_email_adviser"
              :error="errors.cej_email_adviser"
              required
            >
              <template #afterLabel>
                <span
                  v-tooltip="{
                    content:
                      'En renseignant l’adresse de votre conseiller, celui-ci sera automatiquement tenu au courant des missions sur lesquelles vous proposez votre aide.',
                  }"
                  class="p-1 cursor-help group"
                >
                  <RiInformationLine
                    class="inline h-4 w-4 text-gray-400 group-hover:text-gray-900 mb-[2px] fill-current"
                  />
                </span>
              </template>
              <BaseInput
                v-model="form.cej_email_adviser"
                name="cej_email_adviser"
                placeholder="Saisissez l'email de votre conseiller CEJ"
                @blur="validate('cej_email_adviser')"
              />
            </BaseFormControl>
          </template>

          <DsfrButton size="lg" :loading="loading" @click.native.prevent="onSubmit">
            Continuer
          </DsfrButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, date } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'

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
          status: 'current',
        },
        {
          name: 'Vos préférences',
          status: 'upcoming',
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
      formSchema: object({
        type: string().nullable().required('Une profession est requise'),
        mobile: string()
          .nullable()
          .required('Un mobile est requis')
          .min(10, 'Le mobile doit contenir au moins 10 caractères')
          .matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect'),
        phone: string()
          .nullable()
          .min(10, 'Le téléphone doit contenir au moins 10 caractères')
          .matches(/^[+|\s|\d]*$/, 'Le format du téléphone est incorrect')
          .transform((v) => (v === '' ? null : v)),
        cej_email_adviser: string()
          .nullable()
          .email("Le format de l'email est incorrect")
          .when('cej', {
            is: true,
            then: (schema) =>
              schema
                .required("L'email de votre conseiller CEJ est obligatoire")
                .test(
                  'email-extension',
                  'Le mail doit être celui de votre conseiller. Il ne doit pas être une adresse personnelle.',
                  (value) => {
                    if (!value) {
                      return true
                    }
                    const forbiddenExtensions = [
                      'gmail.com',
                      'icloud.com',
                      'outlook.com',
                      'orange.fr',
                      'wanadoo.fr',
                      'hotmail.com',
                      'hotmail.fr',
                      'free.fr',
                      'sfr.fr',
                      'laposte.net',
                    ]
                    const emailParts = value.split('@')
                    const emailExtension = emailParts[1]
                    return !forbiddenExtensions.includes(emailExtension)
                  }
                )
                .test(
                  'no-current-user-email',
                  "Vous devez saisir l'email de votre conseiller CEJ et non le vôtre",
                  (value) => {
                    if (!value || !this.$stores.auth.isLogged) {
                      return true
                    }
                    return value !== this.$stores.auth.profile?.email
                  }
                ),
          }),
        service_civique_completion_date: date()
          .nullable()
          .transform((v) => (v instanceof Date && !isNaN(v) ? v : null)),
      }),
    }
  },
  computed: {
    canViewScAndCej() {
      if (this.form.cej || this.form.service_civique) {
        return true
      }
      if (this.form.birthday) {
        const userAge = this.$dayjs().diff(this.$dayjs(this.form.birthday), 'year')
        return userAge >= 16 && userAge <= 30
      }
      return false
    },
  },
  watch: {
    'form.cej'(val) {
      if (!val) {
        this.form.cej_email_adviser = null
      }
    },
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
          await this.uploadFiles('profile', this.form.id)
          await this.$stores.auth.updateProfile({
            id: this.$stores.auth.profile?.id,
            ...this.form,
          })
          this.$plausible.trackEvent('Inscription bénévole - Étape 2 - Profil')
          this.$router.push('/inscription/benevole/step/preferences')
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
