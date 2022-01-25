<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-3 space-y-12">
      <Box>
        <Heading :level="3" class="mb-8">
          Description de la mission
        </Heading>
        <div class="space-y-10">
          <FormControl
            html-for="name"
            label="Nom de la thématique"
            required
            :error="errors.name"
          >
            <Input
              v-model="form.name"
              name="name"
              placeholder="Nom de la thématique"
            />
          </FormControl>
          <FormControl
            html-for="title"
            label="Titre de la thématique"
            required
            :error="errors.title"
          >
            <Input
              v-model="form.title"
              name="title"
              placeholder="Titre de la thématique"
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
              placeholder="Décrivez la thématique en quelques mots..."
            />
          </FormControl>
          <div class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: Upload de l'image principale
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
          <FormControl
            label="Domaine"
            html-for="domaine_id"
            :error="errors.domaine_id"
            required
          >
            <SelectAdvanced
              v-model="form.domaine_id"
              name="domaine"
              placeholder="Sélectionner un domaine"
              :options="$labels.domaines"
            />
          </FormControl>
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
    </div>
  </div>
</template>

<script>
import { string, object, number } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  layout: 'admin',
  middleware: 'admin',
  props: {
    thematique: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      form: { ...this.thematique },
      formSchema: object({
        name: string().min(3, 'Le titre est trop court').required('Le titre est requis'),
        domaine_id: number().nullable().required('Le domaine est requis'),
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
            await this.$axios.put(`/thematique/${this.form.id}`, this.form)
          } else {
            await this.$axios.post('/thematique', this.form)
          }
          this.$router.push('/admin/contenus/thematiques')
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
