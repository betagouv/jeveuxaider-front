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
          Renseignez ces éléments pour informer les organisations de vos disponibilités. Cela ne vous engage en rien. [@TODO message rassurant]
        </div>

        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <FormControl label="Disponibilités" html-for="disponibilities" required>
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
              Fréquence
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
import MixinForm from '@/mixins/form'
import labels from '@/utils/labels.json'

export default {
  mixins: [MixinForm],
  layout: 'register-steps',
  asyncData ({ store }) {
    return {
      disponibilities_options: labels.disponibilities,
      time_period_options: labels.time_period,
      duration_options: labels.duration,
      form: {
        ...store.getters.profile,
        disponibilities: store.getters.profile.disponibilities
          ? store.getters.profile.disponibilities
          : ['flexible', 'jours_feries', 'weekend', 'vacances'],
        commitment__duration: store.getters.profile && store.getters.profile.commitment__duration ? store.getters.profile.commitment__duration : '2_hours',
        commitment__time_period: store.getters.profile && store.getters.profile.commitment__time_period ? store.getters.profile.commitment__time_period : 'year'
      }
    }
  },
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
      formSchema: object({
        type: string().nullable().required(),
        mobile: string().min(10).matches(/^[+|\s|\d]*$/, 'Ce format est incorrect').required(),
        phone: string().nullable().min(10).matches(/^[+|\s|\d]*$/, 'Ce format est incorrect').transform(v => v === '' ? null : v),
        disponibilities: array().min(1, 'Merci de sélectionner au moins 1 disponibilité')
      })
    }
  },
  methods: {
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          console.log('this.form', this.form)

          await this.$store.dispatch('auth/updateProfile', {
            id: this.$store.getters.profile.id,
            ...this.form
          })
          window.plausible &&
            window.plausible('Inscription bénévole - Étape 2 - Profil')
          this.$router.push('/inscription/benevoles/step/preferences')
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
