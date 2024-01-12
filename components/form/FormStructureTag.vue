<template>
  <div>
    <BaseFormControl html-for="name" label="Libellé du tag" required :error="errors.name">
      <BaseInput v-model="form.name" name="name" placeholder="Saisissez le libellé" />
      <BaseFormHelperText class="mt-1">
        Ex: en attente d’une réponse bénévole, en attente d’un retour en interne, en attente d’une
        formation, en cours d’intégration
      </BaseFormHelperText>
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
          .min(2, 'Le libellé du tag est trop court')
          .required('Le libellé du tag est requis'),
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
