<script>
import { useProfileCompletion } from '~/composables/useProfileCompletion'
import { useProfileValidation } from '~/composables/useProfileValidation'
import FormErrors from '@/mixins/form/errors'
import { object } from 'yup'

export default defineNuxtComponent({
  mixins: [FormErrors],
  setup() {
    const { initialForm, schemaActivities } = useProfileValidation()

    return {
      initialForm,
      schemaActivities,
    }
  },
  data() {
    return {
      form: _cloneDeep(this.initialForm),
      formActivities: [],
      formPopularActivities: [],
      formSchema: object({
        activities: this.schemaActivities,
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
          this.form.activities = [...this.formPopularActivities, ...this.formActivities].sort(
            (a, b) => (a.key > b.key ? 1 : a.key < b.key ? -1 : 0)
          )
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
      <DsfrHeading size="lg" class="text-center">Quelles activités vous intéressent ?</DsfrHeading>

      <p class="mt-4 text-center max-w-[450px] mx-auto">
        Sélectionnez au moins une activité pour recevoir des suggestions en fonction de vos envies.
      </p>

      <FormUserActivities
        :initial-activities="form.activities"
        @update:formActivities="formActivities = $event"
        @update:formPopularActivities="formPopularActivities = $event"
      />
    </div>
  </div>
</template>
