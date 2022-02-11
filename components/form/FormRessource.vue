<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-3 space-y-12">
      <Box>
        <Heading :level="3" class="mb-8">
          Informations générales
        </Heading>
        <div class="space-y-10">
          <FormControl
            html-for="title"
            label="Titre du document"
            required
            :error="errors.title"
          >
            <Input
              v-model="form.title"
              name="name"
              placeholder="Entrez un titre"
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
            description="Pour le rendre accessible"
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
  layout: 'admin',
  middleware: 'admin',
  props: {
    ressource: {
      type: Object,
      default: () => {
        return {
          is_published: true
        }
      }
    }
  },
  data () {
    return {
      form: { ...this.ressource },
      formSchema: object({
        title: string().min(2, 'Le nom est trop court').required('Le nom est requis')
      })
    }
  },
  methods: {
    handleSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          if (this.form.id) {
            await this.$axios.put(`/documents/${this.form.id}`, this.form)
          } else {
            await this.$axios.post('/documents', this.form)
          }
          this.$emit('submitted')
          this.$toast.success(`${this.form.title} a bien été enregistré !`)
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
