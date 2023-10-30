<template>
  <div class="mx-auto max-w-sm">
    <div class="text-center mb-6">
      <DsfrHeading as="div" size="lg" class="mb-2 lg:mb-3"> Avant toute chose </DsfrHeading>
      <div class="text-cool-gray-500 text-lg lg:text-xl">Renseignez votre e-mail</div>
    </div>
    <div class="mx-auto max-w-sm">
      <form id="form" class="space-y-8 my-8" @submit.prevent="onSubmit">
        <BaseFormControl label="Email" html-for="email" required :error="errors.email">
          <BaseInput
            v-model="form.email"
            type="email"
            name="email"
            placeholder="Entrez votre email"
            @blur="validate('email')"
          />
        </BaseFormControl>

        <div class="text-center">
          <DsfrButton :loading="loading" size="lg" class="w-full" @click.native.prevent="onSubmit">
            Connexion
          </DsfrButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import Emailable from '@/mixins/emailable.client'

export default defineNuxtComponent({
  name: 'SoftGateEmail',
  mixins: [FormErrors, Emailable],
  data() {
    return {
      loading: false,
      form: {},
      formSchema: object({
        email: string().required().email(),
      }),
    }
  },
  methods: {
    onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          const isEmailValid = await this.emailableValidation()
          if (!isEmailValid) {
            this.errors.email = 'Votre adresse mail comporte une erreur'
            this.$toast.error('Votre adresse mail comporte une erreur')
            return
          }
          const profile = await apiFetch('firstname', {
            method: 'POST',
            body: this.form,
          })
          if (profile) {
            this.$emit('login', profile)
          } else {
            this.$gtm?.trackEvent({ event: 'benevole-email-register-soft-gate' })
            apiFetch('/sendinblue/contact', {
              method: 'POST',
              body: {
                email: this.form.email,
                id_liste: 383,
                url_mission: window.location.href,
              },
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
    },
  },
})
</script>
