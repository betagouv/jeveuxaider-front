<template>
  <div class="relative">
    <client-only>
      <portal
        to="sidebar"
      >
        <div class="text-center lg:text-left text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
          Ça ne devrait pas prendre plus de 3 minutes 😉
        </div>
        <Steps
          :steps="steps"
        />
      </portal>
    </client-only>

    <div class="mb-6 lg:mb-12 text-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium leading-12 mb-4">
        Bienvenue
        <span class="font-bold">{{ $store.getters.profile.first_name }}</span> !
      </h1>
      <div class="text-lg font-medium">
        Nous sommes ravis de vous compter parmi nos bénévoles.
      </div>
    </div>
    <div class="max-w-xl mx-auto">
      <div
        class="px-8 py-8 bg-white text-black text-3xl font-extrabold leading-9 text-center rounded-t-lg"
      >
        Complétez votre profil
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <FormControl label="Photo de profil" html-for="avatar">
            <ImageCrop
              :default-value="form.avatar"
              :preview-width="100"
              :min-width="200"
              @add="addFiles({ files: [$event], collection: 'profile__avatar' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </FormControl>
          <FormControl label="Profession" html-for="type" required :error="errors.type">
            <SelectAdvanced
              v-model="form.type"
              name="type"
              placeholder="Sélectionnez votre profession"
              :options="$labels.profile_type"
              @blur="validate('type')"
            />
          </FormControl>
          <FormControl label="Téléphone mobile" html-for="mobile" required :error="errors.mobile">
            <Input
              v-model="form.mobile"
              name="mobile"
              placeholder="0612345678"
              @blur="validate('mobile')"
            />
          </FormControl>
          <FormControl label="Téléphone fixe" html-for="phone" :error="errors.phone">
            <Input
              v-model="form.phone"
              name="phone"
              type="tel"
              maxlength="14"
              placeholder="0123456789"
              @blur="validate('phone')"
            />
          </FormControl>

          <template v-if="canViewScAndCej">
            <div class="flex lg:space-x-8">
              <img
                src="/images/service_civique.png"
                srcset="/images/service_civique.png, /images/service_civique@2x.png 2x"
                alt="Service Civique"
                title="Service Civique"
                class="hidden lg:block h-10 flex-none w-[75px] object-contain object-left"
                data-not-lazy
              >
              <Toggle
                v-model="form.service_civique"
                class="flex-1"
                label="Êtes-vous volontaire en Service Civique ?"
                :description="form.service_civique ? 'Oui, je suis volontaire' : 'Non, je ne suis pas volontaire'"
              />
            </div>
            <FormControl
              v-if="form.service_civique"
              label="Date de début de votre Service Civique"
              html-for="service_civique_completion_date"
              :error="errors.service_civique_completion_date"
            >
              <InputDate v-model="form.service_civique_completion_date" required name="service_civique_completion_date" />
            </FormControl>
            <div class="flex lg:space-x-8">
              <img
                src="/images/cej.png"
                srcset="/images/cej.png, /images/cej@2x.png 2x"
                alt="Contrat d'Engagement Jeune"
                title="Contrat d'Engagement Jeune"
                class="hidden lg:block h-10 flex-none w-[75px] object-contain object-left"
                data-not-lazy
              >
              <Toggle
                v-model="form.cej"
                class="flex-1"
                label="Êtes-vous engagé Contrat d'Engagement Jeune ?"
                :description="form.cej ? 'Oui, je suis en Contrat d\'Engagement Jeune' : 'Non, je ne suis pas en Contrat d\'Engagement Jeune'"
              />
            </div>
            <FormControl v-if="form.cej" label="Email de votre conseiller CEJ" html-for="cej_email_adviser" :error="errors.cej_email_adviser" required>
              <template #afterLabel>
                <span
                  v-tooltip="{
                    content: 'En renseignant l’adresse de votre conseiller, celui-ci sera automatiquement tenu au courant des missions sur lesquelles vous proposez votre aide.',
                  }"
                  class="p-1 cursor-help group"
                >
                  <InformationCircleIcon class="inline h-4 w-4 text-gray-400 group-hover:text-gray-900 mb-[2px]" />
                </span>
              </template>
              <Input
                v-model="form.cej_email_adviser"
                name="cej_email_adviser"
                placeholder="jean.dupont@gmail.com"
                @blur="validate('cej_email_adviser')"
              />
            </FormControl>
          </template>

          <Button
            type="submit"
            size="xl"
            variant="green"
            full
            :loading="loading"
            @click="onSubmit"
          >
            Continuer
          </Button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, date } from 'yup'
import { cloneDeep } from 'lodash'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'

export default {
  mixins: [FormErrors, FormUploads],
  layout: 'register-steps',
  data () {
    return {
      loading: false,
      steps: [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/benevole/step/profile'
        },
        {
          name: 'Votre profil',
          status: 'current'
        },
        {
          name: 'Vos préférences',
          status: 'upcoming'
        },
        {
          name: 'Vos disponibilités',
          status: 'upcoming'
        },
        {
          name: 'Vos compétences',
          status: 'upcoming'
        }
      ],
      form: cloneDeep(this.$store.state.auth.user.profile),
      formSchema: object({
        type: string().nullable().required('Une profession est requise'),
        mobile: string().min(10, 'Le mobile doit contenir au moins 10 caractères').matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect').required('Un mobile est requis'),
        phone: string().nullable().min(10, 'Le téléphone doit contenir au moins 10 caractères').matches(/^[+|\s|\d]*$/, 'Le format du téléphone est incorrect').transform(v => v === '' ? null : v),
        zip: string().min(5, 'Le format du code postal est incorrect').required('Un code postal est requis'),
        cej_email_adviser: string().nullable().email("Le format de l'email est incorrect").when('cej', {
          is: true,
          then: schema => schema.required("L'email de votre conseiller CEJ est obligatoire")
        }),
        service_civique_completion_date: date().nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null))
      })
    }
  },
  computed: {
    canViewScAndCej () {
      if (this.form.birthday) {
        const userAge = this.$dayjs().diff(this.$dayjs(this.form.birthday), 'year')
        return userAge >= 16 && userAge <= 30
      }
      return false
    }
  },
  watch: {
    'form.cej' (val) {
      if (!val) {
        this.form.cej_email_adviser = null
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await this.uploadFiles('profile', this.form.id)
          await this.$store.dispatch('auth/updateProfile', {
            id: this.$store.getters.profile.id,
            ...this.form
          })
          window.plausible &&
            window.plausible('Inscription bénévole - Étape 2 - Profil')
          this.$router.push('/inscription/benevole/step/preferences')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }

}
</script>
