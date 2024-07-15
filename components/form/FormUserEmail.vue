<template>
  <div>
    <div>
      <div>@TODO</div>
    </div>
  </div>
</template>
<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  data() {
    return {
      loading: false,
      form: { email: '' },
      formSchema: object({
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
      }),
    }
  },
  methods: {
    handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          await apiFetch('/user/email', {
            method: 'POST',
            body: this.form,
          })
          this.$toast.success('Votre mot de passe a bien été modifié !')
          this.$emit('submited', this.form)
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
