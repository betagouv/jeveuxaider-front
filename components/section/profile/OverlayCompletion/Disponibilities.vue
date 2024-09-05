<script>
import { useProfileCompletion } from '~/composables/useProfileCompletion'
import { useProfileValidation } from '~/composables/useProfileValidation'
import FormErrors from '@/mixins/form/errors'
import { object } from 'yup'

export default defineNuxtComponent({
  mixins: [FormErrors],
  setup() {
    const { profile } = useProfileCompletion()
    const { schemaDisponibilities, schemaCommitment, initialForm } = useProfileValidation()

    return {
      profile,
      initialForm,
      schemaDisponibilities,
      schemaCommitment,
    }
  },
  data() {
    return {
      form: _cloneDeep(this.initialForm),
      formSchema: object({
        commitment: this.schemaCommitment,
        disponibilities: this.schemaDisponibilities,
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
    <div>
      <DsfrHeading size="lg" class="text-center"> Quelles sont vos disponibilités ? </DsfrHeading>

      <DsfrFormControl
        label="Sélectionnez votre possibilité d'engagement"
        label-class="sr-only"
        html-for="commitment"
        :error="errors.commitment"
        class="mt-8"
      >
        <DsfrTagsGroup
          v-model="form.commitment"
          name="commitment"
          context="radio"
          :options="$labels.commitment"
          @updated="validate('commitment')"
        />
      </DsfrFormControl>
    </div>
    <div>
      <DsfrHeading size="lg" class="text-center"> Plutôt… </DsfrHeading>
      <DsfrFormControl
        label="Cochez vos créneaux de disponibilité"
        label-class="sr-only"
        html-for="disponibilities"
        :error="errors.disponibilities"
        class="mt-8"
      >
        <DsfrTagsGroup
          v-model="form.disponibilities"
          name="disponibilities"
          variant="button"
          :options="$labels.disponibilities"
          @updated="validate('disponibilities')"
        />
      </DsfrFormControl>
    </div>
  </div>
</template>
