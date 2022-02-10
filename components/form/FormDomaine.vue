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
            label="Nom du domaine d'action"
            required
            :error="errors.name"
          >
            <Input
              v-model="form.name"
              name="name"
              placeholder="Nom du domaine d'action"
            />
          </FormControl>
          <FormControl
            html-for="title"
            label="Titre de la page de ce domaine d'action"
            required
            :error="errors.title"
          >
            <Input
              v-model="form.title"
              name="title"
              placeholder="Titre de la page"
            />
          </FormControl>
          <FormControl
            label="Description"
            html-for="description"
            :error="errors.description"
            required
          >
            <Textarea
              v-model="form.description"
              name="description"
              placeholder="Décrivez le domaine d'action en quelques mots..."
            />
          </FormControl>
        </div>
      </Box>
      <Box>
        <Heading :level="3" class="mb-8">
          Images pour les organisations
        </Heading>
        <div class="space-y-12">
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: Upload des images à destination des organisations
          </div>
        </div>
      </Box>
      <Box>
        <Heading :level="3" class="mb-8">
          Images pour les missions
        </Heading>
        <div class="space-y-12">
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: Upload des images à destination des missions
          </div>
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
            v-model="form.published"
            :label="form.published ? 'En ligne' : 'Hors ligne'"
            description="Pour rendre la page accessible de tous"
          />
        </div>
      </Box>
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Organisations partenaires
        </Heading>
        <div class="space-y-12">
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: Upload des images des logos partenaires
          </div>
        </div>
      </Box>
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Image
        </Heading>
        <div class="space-y-12">
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: Upload de l'image principale
          </div>
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
    domaine: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      form: { ...this.domaine },
      formSchema: object({
        name: string().min(3, 'Le titre est trop court').required('Le titre est requis'),
        title: string().required("L'objectif est requis"),
        description: string().required('La description est requise')
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
            await this.$axios.put(`/domaines/${this.form.id}`, this.form)
          } else {
            await this.$axios.post('/domaines', this.form)
          }
          this.$router.push('/admin/contenus/domaines')
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
