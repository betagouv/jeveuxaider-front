<template>
  <form :id="id" @submit.prevent="handleSubmit">
    <FormControl
      :label="label"
      :label-suffix="required ? '' : `(Optionnelle)`"
      html-for="content"
      :required="required"
      :error="errors.content"
    >
      <Textarea
        v-model="form.content"
        name="content"
        :placeholder="placeholder"
        :rows="nbRows"
        @blur="validate('content')"
      />
      <FormHelperText v-if="!hideHelp" class="mt-2">
        Visible uniquement des administrateurs et des référents
      </FormHelperText>
    </FormControl>
  </form>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  props: {
    id: {
      type: String,
      default: 'form-note'
    },
    notableType: {
      type: String,
      required: true
    },
    notableId: {
      type: Number,
      required: true
    },
    note: {
      type: Object,
      default: () => {}
    },
    nbRows: {
      type: Number,
      default: 10
    },
    required: {
      type: Boolean,
      default: true
    },
    hideHelp: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Note'
    },
    placeholder: {
      type: String,
      default: 'Rédigez votre note...'
    },
    context: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      form: { ...this.note, context: this.context },
      loading: false
    }
  },
  computed: {
    formSchema () {
      if (this.required) {
        return object({
          content: string().required('La note est requise')
        })
      } else {
        return object({
          content: string()
        })
      }
    }
  },
  watch: {
    note (newVal) {
      this.form = { ...newVal, context: this.context }
    }
  },
  methods: {
    async handleSubmit () {
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
            await this.$axios.put(`/notes/${this.form.id}`, this.form)
          } else {
            const { data: note } = await this.$axios.post(`/${this.notableType}/${this.notableId}/notes`, this.form)
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
    }
  }
}
</script>
