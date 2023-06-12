<template>
  <div class="bg-white px-6 py-8 lg:px-12 lg:py-14">
    <div class="grid grid-cols-1 divide-y-gray-400 divide-y gap-12 lg:gap-16">
      <div class="">
        <Heading as="h2" :level="2">
          Mes informations personnelles
        </Heading>
        <div class="text-lg text-[#3A3A3A] mt-4">
          Ces informations sont utilisées lors de vos mises en relation avec d’autres utilisateurs.
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <FormControl class="md:col-span-2" label="Photo de profil" html-for="avatar">
            <ImageCrop
              :default-value="form.avatar"
              :preview-width="100"
              :min-width="200"
              @add="addFiles({ files: [$event], collection: 'profile__avatar' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </FormControl>
          <FormControl
            label="Prénom"
            html-for="first_name"
            required
            :error="errors.first_name"
          >
            <Input
              v-model="form.first_name"
              name="first_name"
              placeholder="Jean"
              @blur="validate('first_name')"
            />
          </FormControl>
          <FormControl
            label="Nom"
            html-for="last_name"
            required
            :error="errors.last_name"
          >
            <Input
              v-model="form.last_name"
              name="last_name"
              placeholder="Dupont"
              @blur="validate('last_name')"
            />
          </FormControl>
          <FormControl
            label="Email"
            html-for="email"
            required
            :error="errors.email"
          >
            <Input
              v-model="form.email"
              type="email"
              name="email"
              placeholder="jean.dupont@gmail.com"
              @blur="validate('email')"
            />
          </FormControl>
          <FormControl
            label="Code postal"
            html-for="zip"
            required
            :error="errors.zip"
          >
            <Input
              v-model="form.zip"
              name="zip"
              type="tel"
              maxlength="5"
              placeholder="56000"
              @blur="validate('zip')"
            />
          </FormControl>
          <FormControl
            label="Téléphone mobile"
            html-for="mobile"
            required
            :error="errors.mobile"
          >
            <Input
              v-model="form.mobile"
              name="mobile"
              type="tel"
              maxlength="14"
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
          <FormControl
            label="Date de naissance"
            html-for="birthday"
            required
            :error="errors.birthday"
          >
            <InputDate v-model="form.birthday" required name="birthday" />
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
        </div>
      </div>
      <div class="pt-8 lg:pt-14">
        <Heading as="h2" :level="2">
          Mes motivations en quelques mots
        </Heading>
        <div class="mt-6">
          <FormControl label="" html-for="description" class="">
            <Textarea v-model="form.description" name="description" placeholder="Vos motivations en quelques mots..." />
          </FormControl>
        </div>
      </div>

      <div v-if="canViewScAndCej" class="pt-8 lg:pt-14">
        <Heading as="h2" :level="2">
          Service Civique & Contrat d'Engagement Jeune
        </Heading>
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
              >
              <div class="w-full lg:w-[520px]">
                <Toggle
                  v-model="form.service_civique"
                  class="lg:w-full"
                  position="right"
                  label="Êtes-vous volontaire en Service Civique ?"
                  :description="form.service_civique ? 'Oui, je suis volontaire' : 'Non, je ne suis pas volontaire'"
                />
              </div>
            </div>
            <div v-if="form.service_civique" class="max-w-xl lg:pl-[144px]">
              <FormControl
                label="Date de début de votre Service Civique"
                html-for="service_civique_completion_date"
                :error="errors.service_civique_completion_date"
                required
              >
                <InputDate
                  v-model="form.service_civique_completion_date"
                  active-picker="MONTH"
                  required
                  name="service_civique_completion_date"
                />
              </FormControl>
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
              >
              <div class="w-full lg:w-[520px]">
                <Toggle
                  v-model="form.cej"
                  class="lg:w-full"
                  position="right"
                  label="Êtes-vous engagé Contrat d'Engagement Jeune ?"
                  :description="form.cej ? 'Oui, je suis en Contrat d\'Engagement Jeune' : 'Non, je ne suis pas en Contrat d\'Engagement Jeune'"
                />
              </div>
            </div>
            <div v-if="form.cej" class="max-w-xl lg:pl-[144px]">
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
            </div>
          </div>
        </div>
      </div>
      <div class="hidden sm:block pt-8 lg:pt-14">
        <div class="text-center">
          <Button
            size="lg"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="handleSubmit()"
          >
            Mettre à jour
          </Button>
        </div>
      </div>
      <transition name="fade">
        <div
          v-if="formIsDirty"
          :class="[
            'sm:hidden fixed bottom-0 p-3 bg-white z-50 w-full left-0 right-0',
          ]"
          style="box-shadow: 0 25px 20px 30px rgb(0 0 0 / 25%);"
        >
          <Button
            size="lg"
            class="w-full"
            variant="primary"
            :loading="loading"
            :disabled="!formIsDirty"
            @click.native="handleSubmit()"
          >
            Mettre à jour
          </Button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { cloneDeep, isEqual } from 'lodash'
