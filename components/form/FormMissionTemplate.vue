<template>
  <div>
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
              v-if="activities.length"
              label="Activité"
              html-for="activity_id"
            >
              <Combobox
                v-model="form.activity_id"
                :value="form.activity_id"
                name="activity_id"
                placeholder="Sélectionner une activité"
                :options="activities"
                clearable
                attribute-key="id"
                attribute-label="name"
              />
            </FormControl>
            <FormControl
              label="Description"
              html-for="description"
              :error="errors.description"
              required
            >
              <RichEditor
                v-model="form.description"
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
        <Box v-if="['admin'].includes($store.getters.contextRole)" padding="sm">
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
            <FormControl label="Carte mission" html-for="photo" class="col-span-2">
              <ImageCrop
                :default-value="form.photo"
                :ratio="300/143"
                :min-width="300"
                :preview-width="235"
                :upload-max-size="2000000"
                @add="addFiles({ files: [$event], collection: 'mission_template__photo' })"
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </FormControl>
          </div>
        </Box>
      </div>
    </div>
    <div class="border-t my-8 pt-8 lg:pt-12 lg:my-12">
      <div class="flex flex-col gap-2 flex-shrink-0 items-center justify-center">
        <ButtonsSubmitFormMissionTemplate
          class="flex"
          :mission-template="form"
          :loading="loading"
          @submitted="handleSubmit($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import ButtonsSubmitFormMissionTemplate from '@/components/custom/ButtonsSubmitFormMissionTemplate.vue'

export default {
  components: {
    ButtonsSubmitFormMissionTemplate
  },
  mixins: [FormErrors, FormUploads],
  props: {
    missionTemplate: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      form: { ...this.missionTemplate },
      formSchema: object({
        title: string().min(3, 'Le titre est trop court').required('Le titre est requis'),
        subtitle: string().min(3, 'Le titre court est trop court').required('Le titre court est requis'),
        description: string().required('La description est requise'),
        objectif: string().required('L\'objectif est requis'),
        domaine_id: string().required('Le domaine est requis')
      }),
      activities: []
    }
  },
  fetchOnServer: false,
  async fetch () {
    const { data: activities } = await this.$axios.get('/activities?pagination=999')
    this.activities = activities.data.filter(item => item.is_published || item.id === this.missionTemplate.activity_id)
  },
  methods: {
    async handleSubmit (attributes) {
      if (this.loading) {
        return
      }
      this.loading = true

      if (attributes) {
        this.form = {
          ...this.form,
          ...attributes
        }
      }

      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          if (this.form.id) {
            await this.$axios.put(`/mission-templates/${this.form.id}`, this.form)
          } else {
            const { data: missionTemplate } = await this.$axios.post('/mission-templates', this.form)
            this.form.id = missionTemplate.id
          }
          await this.uploadFiles('mission_template', this.form.id)

          this.$toast.success('Modifications enregistrées')
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
