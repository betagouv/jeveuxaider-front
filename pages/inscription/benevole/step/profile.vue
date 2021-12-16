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
        Bienvenue
        <span class="font-bold">{{ $store.getters.profile.first_name }}</span> !
      </h1>
      <div class="text-lg font-medium">
        Nous sommes ravis de vous compter parmi nos bénévoles.
      </div>
    </div>
    <div class="rounded-lg bg-white max-w-xl mx-auto overflow-hidden">
      <div
        class="px-8 pt-6 pb-20 bg-white text-black text-3xl font-extrabold leading-9 text-center"
      >
        Complétez votre profil
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <FormControl label="Profession" html-for="type" required>
            <SelectAdvanced
              v-model="form.type"
              name="type"
              placeholder="Sélectionnez votre profession"
              :options="profile_type_options"
              :error="errors.type"
              @blur="validate('type')"
            />
          </FormControl>
          <FormControl label="Téléphone mobile" html-for="mobile" required>
            <Input
              v-model="form.mobile"
              name="mobile"
              placeholder="0612345678"
              :error="errors.mobile"
              @blur="validate('mobile')"
            />
          </FormControl>
          <FormControl label="Téléphone fixe" html-for="phone">
            <Input
              v-model="form.phone"
              name="phone"
              placeholder="0123456789"
              :error="errors.phone"
              @blur="validate('phone')"
            />
          </FormControl>
          <FormControl label="Disponibilités" html-for="disponibilities" required>
            <CheckboxGroup
              v-model="form.disponibilities"
              name="disponibilities"
              variant="button"
              :options="disponibilities_options"
              :error="errors.disponibilities"
              @blur="validate('disponibilities')"
            />
          </FormControl>
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
      profile_type_options: labels.profile_type,
      disponibilities_options: labels.disponibilities,
      form: {
        ...store.getters.profile,
        disponibilities: store.getters.profile.disponibilities
          ? store.getters.profile.disponibilities
          : ['flexible', 'jours_feries', 'weekend', 'vacances']
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
          status: 'current'
        },
        {
          name: 'Vos préférences',
          status: 'upcoming'
        },
        {
          name: 'Vos compétences',
          status: 'upcoming'
        }
      ],
      formSchema: object({
        type: string().nullable().required(),
        mobile: string().min(10).matches(/^[+|\s|\d]*$/, 'Ce format est incorrect').required(),
        phone: string().matches(/^[+|\s|\d]*$/, 'Ce format est incorrect'),
        disponibilities: array().length(1, 'Merci de sélectionner au moins 1 disponibilité')
      })
    }
  },
  methods: {

    onSubmit () {
      console.log('this.form', this.form)

      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(() => {
          this.loading = true
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
