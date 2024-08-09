<script>
import { useProfileCompletion } from '~/composables/useProfileCompletion'
import { useProfileValidation } from '~/composables/useProfileValidation'
import FormErrors from '@/mixins/form/errors'
import { object } from 'yup'

export default defineNuxtComponent({
  mixins: [FormErrors],
  setup() {
    const { profile } = useProfileCompletion()
    const { schemaType, schemaCertifications, schemaDescription, initialForm } =
      useProfileValidation()

    return {
      profile,
      initialForm,
      schemaType,
      schemaCertifications,
      schemaDescription,
    }
  },
  data() {
    return {
      form: _cloneDeep(this.initialForm),
      formSchema: object({
        type: this.schemaType,
        certifications: this.schemaCertifications,
        description: this.schemaDescription,
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
    <DsfrHeading size="lg">🐣 Dites-en un peu plus sur vous</DsfrHeading>

    <DsfrFormControl label="Votre profession" html-for="type" required :error="errors.type">
      <DsfrSelect
        v-model="form.type"
        name="type"
        required
        placeholder="Sélectionner une profession"
        :options="$labels.profile_type"
        @update:modelValue="validate('type')"
        @blur="validate('type')"
        selectClass="max-w-[340px]"
      />
    </DsfrFormControl>

    <DsfrFormControl label="Un petit mot sur vous" html-for="description">
      <template #description>
        <p class="text-[#666666] text-pretty mb-4">
          Tout ce qui peut aider les organisations à mieux vous connaître.
        </p>
      </template>
      <DsfrTextarea
        v-model="form.description"
        name="description"
        :rows="5"
        placeholder="Vos motivations en quelques mots..."
        textarea-class="min-h-28"
      />
    </DsfrFormControl>
  </div>
</template>