import { string, object, date } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import Emailable from '@/mixins/emailable.client'
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  mixins: [FormErrors, FormUploads, Emailable],
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: cloneDeep(this.profile),
      formSchema: object({
        first_name: string().required('Un prénom est requis'),
        last_name: string().required('Un nom est requis'),
        birthday: date().test(
          'test-birthday-required',
          "Une date d'anniversaire est requise",
          (birthday) => {
            return ['admin'].includes(this.$store.getters.contextRole) || birthday
          }
        ).nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        type: string().nullable().test(
          'test-profession-required',
          'Une profession est requise',
          (type) => {
            return ['admin'].includes(this.$store.getters.contextRole) || type
          }
        ),
        mobile: string().nullable().min(10, 'Le mobile doit contenir au moins 10 caractères').matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect').test(
          'test-mobile-required',
          'Un mobile est requis',
          (mobile) => {
            return ['admin'].includes(this.$store.getters.contextRole) || mobile
          }
        ).transform(v => v === '' ? null : v),
        phone: string().nullable().min(10, 'Le téléphone doit contenir au moins 10 caractères').matches(/^[+|\s|\d]*$/, 'Le format du téléphone est incorrect').transform(v => v === '' ? null : v),
        zip: string().nullable().min(5, 'Le format du code postal est incorrect').test(
          'test-zip-required',
          'Un code postal est requis',
          (zip) => {
            return ['admin'].includes(this.$store.getters.contextRole) || zip
          }
        ),
        cej_email_adviser: string().nullable().email("Le format de l'email est incorrect").when('cej', {
          is: true,
          then: schema => schema.required("L'email de votre conseiller CEJ est obligatoire")
        }),
        service_civique_completion_date: date().nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null))
      }),
      formIsDirty: false
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
    },
    form: {
      deep: true,
      handler (newForm) {
        this.formIsDirty = !isEqual(newForm, this.profile)
        this.$emit('change', this.formIsDirty)
      }
    },
    uploads: {
      deep: true,
      handler (newUploads) {
        this.formIsDirty = newUploads.add.length || newUploads.update.length || newUploads.delete.length
        this.$emit('change', this.formIsDirty)
      }
    }
  },
  methods: {
    async handleSubmit () {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.form.email !== this.profile.email) {
            const isEmailValid = await this.emailableValidation()
            if (!isEmailValid) {
              this.errors.email = 'Votre adresse mail comporte une erreur'
              this.$toast.error('Votre adresse mail comporte une erreur')
              return
            }
          }
          await this.uploadFiles('profile', this.form.id)
          await this.$store.dispatch('auth/updateProfile', {
            id: this.$store.getters.profile.id,
            ...this.form
          })
          this.$toast.success('Modifications enregistrées')
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
