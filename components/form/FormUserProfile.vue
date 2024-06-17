<template>
  <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
    <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-12 lg:gap-16">
      <div>
        <BaseHeading as="h2" :level="2"> Mes informations personnelles </BaseHeading>
        <div class="text-lg text-[#3A3A3A] mt-4">
          Ces informations sont utilisées lors de vos mises en relation avec d’autres utilisateurs.
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <BaseFormControl class="md:col-span-2" label="Photo de profil" html-for="avatar">
            <!-- :key="form.avatar?.updated_at ?? 'imageCrop'" -->
            <BaseImageCrop
              :default-value="form.avatar"
              :preview-width="100"
              :min-width="200"
              @add="addFiles({ files: [$event], collection: 'profile__avatar' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
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
          <BaseFormControl label="Email" html-for="email" required :error="errors.email">
            <BaseInput
              v-model="form.email"
              type="email"
              name="email"
              placeholder="jean.dupont@gmail.com"
              @blur="validate('email')"
            />
          </BaseFormControl>
          <BaseFormControl label="Code postal" html-for="zip" required :error="errors.zip">
            <BaseSelectAutocomplete
              v-model="form.zip"
              name="zip"
              :options="zipAutocompleteOptions"
              :min-length-to-search="3"
              attribute-key="id"
              attribute-label="label"
              attribute-right-label="typeLabel"
              placeholder="Sélectionnez votre code postal"
              search-input-placeholder="Recherche par ville ou code postal"
              :loading="loadingFetchZips"
              @selected="handleSelectedZip"
              @fetch-suggestions="onFetchZipSuggestions($event)"
              @blur="validate('zip')"
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
              type="tel"
              maxlength="14"
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
          <BaseFormControl label="Profession" html-for="type" required :error="errors.type">
            <BaseSelectAdvanced
              v-model="form.type"
              name="type"
              placeholder="Sélectionnez votre profession"
              :options="$labels.profile_type"
              @blur="validate('type')"
            />
          </BaseFormControl>
        </div>
      </div>
      <div class="pt-8 lg:pt-14">
        <BaseHeading as="h2" :level="2"> Mes motivations en quelques mots </BaseHeading>
        <div class="mt-6">
          <BaseFormControl label="" html-for="description">
            <BaseTextarea
              v-model="form.description"
              name="description"
              placeholder="Vos motivations en quelques mots..."
            />
          </BaseFormControl>
        </div>
      </div>

      <div v-if="canViewScAndCej" class="pt-8 lg:pt-14">
        <BaseHeading as="h2" :level="2"> Service Civique & Contrat d'Engagement Jeune </BaseHeading>
        <div class="mt-12 flex flex-col gap-8">
          <div class="flex flex-col space-y-8">
            <div class="flex lg:space-x-10">
              <img
                src="/images/logo-service-civique.png"
                srcset="/images/logo-service-civique.png, /images/logo-service-civique@2x.png 2x"
                alt="Service Civique"
                title="Service Civique"
                class="hidden lg:block h-auto flex-none w-[100px] object-contain object-left"
                data-not-lazy
              />
              <div class="w-full lg:w-[520px]">
                <BaseToggle
                  v-model="form.service_civique"
                  class="lg:w-full"
                  position="right"
                  label="Êtes-vous volontaire en Service Civique ?"
                  :description="
                    form.service_civique
                      ? 'Oui, je suis volontaire'
                      : 'Non, je ne suis pas volontaire'
                  "
                />
              </div>
            </div>
            <div v-if="form.service_civique" class="max-w-xl lg:pl-[144px]">
              <BaseFormControl
                label="Date de début de votre Service Civique"
                html-for="service_civique_completion_date"
                :error="errors.service_civique_completion_date"
                required
              >
                <BaseInputDate
                  v-model="form.service_civique_completion_date"
                  active-picker="MONTH"
                  required
                  name="service_civique_completion_date"
                />
              </BaseFormControl>
            </div>
          </div>
          <div class="flex flex-col space-y-8">
            <div class="flex lg:space-x-10">
              <img
                src="/images/logo-cej.png"
                srcset="/images/logo-cej.png, /images/logo-cej@2x.png 2x"
                alt="Contrat d'Engagement Jeune"
                title="Contrat d'Engagement Jeune"
                class="hidden lg:block h-auto flex-none w-[100px] object-contain object-left"
                data-not-lazy
              />
              <div class="w-full lg:w-[520px]">
                <BaseToggle
                  v-model="form.cej"
                  class="lg:w-full"
                  position="right"
                  label="Êtes-vous engagé Contrat d'Engagement Jeune ?"
                  :description="
                    form.cej
                      ? 'Oui, je suis en Contrat d\'Engagement Jeune'
                      : 'Non, je ne suis pas en Contrat d\'Engagement Jeune'
                  "
                />
              </div>
            </div>
            <div v-if="form.cej" class="max-w-xl lg:pl-[144px]">
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
                    <RiErrorWarningLine
                      class="inline h-4 w-4 text-gray-400 group-hover:text-gray-900 mb-[2px]"
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
            </div>
          </div>
        </div>
      </div>
      <div class="hidden sm:block pt-8 lg:pt-14">
        <div class="text-center">
          <DsfrButton
            size="lg"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="handleSubmit()"
          >
            Mettre à jour
          </DsfrButton>
        </div>
      </div>
      <transition name="fade">
        <div
          v-if="formIsDirty"
          :class="['sm:hidden fixed bottom-0 p-3 bg-white z-50 w-full left-0 right-0']"
          style="box-shadow: 0 25px 20px 30px rgb(0 0 0 / 25%)"
        >
          <DsfrButton
            size="lg"
            class="w-full"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="handleSubmit()"
          >
            Mettre à jour
          </DsfrButton>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { string, object, date } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import Emailable from '@/mixins/emailable.client'
