<template>
  <div>
    <div class="text-center mb-6">
      <DsfrHeading as="div" size="lg" class="mb-2 lg:mb-3">
        Rejoignez le mouvement&nbsp;!
      </DsfrHeading>
      <div class="text-cool-gray-500 text-lg lg:text-xl">
        Créez rapidement votre compte Bénévole
      </div>
    </div>
    <div class="mx-auto max-w-md">
      <form
        id="inscription"
        class="gap-8 mb-8 grid grid-cols-1 lg:grid-cols-2"
        @submit.prevent="onSubmit"
      >
        <BaseFormControl
          label="Email"
          html-for="email"
          required
          :error="errors.email"
          class="lg:col-span-2"
        >
          <BaseInput
            v-model="form.email"
            type="email"
            name="email"
            placeholder="jean.dupont@gmail.com"
            @blur="validate('email')"
          />
        </BaseFormControl>
        <BaseFormControl label="Prénom" html-for="first_name" required :error="errors.first_name">
          <BaseInput
            v-model="form.first_name"
            name="first_name"
            placeholder="Jean"
            @blur="validate('first_name')"
          />
        </BaseFormControl>
        <BaseFormControl label="Nom" html-for="last_name" required :error="errors.last_name">
          <BaseInput
            v-model="form.last_name"
            name="last_name"
            placeholder="Dupont"
            @blur="validate('last_name')"
          />
        </BaseFormControl>

        <BaseFormControl label="Code postal" html-for="zip" required :error="errors.zip">
          <BaseInput
            v-model="form.zip"
            name="zip"
            type="tel"
            maxlength="5"
            placeholder="56000"
            @blur="validate('zip')"
          />
        </BaseFormControl>
        <BaseFormControl
          label="Pays de résidence"
          html-for="country"
          required
          :error="errors.country"
        >
          <BaseSelectAdvanced
            v-model="form.country"
            name="country"
            placeholder="Sélectionner un pays"
            :options="[{ code: 'FR', name: 'France' }, ...countries]"
            attribute-key="code"
            attribute-label="name"
            autocomplete="ctry"
            @blur="validate('country')"
          />
        </BaseFormControl>
        <BaseFormControl label="Téléphone mobile" html-for="mobile" required :error="errors.mobile">
          <BaseInput
            v-model="form.mobile"
            name="mobile"
            placeholder="0612345678"
            @blur="validate('mobile')"
          />
        </BaseFormControl>
        <BaseFormControl
          label="Date de naissance"
          html-for="birthday"
          required
          :error="errors.birthday"
        >
          <BaseInputDate v-model="form.birthday" required name="birthday" />
        </BaseFormControl>
        <BaseFormControl label="Mot de passe" html-for="password" required :error="errors.password">
          <BaseInput
            v-model="form.password"
            name="password"
            placeholder="Votre mot de passe"
            type="password"
            @blur="validate('password')"
          />
        </BaseFormControl>
        <BaseFormControl
          label="Confirmation"
          html-for="password_confirmation"
          required
          :error="errors.password_confirmation"
        >
          <BaseInput
            v-model="form.password_confirmation"
            name="password_confirmation"
            placeholder="Votre mot de passe"
            type="password"
            @blur="validate('password_confirmation')"
          />
        </BaseFormControl>

        <transition name="fade">
          <div v-if="canViewScAndCej" class="lg:col-span-2 space-y-6">
            <div class="flex lg:space-x-4">
              <img
                src="/images/cej.png"
                srcset="/images/cej.png, /images/cej@2x.png 2x"
                alt="Contrat d'Engagement Jeune"
                title="Contrat d'Engagement Jeune"
                class="hidden lg:block flex-none w-[45px] object-contain object-left"
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
                  <RiInformationFill
                    class="inline h-4 w-4 text-gray-400 group-hover:text-gray-900 mb-[2px] fill-current"
                  />
                </span>
              </template>
              <BaseInput
                v-model="form.cej_email_adviser"
                name="cej_email_adviser"
                placeholder="jean.dupont@gmail.com"
                @blur="validate('cej_email_adviser')"
              />
            </BaseFormControl>
          </div>
        </transition>
      </form>

      <DsfrButton :loading="loading" size="lg" class="w-full" @click.native.prevent="onSubmit">
        S'inscrire
      </DsfrButton>

      <div class="mt-6 mb-3">
        <p class="text-xs text-cool-gray-500 text-center">
          <span>En m'inscrivant j'accepte la </span>
          <DsfrLink
            to="/politique-de-confidentialite"
            :is-external="true"
            :icon-size="12"
            icon-class="mb-[.5px]"
          >
            politique de confidentialité
          </DsfrLink>
          <br class="hidden sm:block" />
          <span>et la </span>
          <DsfrLink
            to="/charte-reserve-civique"
            :is-external="true"
            :icon-size="12"
            icon-class="mb-[.5px]"
          >
            charte
          </DsfrLink>
          <span> de JeVeuxAider.gouv.fr</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, ref, date } from 'yup'
import FormErrors from '@/mixins/form/errors'

import countries from '@/assets/countries.json'

export default defineNuxtComponent({
  name: 'SoftGateRegister',
  mixins: [FormErrors],
  props: {
    datas: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        ...this.datas,
        country: 'FR',
      },
      formSchema: object({
        first_name: string().required('Un prénom est requis'),
        last_name: string().required('Un nom est requis'),
        mobile: string()
          .min(10)
          .matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect')
          .required('Un téléphone mobile est requis'),
        zip: string().min(5).required('Un code postal est requis'),
        country: string().required('Un pays est requis'),
        birthday: date()
          .required("Une date d'anniversaire est requise")
          .nullable()
          .transform((v) => (v instanceof Date && !isNaN(v) ? v : null)),
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        password: string().min(8).required('Un mot de passe est requis'),
        password_confirmation: string()
          .required('Une confirmation de mot de passe est requise')
          .oneOf([ref('password'), null], "Le mot de passe n'est pas identique"),
        cej_email_adviser: string()
          .nullable()
          .email("Le format de l'email est incorrect")
          .when('cej', {
            is: true,
            then: (schema) => schema.required("L'email de votre conseiller CEJ est obligatoire"),
          }),
      }),
      countries,
    }
  },
  computed: {
    canViewScAndCej() {
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
          await this.$stores.auth.registerVolontaire({
            ...this.form,
            utm_source: useCookie('utm_source')?.value,
            utm_campaign: useCookie('utm_campaign')?.value,
            utm_medium: useCookie('utm_medium')?.value,
          })
          await this.$gtm.trackEvent({
            event: 'benevole-inscription-soft-gate',
          })
          this.$plausible.trackEvent('Soft Gate - Étape 2 - Inscription')

          this.$emit('next')
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
