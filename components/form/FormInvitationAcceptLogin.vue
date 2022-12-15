<template>
  <form id="form" class="my-8" @submit.prevent="onSubmit">
    <FormControl class="mb-8" label="E-mail" html-for="email" required>
      <Input
        v-model="form.email"
        type="email"
        name="email"
        placeholder="Entrez votre email"
        required
        disabled
      />
    </FormControl>
    <FormControl label="Mot de passe" html-for="password" required>
      <Input
        v-model="form.password"
        name="password"
        placeholder="Entrez votre mot de passe"
        type="password"
        required
      />
    </FormControl>

    <div class="my-4">
      <nuxt-link
        to="/password-reset"
        class="text-jva-blue-500 text-sm hover:underline"
      >
        Mot de passe perdu ?
      </nuxt-link>
    </div>
    <Button
      type="submit"
      size="xl"
      variant="green"
      full
      :loading="loading"
      @click.native.prevent="onSubmit"
    >
      J'accepte l'invitation
    </Button>
  </form>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  props: {
    invitation: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: {
        email: this.invitation.email
      },
      formSchema: object({
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
        password: string().min(8).required('Un mot de passe est requis')
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
          this.$emit('submitted')
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
