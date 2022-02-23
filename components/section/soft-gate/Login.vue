<template>
  <div>
    <div class="text-center mb-6">
      <div
        class="text-gray-900 font-extrabold text-2xl lg:text-3xl leading-8 mb-2 lg:mb-3"
      >
        {{ form.first_name }}, ravi de vous retrouver !
      </div>
      <div class="text-gray-500 font-semibold text-lg lg:text-xl">
        Renseignez votre mot de passe
      </div>
    </div>
    <div class="mx-auto max-w-sm">
      <form id="form" class="space-y-8 my-8" @submit.prevent="onSubmit">
        <FormControl label="Email" html-for="email" required :error="errors.email">
          <Input
            v-model="form.email"
            name="email"
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
          <template #description>
            <Link
              to="/password-reset"
              class="text-sm font-medium mt-2 opacity-5"
            >
              Mot de passe perdu ?
            </Link>
          </template>
        </FormControl>
        <Button
          type="submit"
          size="xl"
          variant="green"
          full
          :loading="loading"
          @click="onSubmit"
        >
          Connexion
        </Button>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  name: 'SoftGateLogin',
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
      form: { ...this.datas },
      formSchema: object({
        email: string().required().email(),
        password: string().required()
      })
    }
  },
  created () {},
  methods: {
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          console.log('ok validate', this.loading)
          if (this.loading) {
            return
          }
          this.loading = true
          await this.$store.dispatch('auth/login', this.form)

          if (
            this.$store.state.auth.user.statistics.new_participations_today >= 3
          ) {
            this.$emit('too-many-participations')
          } else {
            this.$emit('next')
          }
          window.plausible &&
                 window.plausible('Soft Gate - Étape 2 - Login')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
      // this.$refs.loginForm.validate((valid, fields) => {
      //   if (valid) {
      //     this.loading = true
      //     this.$store
      //       .dispatch('auth/login', {
      //         email: this.form.email,
      //         password: this.form.password
      //       })
      //       .then(() => {
      //         this.loading = false

      //         if (
      //           this.$store.getters.user
      //             .statistics.new_participations_today >= 3
      //         ) {
      //           this.$emit('too-many-participations')
      //         } else {
      //           this.$emit('next')
      //         }

      //         window.plausible &&
      //           window.plausible('Soft Gate - Étape 2 - Login')
      //       })
      //       .catch(() => {
      //         this.loading = false
      //       })
      //   } else {
      //     this.showErrors(fields)
      //   }
      // })
    }
  }
}
</script>

<style lang="postcss" scoped>
::placeholder {
  font-weight: 500;
}
</style>
