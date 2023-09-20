<template>
  <div>
    <form
      id="form-add-responsable"
      novalidate
      name="form-add-responsable"
      @submit.prevent="handleSubmit"
    >
      <BaseFormControl label="Email" html-for="email" required>
        <BaseInput
          v-model="form.email"
          name="email"
          type="email"
          placeholder="responsable@example.fr"
        />
      </BaseFormControl>
    </form>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  props: {
    endpoint: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: {},
      formSchema: object({
        email: string().required('Un email est requis').email("Le format de l'email est incorrect"),
      }),
    }
  },
  methods: {
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(this.endpoint, {
            method: 'POST',
            body: this.form,
          })
            .then((res) => {
              this.$toast.success('Le responsable a bien été ajouté')
              this.$emit('submited', res.data)
            })
            .catch((errors) => {
              console.log('errors', errors)
            })
        })
        .catch((errors) => {
          console.log('error', errors)
          this.setErrors(errors)
        })
        .finally(() => {
          // console.log('finally')
          this.loading = false
        })
    },
  },
})
</script>
