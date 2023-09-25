<template>
  <form id="form" class="my-8" @submit.prevent="onSubmit">
    <BaseFormControl class="mb-8" label="E-mail" html-for="email" required>
      <BaseInput
        v-model="form.email"
        type="email"
        name="email"
        placeholder="Entrez votre email"
        required
        disabled
      />
    </BaseFormControl>
    <BaseFormControl label="Mot de passe" html-for="password" required>
      <BaseInput
        v-model="form.password"
        name="password"
        placeholder="Entrez votre mot de passe"
        type="password"
        required
      />
    </BaseFormControl>

    <div class="my-4">
      <nuxt-link
        no-prefetch
        :to="`/password-reset?email=${form.email}`"
        class="text-jva-blue-500 text-sm hover:underline"
      >
        Mot de passe perdu ?
      </nuxt-link>
    </div>
    <BaseButton
      type="submit"
      size="xl"
      variant="green"
      full
      :loading="loading"
      @click.native.prevent="onSubmit"
    >
      Me connecter à mon compte
    </BaseButton>
  </form>
</template>

<script>
import { string, object } from 'yup'
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
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        password: string().required('Un mot de passe est requis'),
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
          await this.$stores.auth.login(this.form)
          if (this.$stores.auth.isLogged) {
            this.$emit('submitted')
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
