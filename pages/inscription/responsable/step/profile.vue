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
      <div class="text-lg font-medium">
        Nous sommes ravis de vous compter parmi nos utilisateurs.
      </div>
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
              type="tel"
              maxlength="14"
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
          <BaseFormControl label="Code postal" html-for="zip" required :error="errors.zip">
            <BaseInput v-model="form.zip" name="zip" placeholder="56000" @blur="validate('zip')" />
          </BaseFormControl>
          <DsfrButton
            size="lg"
            :loading="loading"
            :disabled="loading"
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
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'

export default defineNuxtComponent({
  mixins: [FormErrors, FormUploads],
  setup() {
    definePageMeta({
      layout: 'register-steps',
      middleware: ['authenticated', 'agreed-responsable-terms'],
    })
  },
  data() {
    return {
      loading: false,
      form: _cloneDeep(this.$stores.auth.user.profile),
      formSchema: object({
        type: string().nullable().required('Une profession est requise'),
        mobile: string()
          .min(10, 'Le mobile doit contenir au moins 10 caractères')
          .matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect')
          .required('Un mobile est requis'),
        phone: string()
          .nullable()
          .min(10, 'Le téléphone doit contenir au moins 10 caractères')
          .matches(/^[+|\s|\d]*$/, 'Le format du téléphone est incorrect')
          .transform((v) => (v === '' ? null : v)),
        zip: string()
          .min(5, 'Le format du code postal est incorrect')
          .required('Un code postal est requis'),
      }),
    }
  },
  computed: {
    steps() {
      return [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/responsable/step/profile',
        },
        {
          name: 'Votre profil',
          status: 'current',
        },
        {
          name: "Informations sur l'organisation",
          status: 'upcoming',
        },
        {
          name: "Quelques mots sur l'organisation",
          status: 'upcoming',
        },
        {
          name: 'Votre organisation en images',
          status: 'upcoming',
        },
      ]
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
            id: this.$stores.auth.profile.id,
            ...this.form,
          })
          this.$plausible.trackEvent('Inscription responsable - Étape 2 - Profil')
          this.$router.push('/inscription/responsable/step/organisation')
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
