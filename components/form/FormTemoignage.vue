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
              html-for="grade"
              label="Note"
              required
              :error="errors.grade"
            >
              <StarRating
                v-model="form.grade"
                :rating="form.grade"
                :show-rating="false"
                inactive-color="#E0E0E0"
                active-color="#EF9F03"
                :rounded-corners="true"
                @rating-selected="$emit('rating-selected', form)"
              />
            </FormControl>
            <FormControl
              html-for="testimony"
              label="Témoignage"
              required
              :error="errors.testimony"
            >
              <Textarea
                v-model="form.testimony"
                name="name"
                placeholder="Partagez votre expérience avec la communauté de bénévoles"
                :rows="10"
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
            <Alert>
              Seuls ceux avec une note <span class="font-semibold">supérieure ou égale à 4</span> peuvent être visibles des utilisateurs
            </Alert>
            <Toggle
              v-if="form.grade >= 4"
              v-model="form.is_published"
              :label="form.is_published ? 'En ligne' : 'Hors ligne'"
              description="Pour rendre le témoignage visible"
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
import { string, object, number } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  middleware: 'admin',
  props: {
    temoignage: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: { ...this.temoignage },
      formSchema: object({
        grade: number().min(1).max(5).required('La note est requise'),
        testimony: string().min(50, 'Votre témoignage est trop court').required('Votre témoignage est requis')
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
          await this.$axios.put(`/temoignages/${this.form.id}`, this.form)
          this.$router.push('/admin/contenus/testimonials')
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
