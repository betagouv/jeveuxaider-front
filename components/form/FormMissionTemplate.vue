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
            label="Titre"
            required
            :error="errors.title"
          >
            <FormHelperText>
              Il s'agit du titre principal affiché sur la page de la mission.
            </FormHelperText>
            <Input
              v-model="form.title"
              name="title"
            />
          </FormControl>
          <FormControl
            html-for="subtitle"
            label="Titre court"
            required
            :error="errors.subtitle"
          >
            <FormHelperText>
              Le titre court sera utilisé comme libellé pour le filtre "Type de mission" dans la recherche.
            </FormHelperText>
            <Input
              v-model="form.subtitle"
              name="subtitle"
            />
          </FormControl>
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
          <FormControl
            label="Description"
            html-for="description"
            :error="errors.description"
            required
          >
            <RichEditor
              v-model="form.objectif"
              placeholder="Décrivez la mission en quelques mots..."
            />
          </FormControl>
          <FormControl
            label="Objectif"
            html-for="objectif"
            :error="errors.objectif"
            required
          >
            <RichEditor
              v-model="form.objectif"
              placeholder="Décrivez la mission en quelques mots..."
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
            v-model="form.published"
            :label="form.published ? 'En ligne' : 'Hors ligne'"
            description="Pour rendre le modèle accessible"
          />
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
    missionTemplate: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      form: { ...this.missionTemplate },
      formSchema: object({
        title: string().min(3, 'Le titre est trop court').required('Le titre est requis'),
        subtitle: string().min(3, 'Le sous titre est trop court').required('Le sous titre est requis'),
        description: string().required('La description est requise'),
        objectif: string().required('L\'objectif est requise')
      })
    }
  },
  methods: {
    handleSubmitBrouillon () {
      this.handleSubmit()
    },
    handleSubmitPublish () {
      this.form.state = 'waiting'
      this.handleSubmit()
    },
    handleSubmit () {
      this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.loading = true
          if (this.form.id) {
            await this.$axios.put(`/mission-templates/${this.form.id}`, this.form)
          } else {
            await this.$axios.post('/mission-templates', this.form)
          }
          this.$router.push('/admin/contenus/modeles-mission')
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
