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
    <div class="max-w-xl mx-auto">
      <div
        class="px-8 pt-6 pb-20 bg-white text-black text-3xl font-extrabold leading-9 text-center rounded-t-lg"
      >
        Complétez votre profil
      </div>
      <div class="p-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <form id="inscription" class="gap-8 grid grid-cols-1" @submit.prevent="onSubmit">
          <div class="bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: avatar upload
          </div>
          <FormControl label="Profession" html-for="type" required :error="errors.type">
            <SelectAdvanced
              v-model="form.type"
              name="type"
              placeholder="Sélectionnez votre profession"
              :options="options.profile_type"
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
              placeholder="0123456789"
              @blur="validate('phone')"
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
              placeholder="56000"
              @blur="validate('zip')"
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
import { string, object } from 'yup'
import _ from 'lodash'
import MixinForm from '@/mixins/form'
import labels from '@/utils/labels.json'

export default {
  mixins: [MixinForm],
  layout: 'register-steps',
  data () {
    return {
      loading: false,
      options: labels,
      form: _.cloneDeep(this.$store.state.auth.user.profile),
      formSchema: object({
        type: string().nullable().required('Une profession est requise'),
        mobile: string().min(10, 'Le mobile doit contenir au moins 10 caractères').matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect').required('Un mobile est requis'),
        phone: string().nullable().min(10, 'Le téléphone doit contenir au moins 10 caractères').matches(/^[+|\s|\d]*$/, 'Le format du téléphone est incorrect').transform(v => v === '' ? null : v),
        zip: string().min(5, 'Le format du code postal est incorrect').required('Un code postal est requis')
      })
    }
  },
  computed: {
    steps () {
      return [
        {
          name: 'Rejoignez le mouvement',
          status: 'complete',
          href: '/inscription/responsable/step/profile'
        },
        {
          name: 'Votre profil',
          status: 'current'
        },
        {
          name: 'Informations sur l\'organisation',
          status: 'upcoming'
        },
        {
          name: 'Quelques mots sur l\'organisation',
          status: 'upcoming'
        },
        {
          name: 'Votre organisation en images',
          status: 'upcoming'
        }
      ]
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
            window.plausible('Inscription responsable - Étape 2 - Profil')
          this.$router.push('/inscription/responsable/step/organisation')
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
