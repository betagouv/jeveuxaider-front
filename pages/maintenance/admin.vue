<template>
  <div class="flex flex-col justify-center">
    <div class="py-12 px-4 relative w-full lg:inset-y-0 text-center z-10">
      <div class="flex-shrink-0 flex justify-center mb-12">
        <nuxt-link to="/">
          <img
            src="@/assets/images/jeveuxaider-logo.svg"
            alt="Bénévolat je veux aider"
            title="Bénévolat association"
            class="h-10 lg:h-12"
            width="350"
            height="auto"
            data-not-lazy
          >
        </nuxt-link>
      </div>

      <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md text-left">
        <div class="bg-white py-8 px-4 shadow sm:px-10">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200" />
            </div>
            <div class="relative flex justify-center text-xl">
              <span class="px-2 bg-white font-bold text-gray-900">
                Accès administrateurs
              </span>
            </div>
          </div>
          <form id="form" class="space-y-8 my-8" @submit.prevent="onSubmit">
            <FormControl label="Email" html-for="email" required :error="errors.email">
              <Input
                v-model="form.email"
                name="email"
                type="email"
                placeholder="Entrez votre email"
                @blur="validate('email')"
              />
            </FormControl>
            <FormControl label="Mot de passe" html-for="password" required :error="errors.password">
              <Input
                v-model="form.password"
                name="password"
                placeholder="Entrez votre mot de passe"
                type="password"
                @blur="validate('password')"
              />
            </FormControl>
            <Button
              type="submit"
              size="xl"
              variant="green"
              full
              :loading="loading"
              @click.native.prevent="onSubmit"
            >
              Connexion
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  components: {
  },
  mixins: [FormErrors],
  layout: 'empty',
  middleware: 'guest',
  data () {
    return {
      loading: false,
      form: {
        email: this.$route.query.email ? this.$route.query.email : '',
        password: ''
      },
      formSchema: object({
        email: string().required().email(),
        password: string().required()
      })
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
          await this.$store.dispatch('auth/login', this.form)
          this.$router.push(
            this.$router.history.current.query.redirect || '/profile'
          )
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
