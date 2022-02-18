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
          <ImageCropMultiple
            class="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
            :medias="form.illustrations_organisation"
            :ratio="300/143"
            :min-width="300"
            :preview-width="235"
            variant="compact"
            upload-variant="compact"
            :upload-max-size="2000000"
            disable-delete
            @add="addFiles({ files: [$event], collection: 'illustrations_organisation' })"
            @delete="deleteFile($event)"
            @crop="onManipulationsChange($event)"
          />
        </div>
      </Box>
      <Box>
        <Heading :level="3" class="mb-8">
          Images pour les missions
        </Heading>
        <div class="space-y-12">
          <ImageCropMultiple
            class="grid sm:grid-cols-2 md:grid-cols-3 gap-4"
            :medias="form.illustrations_mission"
            :ratio="300/143"
            :min-width="300"
            :preview-width="235"
            variant="compact"
            upload-variant="compact"
            disable-delete
            @add="addFiles({ files: [$event], collection: 'illustrations_mission' })"
            @delete="deleteFile($event)"
            @crop="onManipulationsChange($event)"
          />
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
          <FormControl html-for="logos_partenaires">
            <ImageCropMultiple
              class="grid sm:grid-cols-3 lg:grid-cols-2 gap-4"
              :medias="form.logos_partenaires"
              :ratio="null"
              :min-height="112"
              :preview-width="null"
              :preview-height="56"
              preview-fit="contain"
              preview-classes="p-2"
              :upload-max-size="500000"
              variant="compact"
              upload-variant="compact"
              @add="addFiles({ files: [$event], collection: 'domaine__logos_partenaires' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </FormControl>
        </div>
      </Box>
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Organisations actives
        </Heading>
        <div class="space-y-12">
          <FormControl html-for="logos_partenaires_actifs">
            <ImageCropMultiple
              class="grid sm:grid-cols-3 lg:grid-cols-2 gap-4"
              :medias="form.logos_partenaires_actifs"
              :ratio="null"
              :min-height="112"
              :preview-width="null"
              :preview-height="56"
              preview-fit="contain"
              preview-classes="p-2"
              :upload-max-size="500000"
              variant="compact"
              upload-variant="compact"
              @add="addFiles({ files: [$event], collection: 'domaine__logos_partenaires_actifs' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </FormControl>
        </div>
      </Box>
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Images pour la page publique
        </Heading>
        <div class="space-y-12">
          <FormControl label="Bannière" html-for="banner">
            <ImageCrop
              :default-value="form.banner"
              :ratio="300/143"
              :min-width="300"
              :preview-width="235"
              :upload-max-size="2000000"
              @add="addFiles({ files: [$event], collection: 'domaine__banner' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </FormControl>

          <FormControl label="Illustrations" html-for="illustrations">
            <ImageCropMultiple
              class="grid sm:grid-cols-3 gap-4"
              :limit="6"
              :medias="form.illustrations"
              :ratio="1/1"
              :min-width="430"
              :preview-width="200"
              variant="compact"
              upload-variant="compact"
              @add="addFiles({ files: [$event], collection: 'domaine__illustrations' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </FormControl>
        </div>
      </Box>
    </div>
  </div>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'

export default {
  mixins: [FormErrors, FormUploads],
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
            const { data: domaine } = await this.$axios.post('/domaines', this.form)
            this.form.id = domaine.id
          }
          await this.uploadFiles('domaine', this.form.id)

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
