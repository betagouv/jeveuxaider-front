<template>
  <div>
    <div class="text-center mb-8">
      <div class="text-[48px]">💌</div>
      <div class="text-[#161616] text-[28px] font-bold leading-9 mb-2 lg:mb-4">
        Votre prochaine mission de bénévolat dans votre boîte mail
      </div>
      <div class="text-[#666666] lg:text-lg max-w-md mx-auto">
        <strong>Recevez un email par semaine</strong> avec les nouvelles missions disponibles.
      </div>
      <!-- <div class="text-[#666666] text-sm">Vous pourrez la désactiver à tout moment.</div> -->
    </div>
    <div class="mx-auto">
      <form id="form" class="space-y-8" @submit.prevent="onSubmit">
        <DsfrFormControl
          html-for="type_missions"
          :error="errors.type_missions"
          class="mt-6 @container"
          label="Type de missions"
          required
        >
          <DsfrTagsGroup
            v-model="form.type_missions"
            name="type_missions"
            :options="[
              { key: 'presentiel', label: 'Sur place' },
              { key: 'distance', label: 'À distance' },
              { key: 'all', label: 'Les deux' },
            ]"
            context="radio"
          />
        </DsfrFormControl>

        <template v-if="['presentiel', 'all'].includes(form.type_missions)">
          <DsfrFormControl
            html-for="zip"
            :error="errors.zip"
            class="mt-6 @container"
            label="Ville"
            required
          >
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
            />
          </DsfrFormControl>
          <DsfrFormControl
            html-for="radius"
            :error="errors.radius"
            class="mt-6 @container"
            label="Rayon"
            required
          >
            <DsfrSelect
              name="radius"
              v-model="form.radius"
              :options="[
                { key: 10, label: '10 kms' },
                { key: 25, label: '25 kms' },
                { key: 50, label: '50 kms' },
              ]"
            />
          </DsfrFormControl>
        </template>

        <DsfrFormControl html-for="activities" :error="errors.activities" label="Activités">
          <DsfrTagsGroup
            v-model="form.activities"
            name="activites"
            variant="button"
            :options="activities"
          />
        </DsfrFormControl>
        <DsfrFormControl html-for="commitment" :error="errors.commitment" label="Disponibilités">
          <DsfrSelect v-model="form.commitment" name="commitment" :options="$labels.commitment" />
        </DsfrFormControl>

        <DsfrButton :loading="loading" class="w-full" full @click.native.prevent="onSubmit">
          {{ isModeUpdating ? 'Modifier mon alerte' : 'Créer mon alerte' }}
        </DsfrButton>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object, array, number } from 'yup'
import FormErrors from '@/mixins/form/errors'
import activities from '@/assets/activities.json'
import GeolocProfile from '@/mixins/geoloc-profile'

export default defineNuxtComponent({
  name: 'UserAlertStepForm',
  props: {
    form: {
      type: Object,
      default: null,
    },
  },
  mixins: [FormErrors, GeolocProfile],
  emits: ['next'],
  data() {
    return {
      activities: activities,
      loading: false,
      zipAutocompleteOptions: [],
      loadingFetchZips: false,
      formSchema: object({
        type_missions: string().required('Un type de mission est requis'),
        activities: array().min(1, 'Une activité est requise').required('Une activité est requise'),
        commitment: string().required('Une disponibilité est requise'),
        zip: string()
          .nullable()
          .when('type_missions', {
            is: (type_missions) => type_missions !== 'distance',
            then: (schema) => schema.required('Un code postal est requis'),
          }),
        city: string()
          .nullable()
          .when('type_missions', {
            is: (type_missions) => type_missions !== 'distance',
            then: (schema) => schema.required('Une ville est requise'),
          }),
        latitude: string()
          .nullable()
          .when('type_missions', {
            is: (type_missions) => type_missions !== 'distance',
            then: (schema) => schema.required('Une latitude est requise'),
          }),
        longitude: string()
          .nullable()
          .when('type_missions', {
            is: (type_missions) => type_missions !== 'distance',
            then: (schema) => schema.required('Une longitude est requise'),
          }),
        radius: number().when('type_missions', {
          is: (type_missions) => type_missions !== 'distance',
          then: (schema) => schema.required('Un rayon est requis'),
        }),
      }),
    }
  },
  computed: {
    isModeUpdating() {
      return this.$stores.userAlert.selectedAlert !== null
    },
  },
  methods: {
    async createAlert() {
      await apiFetch('/user/alerts', {
        method: 'POST',
        body: this.form,
      })

      this.$plausible.trackEvent('User Alert - Creation')

      this.$toast.success('Votre alerte a bien été créée.')
    },
    async updateAlert() {
      await apiFetch(`/user/alerts/${this.$stores.userAlert.selectedAlert.id}`, {
        method: 'PUT',
        body: this.form,
      })

      this.$toast.success('Votre alerte a bien été modifiée.')
    },
    onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.$stores.userAlert.selectedAlert) {
            this.updateAlert()
          } else {
            this.createAlert()
          }

          await this.$stores.auth.fetchUser()
          this.$emit('next')
        })
        .catch((errors) => {
          console.log('errorsss', errors)
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
