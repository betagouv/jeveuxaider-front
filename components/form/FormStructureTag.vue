<template>
  <div>
    <BaseFormControl html-for="name" label="Libellé de l'étiquette" required :error="errors.name">
      <BaseInput v-model="form.name" name="name" placeholder="Saisissez le nom" />
    </BaseFormControl>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  props: {
    tag: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      loading: false,
      form: { ...this.tag },
      formSchema: object({
        name: string()
          .min(2, "Le libellé de l'étiquette est trop court")
          .required("Le libellé de l'étiquette est requis"),
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
          if (this.form.id) {
            await apiFetch(`${this.$stores.structureTags.endpoint}/${this.tag.id}`, {
              method: 'PUT',
              body: this.form,
            })
          } else {
            await apiFetch(`${this.$stores.structureTags.endpoint}`, {
              method: 'POST',
              body: {
                type: 'participation',
                name: this.form.name,
              },
            })
          }
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
