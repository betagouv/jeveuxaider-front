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
            class="sm:pl-4"
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
              :model-value="form.zip ? `${form.zip} - ${form.city}` : null"
              name="zip"
              :options="zipAutocompleteOptions"
              :min-length-to-search="3"
              option-key-attribute="id"
              option-label-attribute="label"
              option-label-secondary-attribute="typeLabel"
              placeholder="Rechercher une ville ou code postal"
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
              name="type"
              placeholder="Sélectionnez votre profession"
              :options="$labels.profile_type"
              @update:modelValue="validate('type')"
              @blur="validate('type')"
            />
          </DsfrFormControl>
        </div>
      </div>
      <hr />
      <div class="">
        <DsfrHeading size="lg"> Compétences </DsfrHeading>
        <p class="text-[#666666] mt-2">
          Si vous voulez mettre en avant certaines compétences auprès des organisations, ajoutez-les
          ici.
        </p>
        <div class="mt-8">
          <FormUserSkills v-model="form.skills" />
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
          Pourquoi souhaitez-vous faire du bénévolat, votre mission idéale, etc., tout ce qui peut
          aider les organisations à mieux vous connaître.
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

      <FormSubFormUserDispositifs
        :form="form"
        @update="form = { ...form, ...$event }"
        show-header
      />

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
  setup() {
    const { schemaType, schemaCertifications, schemaDescription, schemaSkills } =
      useProfileValidation()

    return {
      schemaType,
      schemaCertifications,
      schemaDescription,
      schemaSkills,
    }
  },
  data() {
    return {
      loading: false,
      form: {
        ..._cloneDeep(this.profile),
      },
      // @todo: in useProfileValidation
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
        type: this.schemaType,
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
        certifications: this.schemaCertifications,
        description: this.schemaDescription,
        skills: this.schemaSkills,
      }),
      zipAutocompleteOptions: [],
      loadingFetchZips: false,
    }
  },
  computed: {
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
  },
})
</script>
