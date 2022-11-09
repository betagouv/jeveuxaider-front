<template>
  <div class="relative bg-[#070191] overflow-hidden">
    <img
      class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
      alt="JeVeuxAider.gouv.fr"
      srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x, /images/bg-jva.jpg"
      data-not-lazy
    >

    <div class="pb-12 mt-12 px-4 relative w-full lg:inset-y-0 text-center z-10">
      <div class="">
        <h2
          class="mt-6 mb-4 md:mb-0 text-center text-3xl font-bold text-white leading-8 px-4"
        >
          Réinitialisation de votre mot de passe
        </h2>
        <p class="text-center text-base text-[#c3ddfd]">
          Renseignez votre nouveau mot de passe afin de vous connecter à la
          plateforme.
        </p>
      </div>
      <div class="mt-12 sm:mx-auto sm:w-full sm:max-w-md text-left">
        <div class="bg-white py-8 px-4 shadow sm:px-10">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-[#d2d6dc]" />
            </div>
            <div class="relative flex justify-center text-xl">
              <span class="px-2 bg-white font-bold text-gray-900">
                Réinitialisation du mot de passe              </span>
            </div>
          </div>
          <template v-if="!submitted">
            <form id="form" class="space-y-8 mt-8" @submit.prevent="onSubmit">
              <FormControl
                label="Nouveau mot de passe"
                html-for="password"
                required
                :error="errors.password"
              >
                <Input
                  v-model="form.password"
                  name="password"
                  placeholder="Mot de passe"
                  type="password"
                  @blur="validate('password')"
                />
              </FormControl>
              <FormControl
                label="Confirmez votre nouveau mot de passe"
                html-for="password_confirmation"
                required
                :error="errors.password_confirmation"
              >
                <Input
                  v-model="form.password_confirmation"
                  name="password_confirmation"
                  placeholder="Mot de passe"
                  type="password"
                  @blur="validate('password_confirmation')"
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
                Modifier mon mot de passe
              </Button>
            </form>
          </template>
          <template v-else>
            <div class="mt-4 space-y-4">
              <div class="text-gray-500 space-y-4">
                <p>
                  Votre mot de passe a été mis à jour.
                </p>
                <p>
                  Vous pouvez désormais vous connecter avec vos nouveaux
                  identifiants.
                </p>
              </div>
              <nuxt-link
                :to="`/login?email=${$route.query.email}`"
              >
                <Button full size="xl" class="mt-8">
                  Se connecter
                </Button>
              </nuxt-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { string, ref, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  middleware: 'guest',
  data () {
    return {
      loading: false,
      submitted: false,
      form: {
        email: '',
        password: '',
        password_confirmation: '',
        token: ''
      },
      formSchema: object({
        password: string().min(8).required(),
        password_confirmation: string().required().oneOf([ref('password'), null], 'Le mot de passe n\'est pas identique')
      })
    }
  },
  created () {
    this.form.token = this.$route.params.token
    this.form.email = this.$route.query.email
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
          await this.$axios.post('/password/reset', this.form)
          this.submitted = true
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
