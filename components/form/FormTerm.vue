<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-3 space-y-12">
      <Box>
        <Heading :level="3" class="mb-8">
          Informations générales
        </Heading>
        <div class="space-y-10">
          <FormControl
            html-for="name"
            label="Nom"
            required
            :error="errors.name"
          >
            <Input
              v-model="form.name"
              name="name"
              placeholder="Nom"
            />
          </FormControl>
          <FormControl
            label="Description"
            html-for="description"
          >
            <Textarea
              v-model="form.description"
              name="description"
              placeholder="Entrez une description..."
            />
          </FormControl>
        </div>
      </Box>
    </div>
    <div class="lg:col-span-2 space-y-8">
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Paramètres
        </Heading>
        <div class="space-y-12">
          <Toggle
            v-model="form.is_published"
            :label="form.is_published ? 'En ligne' : 'Hors ligne'"
            description="Pour rendre le tag accessible de tous"
          />
        </div>
      </Box>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  middleware: 'admin',
  props: {
    vocabulary: {
      type: String,
      required: true
    },
    term: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      form: { ...this.term },
      formSchema: object({
        name: string().min(2, 'Le nom est trop court').required('Le nom est requis')
      })
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
            await this.$axios.put(`/vocabularies/${this.vocabulary}/terms/${this.form.id}`, this.form)
          } else {
            await this.$axios.post(`/vocabularies/${this.vocabulary}/terms`, this.form)
          }
          this.$emit('submitted')
          this.$toast.success(`${this.form.name} a bien été enregistré !`)
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
