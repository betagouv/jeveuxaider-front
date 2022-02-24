<template>
  <div class="mx-auto max-w-sm">
    <div class="text-center mb-6">
      <div
        class="text-gray-900 font-extrabold text-2xl lg:text-3xl leading-8 mb-2 lg:mb-3"
      >
        Avant toute chose
      </div>
      <div class="text-gray-500 font-semibold text-lg lg:text-xl">
        Renseignez votre e-mail
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

        <Button
          type="submit"
          size="xl"
          variant="green"
          rounded
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
  name: 'SoftGateEmail',
  mixins: [FormErrors],
  data () {
    return {
      loading: false,
      form: {},
      formSchema: object({
        email: string().required().email()
      })
    }
  },
  methods: {
    onSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.loading) {
            return
          }
          this.loading = true
          const { data: profile } = await this.$axios.post('firstname', this.form)
          if (profile) {
            this.$emit('login', profile)
          } else {
            this.$gtm.push({ event: 'benevole-email-register-soft-gate' })
            this.$axios.post('/sendinblue/contact', {
              email: this.form.email,
              id_liste: 383,
              url_mission: window.location.href
            })
            this.$emit('register', this.form)
          }
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
