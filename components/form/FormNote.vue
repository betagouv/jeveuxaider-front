<template>
  <div>
    <form id="form-note" @submit.prevent="handleSubmit">
      <FormControl
        label="Note"
        html-for="content"
        required
        :error="errors.content"
      >
        <FormHelperText class="pb-4">
          Visible seulement des administrateurs et des référents
        </FormHelperText>
        <Textarea
          v-model="form.content"
          name="content"
          placeholder="Rédigez votre note..."
          :rows="10"
          @blur="validate('content')"
        />
      </FormControl>
    </form>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  props: {
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
    }
  },
  data () {
    return {
      form: { ...this.note },
      formSchema: object({
        content: string().required('La note est requise')
      }),
      loading: false
    }
  },
  watch: {
    note (newVal) {
      this.form = { ...newVal }
    }
  },
  methods: {
    async handleSubmit () {
      if (this.loading) {
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
