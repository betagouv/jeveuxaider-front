<template>
  <div>
    <div class="text-center mb-6">
      <div
        class="text-gray-900 font-extrabold text-2xl lg:text-3xl leading-8 mb-2 lg:mb-3"
      >
        Rejoignez le mouvement&nbsp;!
      </div>
      <div class="text-gray-500 font-semibold text-lg lg:text-xl">
        Créez rapidement votre compte Bénévole
      </div>
    </div>
    <div class="mx-auto max-w-md">
      <form id="inscription" class="gap-8 mb-8 grid grid-cols-1 lg:grid-cols-2" @submit.prevent="onSubmit">
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
            placeholder="0612345678"
            @blur="validate('mobile')"
          />
        </FormControl>
        <FormControl
          label="Date de naissance"
          html-for="birthday"
          required
          :error="errors.birthday"
        >
          <Input
            v-model="form.birthday"
            name="birthday"
            placeholder="jj/mm/aaaa"
            type="date"
            hide-picker
            @blur="validate('birthday')"
          />
        </FormControl>
        <FormControl
          label="Mot de passe"
          html-for="password"
          required
          :error="errors.password"
        >
          <Input
            v-model="form.password"
            name="password"
            placeholder="Votre mot de passe"
            type="password"
            @blur="validate('password')"
          />
        </FormControl>
        <FormControl
          label="Confirmation"
          html-for="password_confirmation"
          required
          :error="errors.password_confirmation"
        >
          <Input
            v-model="form.password_confirmation"
            name="password_confirmation"
            placeholder="Votre mot de passe"
            type="password"
            @blur="validate('password_confirmation')"
          />
        </FormControl>
      </form>

      <Button
        type="submit"
        size="xl"
        form="inscription"
        variant="green"
        full
        rounded
        :loading="loading"
        @click="onSubmit"
      >
        S'inscrire
      </Button>

      <div class="mt-6 mb-3">
        <p class="text-xs leading-5 text-gray-500 text-center">
          <span>En m'inscrivant j'accepte la</span>
          <nuxt-link
            to="/politique-de-confidentialite"
            target="_blank"
            class="font-medium text-gray-900 hover:underline"
          >
            politique de confidentialité
          </nuxt-link>
          <br>
          <span>et la</span>
          <nuxt-link
            to="/charte-reserve-civique"
            target="_blank"
            class="font-medium text-gray-900 hover:underline"
          >
            charte de JeVeuxAider.gouv.fr
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, ref, date } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  name: 'SoftGateRegister',
  mixins: [FormErrors],
  props: {
    datas: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: { ...this.datas, utm_source: this.$cookies.get('utm_source') },
      formSchema: object({
        first_name: string().min(3).required('Un prénom est requis'),
        last_name: string().min(2).required('Un nom est requis'),
        mobile: string().min(10).matches(/^[+|\s|\d]*$/, 'Le format du mobile est incorrect').required('Un téléphone mobile est requis'),
        zip: string().min(5).required('Un code postal est requis'),
        birthday: date().required("Une date d'anniversaire est requise").nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        password: string().min(8).required('Un mot de passe est requis'),
        password_confirmation: string().required('Une confirmation de mot de passe est requise').oneOf([ref('password'), null], 'Le mot de passe n\'est pas identique')
      })
    }
  },
  created () {},
  methods: {
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.loading) {
            return
          }
          this.loading = true
          await this.$store.dispatch('auth/registerVolontaire', this.form)

          window.plausible &&
                window.plausible('Soft Gate - Étape 2 - Inscription')

          this.$emit('next')
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
