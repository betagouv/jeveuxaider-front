<template>
  <form :id="id" @submit.prevent="handleSubmit">
    <BaseFormControl
      :label="label"
      :label-suffix="required ? '' : `(Optionnelle)`"
      html-for="content"
      :required="required"
      :error="errors.content"
      info="La note sera visible uniquement par les administrateurs et les référents"
    >
      <BaseTextarea
        v-model="form.content"
        name="content"
        :placeholder="placeholder"
        :rows="nbRows"
        @blur="validate('content')"
      />
    </BaseFormControl>
  </form>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  props: {
    id: {
      type: String,
      default: 'form-note',
    },
    notableType: {
      type: String,
      required: true,
    },
    notableId: {
      type: Number,
      required: true,
    },
    note: {
      type: Object,
      default: () => {},
    },
    nbRows: {
      type: Number,
      default: 10,
    },
    required: {
      type: Boolean,
      default: true,
    },
    hideHelp: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Note interne à l'administration",
    },
    placeholder: {
      type: String,
      default: 'Rédigez votre note...',
    },
    context: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      form: { ...this.note, context: this.context },
      loading: false,
    }
  },
  computed: {
    formSchema() {
      if (this.required) {
        return object({
          content: string().required('La note est requise'),
        })
      } else {
        return object({
          content: string(),
        })
      }
    },
  },
  watch: {
    note(newVal) {
      this.form = { ...newVal, context: this.context }
    },
  },
  methods: {
    async handleSubmit() {
      if (this.loading) {
        return
      }
      if (!this.required && !this.form.content) {
        this.$emit('submitted')
        return
      }

      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.form.id) {
            await apiFetch(`/notes/${this.form.id}`, {
              method: 'PUT',
              body: this.form,
            })
          } else {
            const note = await apiFetch(`/${this.notableType}/${this.notableId}/notes`, {
              method: 'POST',
              body: this.form,
            })
            this.form.id = note.id
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
