<template>
  <div>
    <div class="text-center mb-8">
      <DsfrHeading as="div" size="xl" class="mb-2 lg:mb-4">
        Rejoignez le mouvement&nbsp;!
      </DsfrHeading>
      <div class="text-cool-gray-500 text-lg lg:text-lg">
        Créez rapidement votre compte Bénévole
      </div>
    </div>
    <div class="mx-auto">
      <form
        id="inscription"
        class="gap-6 mb-8 grid grid-cols-1 lg:grid-cols-2"
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
          <BaseSelectAutocomplete
            v-model="form.zip"
            name="zip"
            :options="zipAutocompleteOptions"
            attribute-key="id"
            attribute-label="label"
            attribute-right-label="typeLabel"
            placeholder="56000"
            search-input-placeholder="Recherche par ville ou code postal"
            options-class="md:min-w-[320px]"
            :min-length-to-search="3"
            :loading="loadingFetchZips"
            @selected="handleSelectedZip"
            @fetch-suggestions="onFetchZipSuggestions($event)"
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
          <BaseInputDateNative
            v-model="form.birthday"
            required
            name="birthday"
            @blur="validate('birthday')"
          />
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
          <div class="lg:col-span-2 space-y-6">
            <FormSubFormUserDispositifs :form="form" @update="form = { ...form, ...$event }" />
          </div>
        </transition>
      </form>

      <DsfrButton :loading="loading" size="lg" class="w-full" @click.native.prevent="onSubmit">
        S'inscrire
      </DsfrButton>

      <div class="mt-6">
        <p class="text-xs text-cool-gray-500 text-center">
          <span>En m’inscrivant j'accepte les </span>
          <DsfrLink
            to="/conditions-generales-d-utilisation"
            :is-external="true"
            :icon-size="12"
            icon-class="mb-[.5px]"
          >
            <span>conditions générales d’utilisation</span>
          </DsfrLink>
          <br class="hidden sm:block" />
          <span> et la </span>
          <DsfrLink
            to="/charte-reserve-civique"
            :is-external="true"
            :icon-size="12"
            icon-class="mb-[.5px]"
          >
            <span>charte</span>
          </DsfrLink>
          <span> de la Réserve Civique.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, ref, date } from 'yup'
import FormErrors from '@/mixins/form/errors'
import countries from '@/assets/countries.json'
import { useToast } from 'vue-toastification'
import GeolocProfile from '@/mixins/geoloc-profile'

const errorIsOldEnoughErrorMessage =
  'JeVeuxAider.gouv.fr est ouvert aux personnes de plus de 16 ans'

export default defineNuxtComponent({
  name: 'SoftGateRegister',
  mixins: [FormErrors, GeolocProfile],
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
        birthday: '',
      },
      // @todo: in useProfileValidation
      formSchema: object({
        first_name: string().required('Un prénom est requis'),
        last_name: string().required('Un nom est requis'),
        mobile: string()
          .min(10)
          .matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect')
          .required('Un téléphone mobile est requis'),
        zip: string()
          .matches(/^\d{5}$/, 'Le format du code postal est incorrect')
          .required('Un code postal est requis'),
        country: string().required('Un pays est requis'),
        birthday: date()
          .typeError('La date indiquée est invalide')
          .test('is-old-enough', errorIsOldEnoughErrorMessage, (date) => {
            if (!date) {
              return true
            }
            const age = this.$dayjs().diff(this.$dayjs(this.form.birthday), 'year')
            return age >= 16
          }),

        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        password: string().min(8).required('Un mot de passe est requis'),
        password_confirmation: string()
          .required('Une confirmation de mot de passe est requise')
          .oneOf([ref('password'), null], "Le mot de passe n'est pas identique"),
      }),
      countries,
      zipAutocompleteOptions: [],
      loadingFetchZips: false,
    }
  },
  computed: {
    canViewCej() {
      if (this.form.cej || this.form.service_civique) {
        return true
      }
      if (this.form.birthday) {
        const userAge = this.$dayjs().diff(this.$dayjs(this.form.birthday), 'year')
        return userAge >= 16 && userAge <= 30
      }
      return false
    },
    canViewFT() {
      let isOldEnough = false
      let isInDepartments = false
      if (this.form?.birthday) {
        const userAge = this.$dayjs().diff(this.$dayjs(this.form.birthday), 'year')
        if (userAge >= 18) {
          isOldEnough = true
        }
      }
      if (this.form.department) {
        if (['03', '23', '27', '80'].includes(this.form.department)) {
          isInDepartments = true
        }
      }
      if (isOldEnough && isInDepartments) {
        return true
      }

      return false
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

          await this.$gtm?.trackEvent({
            event: 'benevole-inscription-soft-gate',
          })
          this.$plausible.trackEvent('Soft Gate - Étape 2 - Inscription')

          this.$emit('next')
        })
        .catch((errors) => {
          if (errors.errors?.length === 1 && errors.errors[0] === errorIsOldEnoughErrorMessage) {
            // Custom toast
            this.setErrors(errors, false)
            const toast = useToast()
            toast.error(errorIsOldEnoughErrorMessage)
            return
          }

          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
