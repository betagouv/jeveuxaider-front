<template>
  <div>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div class="lg:col-span-3 space-y-12">
        <BaseBox>
          <BaseHeading :level="3" class="mb-8"> Informations générales </BaseHeading>
          <div class="space-y-10">
            <BaseFormControl html-for="name" label="Nom" required :error="errors.name">
              <BaseInput v-model="form.name" name="name" placeholder="Nom" />
            </BaseFormControl>
            <BaseFormControl label="Description" html-for="description">
              <BaseTextarea
                v-model="form.description"
                name="description"
                placeholder="Entrez une description..."
              />
            </BaseFormControl>
          </div>
        </BaseBox>
      </div>
      <div class="lg:col-span-2 space-y-8">
        <BaseBox padding="sm">
          <BaseHeading :level="3" class="mb-8"> Paramètres </BaseHeading>
          <div class="space-y-12">
            <BaseToggle
              v-model="form.is_published"
              :label="form.is_published ? 'En ligne' : 'Hors ligne'"
              description="Pour rendre le tag accessible de tous"
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
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  props: {
    vocabulary: {
      type: String,
      required: true,
    },
    term: {
      type: Object,
      default: () => {
        return {
          is_published: false,
        }
      },
    },
  },
  data() {
    return {
      loading: false,
      form: { ...this.term },
      formSchema: object({
        name: string().min(2, 'Le nom est trop court').required('Le nom est requis'),
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
          if (this.form.id) {
            await apiFetch(`/vocabularies/${this.vocabulary}/terms/${this.form.id}`, {
              method: 'PUT',
              body: this.form,
            })
          } else {
            await this.apiFetch(`/vocabularies/${this.vocabulary}/terms`, {
              method: 'POST',
              body: this.form,
            })
          }
          this.$emit('submitted')
          this.$router.push(this.$route.query.redirect)
          this.$toast.success(`${this.form.name} a bien été enregistré !`)
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
