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
            <Input
              v-model="form.title"
              name="name"
              placeholder="Entrez un titre"
            />
          </FormControl>
          <FormControl
            html-for="type"
            label="Type"
            required
            :error="errors.type"
          >
            <SelectAdvanced
              v-model="form.type"
              name="type"
              placeholder="Type"
              :options="[
                {
                  key: 'link',
                  label: 'Lien'
                },
                {
                  key: 'file',
                  label: 'Fichier'
                }
              ]"
            />
          </FormControl>
          <FormControl
            v-if="form.type === 'link'"
            html-for="link"
            label="Lien de la ressource"
            required
            :error="errors.link"
          >
            <Input
              v-model="form.link"
              name="link"
              placeholder="Entrez le lien"
            />
          </FormControl>
          <div v-if="form.type === 'file'" class="col-span-2 bg-yellow-100 p-4 text-sm rounded-lg">
            @TODO: Paragraphe comme https://www.jeveuxaider.gouv.fr/dashboard/territoire/1376/edit
          </div>
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
          <FormControl
            html-for="roles"
            label="Visibilité"
            required
            :error="errors.roles"
          >
            <CheckboxGroup
              v-model="form.roles"
              name="roles"
              variant="button"
              :options="[
                {
                  key: 'referent',
                  label: 'Référents'
                },
                {
                  key: 'responsable',
                  label: 'Responsables'
                }
              ]"
            />
          </FormControl>
        </div>
      </Box>
      <Box padding="sm">
        <Heading :level="3" class="mb-8">
          Notification
        </Heading>
        <div class="space-y-12">
          <Toggle
            v-model="notifyReferents"
            :label="notifyReferents ? 'Oui, je les notifie' : 'Non, je ne les notifie pas'"
            :description="form.id ? 'Notifier les référents de la mise à jour de cette ressource' : 'Notifier les référents de l\'ajout de cette ressource'"
          />
        </div>
      </Box>
    </div>
  </div>
</template>

<script>
import { string, object, array } from 'yup'
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
          is_published: true,
          type: 'link'
        }
      }
    }
  },
  data () {
    return {
      notifyReferents: false,
      form: { ...this.ressource },
      formSchema: object({
        title: string().min(2, 'Le nom est trop court').required('Le nom est requis'),
        type: string().required('Le type est requis'),
        roles: array().min(1, 'Merci de sélectionner au moins 1 élement')
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
            this.sendNotification(this.form)
          } else {
            const { res: ressource } = await this.$axios.post('/documents', this.form)
            this.sendNotification(ressource)
          }
          this.$emit('submitted')
          this.$toast.success(`${this.form.title} a bien été enregistré !`)
          this.$router.push('/admin/contenus/ressources')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async sendNotification (ressource) {
      if (this.notifyReferents) {
        await this.$axios.post(`/documents/${ressource.id}/notify`)
      }
    }
  }
}
</script>
