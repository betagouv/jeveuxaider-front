<template>
  <div class="relative">
    <client-only>
      <portal
        to="sidebar"
      >
        <div class="text-xl lg:text-2xl font-bold mb-6 lg:mb-12">
          Ça ne devrait pas prendre plus de 3 minutes 😉
        </div>
        <Steps
          :steps="steps"
        />
      </portal>
    </client-only>

    <div class="mb-6 lg:mb-12 text-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium leading-12 mb-4">
        <span class="font-bold">{{ $store.getters.profile.first_name }}</span>, faisons connaissance
      </h1>
    </div>
    <div class="max-w-xl mx-auto">
      <div
        class="px-8 pt-6 pb-6 bg-white text-black text-3xl font-extrabold leading-9 text-center rounded-t-lg"
      >
        Sélectionnez vos disponibilités
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <div class="mb-8 text-md text-gray-500">
          Un profil visible vous offre plus de chances de trouver une mission qui répond à votre envie d'engagement, en permettant à une organisation publique ou associative de vous contacter en fonction des domaines d'action que vous avez sélectionnés.
        </div>

        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <FormControl label="Souhaitez-vous être visible des organisations ? @TODO toggle component" html-for="is_visible">
            <SelectAdvanced
              v-model="form.is_visible"
              name="is_visible"
              :options="[
                { key: true, label: 'Oui, je souhaite être visibile'},
                { key: false, label: 'Non, je ne souhaite pas être visible'},
              ]"
            />
          </FormControl>
          <FormControl label="Sélectionnez vos disponibilités" html-for="disponibilities" required>
            <CheckboxGroup
              v-model="form.disponibilities"
              name="disponibilities"
              variant="button"
              :options="disponibilities_options"
              :error="errors.disponibilities"
            />
          </FormControl>
          <div>
            <FormLabel html-for="frequence" required>
              À quelle fréquence souhaitez-vous vous engager ?
            </FormLabel>
            <div class="flex flex-col lg:flex-row gap-2 lg:gap-8 lg:items-center lg:justify-center">
              <SelectAdvanced
                v-model="form.commitment__duration"
                class="lg:w-1/2"
                name="commitment__duration"
                placeholder="Sélectionnez une durée"
                :options="duration_options"
                :error="errors.commitment__duration"
              />
              <div class="flex-none text-sm">
                par
              </div>
              <SelectAdvanced
                v-model="form.commitment__time_period"
                class="lg:w-1/2"
                name="commitment__time_period"
                placeholder="Sélectionnez une durée"
                :options="time_period_options"
                :error="errors.commitment__time_period"
              />
            </div>
          </div>

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
import { string, object, array } from 'yup'
import _ from 'lodash'
import MixinForm from '@/mixins/form'
import labels from '@/utils/labels.json'

export default {
  mixins: [MixinForm],
  layout: 'register-steps',
  data () {
    return {
      loading: false,
      model: 'profile',
      avatar: null,
      steps: [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/benevole/step/profile'
        },
        {
          name: 'Votre profil',
          status: 'complete',
          href: '/inscription/benevole/step/profile'
        },
        {
          name: 'Vos disponibilités',
          status: 'current'
        },
        {
          name: 'Vos compétences',
          status: 'upcoming'
        }
      ],
      disponibilities_options: labels.disponibilities,
      time_period_options: labels.time_period,
      duration_options: labels.duration,
      form: _.cloneDeep(this.$store.getters.profile),
      formSchema: object({
        type: string().nullable().required(),
        mobile: string().min(10).matches(/^[+|\s|\d]*$/, 'Ce format est incorrect').required(),
        phone: string().nullable().min(10).matches(/^[+|\s|\d]*$/, 'Ce format est incorrect').transform(v => v === '' ? null : v),
        disponibilities: array().min(1, 'Merci de sélectionner au moins 1 disponibilité')
      })
    }
  },
  created () {
    if (!this.$store.getters.profile.disponibilities) {
      this.form.disponibilities = ['flexible', 'jours_feries', 'weekend', 'vacances']
    }
    if (!this.$store.getters.profile.commitment__duration) {
      this.form.commitment__duration = '2_hours'
    }
    if (!this.$store.getters.profile.commitment__time_period) {
      this.form.commitment__time_period = 'year'
    }
  },
  methods: {
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          await this.$store.dispatch('auth/updateProfile', {
            id: this.$store.getters.profile.id,
            ...this.form
          })
          window.plausible &&
            window.plausible('Inscription bénévole - Étape 3 - Préférences')
          this.$router.push('/inscription/benevole/step/competences')
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

<style>

</style>
