<template>
  <div class="mx-auto max-w-sm">
    <div class="text-center mb-6">
      <Heading as="div" size="lg" class="mb-2 lg:mb-3">
        Avant toute chose
      </Heading>
      <div class="text-cool-gray-500 text-lg lg:text-xl">
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

        <div class="text-center">
          <Button
            :loading="loading"
            size="lg"
            class="w-full"
            @click.native.prevent="onSubmit"
          >
            Connexion
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Emailable from '@/mixins/emailable.client'
import Heading from '@/components/dsfr/Heading.vue'
import Button from '@/components/dsfr/Button.vue'

export default {
  name: 'SoftGateEmail',
  components: {
    Heading,
    Button
  },
  mixins: [FormErrors, Emailable],
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
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          const isEmailValid = await this.emailableValidation()
          if (!isEmailValid) {
            this.$toast.error("L'email semble invalide")
            return
          }
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
