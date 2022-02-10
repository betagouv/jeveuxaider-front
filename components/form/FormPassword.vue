<template>
  <form
    id="password"
    class="gap-8 grid grid-cols-1"
    @submit.prevent="onSubmit"
  >
    <FormControl
      label="Mot de passe actuel"
      html-for="current_password"
      required
      :error="errors.current_password"
    >
      <Input
        v-model="form.current_password"
        name="current_password"
        placeholder="Saisissez votre mot de passe actuel"
        type="password"
        @blur="validate('current_password')"
      />
    </FormControl>
    <FormControl
      label="Nouveau mot de passe"
      html-for="password"
      required
      :error="errors.password"
    >
      <Input
        v-model="form.password"
        name="password"
        placeholder="Saisissez votre nouveau mot de passe"
        type="password"
        @blur="validate('password')"
      />
    </FormControl>
    <FormControl
      label="Confirmation de votre nouveau mot de passe"
      html-for="password_confirmation"
      required
      :error="errors.password_confirmation"
    >
      <Input
        v-model="form.password_confirmation"
        name="password_confirmation"
        placeholder="Saisissez votre nouveau mot de passe à nouveau"
        type="password"
        @blur="validate('password_confirmation')"
      />
    </FormControl>
    <div class="ml-auto">
      <Button variant="green" size="lg" type="submit">
        Enregistrer
      </Button>
    </div>
  </form>
</template>
<script>
import { string, object, ref } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  data () {
    return {
      loading: false,
      form: {},
      formSchema: object({
        current_password: string().required('Merci de saisir votre mot de passe'),
        password: string().min(8).required('Un nouveau mot de passe est requis'),
        password_confirmation: string().required('Une confirmation de mot de passe est requise').oneOf([ref('password'), null], 'Le mot de passe n\'est pas identique')
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
          this.loading = true
          await this.$axios.post('/user/password', this.form)
          this.$toast.success('Votre mot de passe a bien été modifié !')
          this.$emit('submited', this.form)
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