import GeolocProfile from '@/mixins/geoloc-profile'

export default defineNuxtComponent({
  emits: ['change', 'submit'],
  mixins: [FormErrors, FormUploads, Emailable, GeolocProfile],
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        ..._cloneDeep(this.profile),
      },
      formSchema: object({
        first_name: string().required('Un prénom est requis'),
        last_name: string().required('Un nom est requis'),
        birthday: date()
          .typeError('La date indiquée est invalide')
          .test(
            'is-old-enough',
            'JeVeuxAider.gouv.fr est ouvert aux personnes de plus de 16 ans',
            (date) => {
              if (!date) {
                return true
              }
              const age = this.$dayjs().diff(this.$dayjs(this.form.birthday), 'year')
              return age >= 16
            }
          ),
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        type: string()
          .nullable()
          .test('test-profession-required', 'Une profession est requise', (type) => {
            return ['admin'].includes(this.$stores.auth.contextRole) || type
          }),
        mobile: string()
          .nullable()
          .min(10, 'Le mobile doit contenir au moins 10 caractères')
          .matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect')
          .test('test-mobile-required', 'Un mobile est requis', (mobile) => {
            return ['admin'].includes(this.$stores.auth.contextRole) || mobile
          })
          .transform((v) => (v === '' ? null : v)),
        phone: string()
          .nullable()
          .min(10, 'Le téléphone doit contenir au moins 10 caractères')
          .matches(/^[+|\s|\d]*$/, 'Le format du téléphone est incorrect')
          .transform((v) => (v === '' ? null : v)),
        zip: string()
          .transform((v) => (v === '' ? null : v))
          .nullable()
          .matches(/^\d{5}$/, 'Le format du code postal est incorrect')
          .test('test-zip-required', 'Un code postal est requis', (zip) => {
            return ['admin'].includes(this.$stores.auth.contextRole) || zip
          }),
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
                    return value !== this.$stores.auth.profile.email
                  }
                ),
          }),
        service_civique_completion_date: date()
          .nullable()
          .transform((v) => (v instanceof Date && !isNaN(v) ? v : null)),
      }),
      zipAutocompleteOptions: [],
      loadingFetchZips: false,
    }
  },
  computed: {
    canViewScAndCej() {
      if (this.form?.birthday) {
        const userAge = this.$dayjs().diff(this.$dayjs(this.form.birthday), 'year')
        return userAge >= 16 && userAge <= 30
      }
      return false
    },
    formIsDirty() {
      const isUploadsDirty = !!(
        this.uploads.add.length ||
        this.uploads.update.length ||
        this.uploads.delete.length
      )
      const isFormDirty = !_isEqual(this.form, this.profile)
      return isUploadsDirty || isFormDirty
    },
  },
  watch: {
    profile: {
      deep: true,
      handler(newProfile) {
        this.form = _cloneDeep(newProfile)
      },
    },
    'form.cej'(val) {
      if (!val) {
        this.form.cej_email_adviser = null
      }
    },
    formIsDirty(newVal) {
      this.$emit('change', newVal)
    },
  },
  methods: {
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.form.email !== this.profile?.email) {
            const isEmailValid = await this.emailableValidation()
            if (!isEmailValid) {
              this.errors.email = 'Votre adresse mail comporte une erreur'
              this.$toast.error('Votre adresse mail comporte une erreur')
              return
            }
          }
          await this.uploadFiles('profile', this.form.id)
          await this.$stores.auth.updateProfile({
            id: this.$stores.auth.profile.id,
            ...this.form,
          })
          this.$emit('submit')
          this.$toast.success('Modifications enregistrées')
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
