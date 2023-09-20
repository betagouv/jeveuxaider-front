<template>
  <form id="form" class="space-y-8 my-8" @submit.prevent="onSubmit">
    <div class="grid grid-cols-2 gap-4">
      <BaseFormControl label="Prénom" html-for="first_name" required>
        <BaseInput v-model="form.first_name" name="first_name" placeholder="Prénom" required />
      </BaseFormControl>
      <BaseFormControl label="Nom" html-for="last_name" required>
        <BaseInput v-model="form.last_name" name="last_name" placeholder="Nom" required />
      </BaseFormControl>
    </div>

    <BaseFormControl label="E-mail" html-for="email" required>
      <BaseInput
        v-model="form.email"
        type="email"
        name="email"
        placeholder="Entrez votre email"
        required
        disabled
      />
    </BaseFormControl>
    <BaseFormControl label="Mot de passe" html-for="password" required :error="errors.password">
      <BaseInput
        v-model="form.password"
        name="password"
        placeholder="Entrez votre mot de passe"
        type="password"
        required
      />
    </BaseFormControl>
    <BaseFormControl
      label="Confirmer le mot de passe"
      html-for="password_confirmation"
      required
      :error="errors.password_confirmation"
    >
      <BaseInput
        v-model="form.password_confirmation"
        name="password_confirmation"
        placeholder="Entrez votre mot de passe"
        type="password"
        required
      />
    </BaseFormControl>
    <BaseButton
      type="submit"
      size="xl"
      variant="green"
      full
      :loading="loading"
      @click.native.prevent="onSubmit"
    >
      J'accepte l'invitation
    </BaseButton>
  </form>
</template>

<script>
import { string, object, ref } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  props: {
    invitation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        email: this.invitation.email,
      },
      formSchema: object({
        first_name: string().required('Un prénom est requis'),
        last_name: string().required('Un nom est requis'),
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        password: string().min(8).required('Un mot de passe est requis'),
        password_confirmation: string()
          .required('Une confirmation de mot de passe est requise')
          .oneOf([ref('password'), null], "Le mot de passe n'est pas identique"),
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
          await apiFetch(`/invitations/${this.invitation.token}/register`, {
            method: 'POST',
            body: this.form,
          })
          this.$plausible.trackEvent('Inscription depuis une invitation')
          await this.$stores.auth.login(this.form)
          this.$emit('submitted')
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
