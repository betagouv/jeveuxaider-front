<script>
import { useProfileCompletion } from '~/composables/useProfileCompletion'
import { useProfileValidation } from '~/composables/useProfileValidation'
import FormErrors from '@/mixins/form/errors'
import { object } from 'yup'

export default defineNuxtComponent({
  mixins: [FormErrors],
  setup() {
    const { profile } = useProfileCompletion()
    const {
      schemaDisponibilities,
      schemaCommitmentDuration,
      schemaCommitmentTimePeriod,
      initialForm,
    } = useProfileValidation()

    return {
      profile,
      initialForm,
      schemaDisponibilities,
      schemaCommitmentDuration,
      schemaCommitmentTimePeriod,
    }
  },
  data() {
    return {
      form: _cloneDeep(this.initialForm),
      formSchema: object({
        commitment__duration: this.schemaCommitmentDuration,
        commitment__time_period: this.schemaCommitmentTimePeriod,
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

      <div class="mt-8 flex flex-col sm:flex-row gap-4 lg:gap-6">
        <div class="lg:w-1/2">
          <DsfrSelect
            id="commitment__duration"
            v-model="form.commitment__duration"
            name="commitment__duration"
            placeholder="Durée"
            :options="$labels.duration"
            @blur="validate('commitment__duration')"
          />
          <BaseFormError v-if="errors.commitment__duration">
            {{ errors.commitment__duration }}
          </BaseFormError>
        </div>
        <div class="flex-none text-lg font-semibold sm:mt-2">par</div>
        <div class="lg:w-1/2">
          <DsfrSelect
            v-model="form.commitment__time_period"
            id="commitment__time_period"
            name="commitment__time_period"
            placeholder="Fréquence"
            :options="$labels.time_period"
            @blur="validate('commitment__time_period')"
          />
          <BaseFormError v-if="errors.commitment__time_period">
            {{ errors.commitment__time_period }}
          </BaseFormError>
        </div>
      </div>
    </div>
    <div>
      <DsfrHeading size="lg" class="text-center"> Plutôt… </DsfrHeading>
      <DsfrFormControl html-for="disponibilities" :error="errors.disponibilities" class="mt-8">
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
