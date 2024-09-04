<script>
import { useProfileValidation } from '~/composables/useProfileValidation'
import FormErrors from '@/mixins/form/errors'
import { object } from 'yup'

export default defineNuxtComponent({
  mixins: [FormErrors],
  setup() {
    const { initialForm, schemaSkills } = useProfileValidation()

    return {
      initialForm,
    }
  },
  data() {
    return {
      form: _cloneDeep(this.initialForm),
      formSchema: object({
        skills: this.schemaSkills,
      }),
      loading: false,
    }
  },
  methods: {
    async handleValidation() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.$emit('submit', this.form)
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

<template>
  <div class="flex flex-col gap-10">
    <DsfrHeading size="lg" class="text-center">🧰 Vos compétences</DsfrHeading>

    <FormUserSkills v-model="form.skills" tag-class="max-w-full sm:max-w-[280px]" />

    <DsfrFormControl label="Avez-vous des certifications ?" html-for="certifications">
      <DsfrTagsGroup
        v-model="form.certifications"
        name="certifications"
        variant="button"
        :options="$labels.profile_certifications"
      />
    </DsfrFormControl>
  </div>
</template>
