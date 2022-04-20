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
              html-for="name"
              label="Nom de l'activité"
              required
              :error="errors.name"
            >
              <Input
                v-model="form.name"
                name="name"
              />
            </FormControl>
            <FormControl label="Domaines d'action" html-for="domaines" required :error="errors.domaines">
              <CheckboxGroup
                v-model="form.domaines"
                name="domaines"
                variant="button"
                :options="$labels.domaines"
                is-model
              />
            </FormControl>
          </div>
        </Box>
        <Box>
          <Heading :level="3" class="mb-8">
            SEO
          </Heading>
          <div class="space-y-10">
            <FormControl
              label="Titre de recrutement"
              html-for="seo_recruit_title"
            >
              <Input
                v-model="form.seo_recruit_title"
                name="seo_recruit_title"
                placeholder=""
              />
            </FormControl>
            <FormControl
              label="Description pour le recrutement"
              html-for="seo_recruit_description"
            >
              <RichEditor
                v-model="form.seo_recruit_description"
              />
            </FormControl>
            <FormControl
              label="Titre pour l'engagement"
              html-for="seo_engage_title"
            >
              <Input
                v-model="form.seo_engage_title"
                name="seo_engage_title"
                placeholder=""
              />
            </FormControl>
            <FormControl
              label="Description pour l'engagement"
              html-for="seo_engage_paragraphs"
            >
              <Paragraph
                :schema="[
                  { key: 'title', label: 'Titre', type: 'text' },
                  { key: 'description', label: 'Description', type: 'richtext' },
                ]"
                :items="form.seo_engage_paragraphs"
                @add="onParagraphAddItem('seo_engage_paragraphs', $event)"
                @update="onParagraphUpdateItem('seo_engage_paragraphs', $event)"
                @remove="onParagraphRemoveItem('seo_engage_paragraphs', $event)"
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
              description="Pour rendre la page accessible"
            />
          </div>
        </Box>
        <Box padding="sm">
          <Heading :level="3" class="mb-8">
            Image
          </Heading>
          <div class="space-y-12">
            <FormControl label="Bannière" html-for="banner">
              <ImageCrop
                :default-value="form.banner"
                :ratio="1600/600"
                :min-width="1600"
                :preview-width="235"
                preview-conversion="desktop"
                :upload-max-size="2000000"
                @add="addFiles({ files: [$event], collection: 'activity__banner' })"
                @delete="deleteFile($event)"
                @crop="onManipulationsChange($event)"
              />
            </FormControl>
          </div>
        </Box>
        <Box v-if="$store.getters.contextRole === 'admin'" padding="sm">
          <Heading :level="3" class="mb-8">
            Assocations partenaires
          </Heading>
          <div class="space-y-12">
            <ImageCropMultiple
              class="grid sm:grid-cols-3 lg:grid-cols-2 gap-4"
              :medias="form.promoted_organisations"
              :ratio="null"
              :min-height="112"
              :preview-width="null"
              :preview-height="56"
              preview-fit="contain"
              preview-classes="p-2"
              :upload-max-size="500000"
              variant="compact"
              upload-variant="compact"
              @add="addFiles({ files: [$event], collection: 'activity__promoted_organisations' })"
              @delete="deleteFile($event)"
              @crop="onManipulationsChange($event)"
            />
          </div>
        </Box>
      </div>
    </div>

    <div class="border-t my-8 pt-8 lg:pt-12 lg:my-12">
      <div class="flex flex-col gap-2 flex-shrink-0 items-center justify-center">
        <Button size="xl" variant="green" :loading="loading" @click.native="handleSubmit()">
          Enregistrer
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, array } from 'yup'
import FormErrors from '@/mixins/form/errors'
import FormUploads from '@/mixins/form/uploads'
import FormParagraphs from '@/mixins/form/paragraphs'

export default {
  mixins: [FormErrors, FormUploads, FormParagraphs],
  middleware: 'admin',
  props: {
    activity: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },
  data () {
    return {
      loading: false,
      form: { ...this.activity },
      formSchema: object({
        name: string().min(3, 'Le nom est trop court').required('Le nom est requis'),
        domaines: array().min(1, 'Au moins 1 domaine d\'action')
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
            await this.$axios.put(`/activities/${this.form.id}`, this.form)
          } else {
            const { data: activity } = await this.$axios.post('/activities', this.form)
            this.form.id = activity.id
          }
          await this.uploadFiles('activity', this.form.id)
          this.$router.push(`/admin/contenus/activites/${this.form.id}`)
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
