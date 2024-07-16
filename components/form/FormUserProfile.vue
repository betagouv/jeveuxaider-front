<template>
  <div class="bg-white px-6 py-8 lg:p-10">
    <div class="grid grid-cols-1 gap-8 lg:gap-12">
      <div>
        <DsfrFormControl
          class="flex items-center justify-start gap-6 sm:gap-12 flex-col sm:flex-row"
          html-for="avatar"
        >
          <BaseImageCrop
            :default-value="form.avatar"
            :preview-width="100"
            :min-width="200"
            @add="addFiles({ files: [$event], collection: 'profile__avatar' })"
            @delete="deleteFile($event)"
            @crop="onManipulationsChange($event)"
            modalFooterClass="!px-4 sm:!px-8 !gap-1 sm:!gap-4 !flex-nowrap"
          >
            <template #trigger="{ onClick }">
              <CustomUploadTriggerProfilePicture @click="onClick" label="Ajouter une photo" />
            </template>

            <template #preview="{ setShowModal, previewSrcset }">
              <CustomUploadTriggerProfilePicture
                @click="setShowModal(true)"
                label="Modifier"
                :previewSrcset="previewSrcset"
              />
            </template>

            <template #modalFooter="{ doCrop, setShowModal, onDelete }">
              <DsfrButton
                type="tertiary-no-outline"
                size="sm"
                icon="RiCloseLine"
                class="text-red-700"
                @click="
                  () => {
                    onDelete()
                    setShowModal(false)
                  }
                "
              >
                Supprimer
              </DsfrButton>
              <DsfrButton
                type="secondary"
                class="text-sm sm:text-base"
                @click="setShowModal(false)"
              >
                Annuler
              </DsfrButton>
              <DsfrButton @click="doCrop" class="text-sm sm:text-base"> Valider </DsfrButton>
            </template>
          </BaseImageCrop>
          <DsfrHeading as="p" size="lg"> {{ profile.full_name }} </DsfrHeading>
        </DsfrFormControl>
      </div>
      <hr />
      <div>
        <DsfrHeading size="lg"> Informations personnelles </DsfrHeading>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <DsfrFormControl label="Prénom" html-for="first_name" required :error="errors.first_name">
            <DsfrInput
              v-model="form.first_name"
              name="first_name"
              placeholder="Jean"
              @blur="validate('first_name')"
            />
          </DsfrFormControl>
          <DsfrFormControl label="Nom" html-for="last_name" required :error="errors.last_name">
            <DsfrInput
              v-model="form.last_name"
              name="last_name"
              placeholder="Dupont"
              @blur="validate('last_name')"
            />
          </DsfrFormControl>
          <DsfrFormControl label="Code postal" html-for="zip" required :error="errors.zip">
            <DsfrInputAutocomplete
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
          </DsfrFormControl>
          <DsfrFormControl
            label="Téléphone mobile"
            html-for="mobile"
            required
            :error="errors.mobile"
          >
            <DsfrInput
              v-model="form.mobile"
              name="mobile"
              type="tel"
              maxlength="14"
              placeholder="0612345678"
              @blur="validate('mobile')"
            />
          </DsfrFormControl>
          <DsfrFormControl label="Téléphone fixe" html-for="phone" :error="errors.phone">
            <DsfrInput
              v-model="form.phone"
              name="phone"
              type="tel"
              maxlength="14"
              placeholder="0123456789"
              @blur="validate('phone')"
            />
          </DsfrFormControl>
          <DsfrFormControl
            label="Date de naissance"
            html-for="birthday"
            required
            :error="errors.birthday"
          >
            <DsfrInput
              v-model="form.birthday"
              required
              type="date"
              name="birthday"
              @blur="validate('birthday')"
            />
          </DsfrFormControl>
          <DsfrFormControl label="Profession" html-for="type" required :error="errors.type">
            <DsfrSelect
              v-model="form.type"
              id="type"
              name="type"
              placeholder="Sélectionnez votre profession"
              :options="$labels.profile_type"
              @blur="validate('type')"
            />
          </DsfrFormControl>
        </div>
      </div>
      <hr />
      <div class="">
        <DsfrHeading size="lg"> Compétences </DsfrHeading>
        <div class="text-[#666666] mt-2">
          Si vous voulez mettre en avant certaines compétences auprès des organisations, définissez
          les ici.
        </div>
        <div class="mt-8">
          <DsfrFormControl html-for="algolia-search">
            <AlgoliaInputAutocomplete
              index="termsIndex"
              variant="dsfr"
              attribute-right-label="group"
              :search-parameters="{
                facetFilters: [['vocabulary_name:Skills']],
                hitsPerPage: 6,
              }"
              @selected="handleSelectSkillItems"
            />
          </DsfrFormControl>

          <div v-if="form.skills.length" class="mt-6">
            <div class="flex flex-wrap gap-4">
              <DsfrTag
                v-for="item in form.skills"
                :key="item.id"
                :tag="item"
                size="md"
                context="deletable"
                @delete="onRemovedSkillItem(item)"
              >
                {{ item.name }}
              </DsfrTag>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="">
        <DsfrHeading size="lg"> Certifications </DsfrHeading>
        <div class="text-[#666666] mt-2">
          Si vous avez des certifications particulières, indiquez les ici.
        </div>
        <div class="mt-8">
          <DsfrFormControl html-for="certifications">
            <DsfrTagsGroup
              v-model="form.certifications"
              name="certifications"
              variant="button"
              :options="$labels.profile_certifications"
            />
          </DsfrFormControl>
        </div>
      </div>
      <hr />
      <div class="">
        <DsfrHeading size="lg"> Quelques mots sur vous </DsfrHeading>
        <div class="text-[#666666] mt-2">
          Une description de vous-même pour vous présenter aux organisations.
        </div>
        <div class="mt-6">
          <DsfrFormControl label="" html-for="description">
            <DsfrTextarea
              v-model="form.description"
              name="description"
              placeholder="Vos motivations en quelques mots..."
            />
          </DsfrFormControl>
        </div>
      </div>
      <template v-if="canViewScAndCej">
        <hr />
        <div class="">
          <DsfrHeading size="lg"> Service Civique & Contrat d'Engagement Jeune </DsfrHeading>
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
                <DsfrFormControl
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
                </DsfrFormControl>
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
                <DsfrFormControl
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
                </DsfrFormControl>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- <div class="hidden sm:block ">
        <div class="text-center">
          <DsfrButton
            size="lg"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="handleSubmit()"
          >
            Enregistrer
          </DsfrButton>
        </div>
      </div> -->
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
            Enregistrer
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
        // email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
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
                    return value !== this.$stores.auth.profile?.email
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
            id: this.$stores.auth.profile?.id,
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
    handleSelectSkillItems(item) {
      this.form.skills = [...this.form.skills, item]
    },
    onRemovedSkillItem(item) {
      this.form.skills = this.form.skills.filter((skill) => skill.id !== item.id)
    },
  },
})
</script>
