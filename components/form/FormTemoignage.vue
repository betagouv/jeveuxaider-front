<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Informations générales </BaseHeading>
          <div class="space-y-10">
            <BaseFormControl html-for="grade" label="Note" required :error="errors.grade">
              <ClientOnly>
                <StarRating
                  v-model:rating="form.grade"
                  :rating="form.grade"
                  :show-rating="false"
                  inactive-color="#E0E0E0"
                  active-color="#EF9F03"
                  :rounded-corners="true"
                  @update:rating="$emit('rating-selected', form)"
                />
              </ClientOnly>
            </BaseFormControl>
            <BaseFormControl
              html-for="testimony"
              label="Témoignage"
              required
              :error="errors.testimony"
            >
              <BaseTextarea
                v-model="form.testimony"
                name="name"
                placeholder="Partagez votre expérience avec la communauté de bénévoles"
                :rows="10"
              />
            </BaseFormControl>
          </div>
        </BaseBox>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Paramètres </BaseHeading>
          <div class="space-y-12">
            <BaseAlert>
              Seuls ceux avec une note
              <span class="font-semibold">supérieure ou égale à 4</span> peuvent être visibles des
              utilisateurs
            </BaseAlert>
            <BaseToggle
              v-if="form.grade >= 4"
              v-model="form.is_published"
              :label="form.is_published ? 'En ligne' : 'Hors ligne'"
              description="Pour rendre le témoignage visible"
            />
          </div>
        </BaseBox>
      </div>
    </div>

    <div class="border-t my-8 pt-8 lg:pt-12 lg:my-12">
      <div class="flex flex-col gap-2 flex-shrink-0 items-center justify-center">
        <BaseButton size="xl" variant="green" :loading="loading" @click.native="handleSubmit()">
          Enregistrer
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { string, object, number } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  middleware: 'admin',
  props: {
    temoignage: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: { ...this.temoignage },
      formSchema: object({
        grade: number().min(1).max(5).required('La note est requise'),
        testimony: string()
          .min(50, 'Votre témoignage est trop court')
          .required('Votre témoignage est requis'),
      }),
    }
  },
  methods: {
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          await apiFetch(`/temoignages/${this.form.id}`, {
            method: 'PUT',
            body: this.form,
          })
          this.$router.push('/admin/contenus/testimonials')
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
})
</script>
