<script>
import { useProfileCompletion } from '~/composables/useProfileCompletion'
import { useProfileValidation } from '~/composables/useProfileValidation'
import FormErrors from '@/mixins/form/errors'
import { object } from 'yup'

export default defineNuxtComponent({
  mixins: [FormErrors],
  setup() {
    const { schemaMissionType, initialForm } = useProfileValidation()

    return {
      initialForm,
      schemaMissionType,
    }
  },
  data() {
    return {
      form: _cloneDeep(this.initialForm),
      formSchema: object({
        type_missions: this.schemaMissionType,
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
      <DsfrHeading size="lg" class="text-center">Sur place ou à distance ?</DsfrHeading>

      <p class="mt-4 text-center max-w-[450px] mx-auto">
        Vous pouvez trouver aussi bien des missions sur le terrain, ou des missions à réaliser
        depuis chez vous
      </p>

      <DsfrFormControl
        html-for="type_missions"
        :error="errors.type_missions"
        class="mt-8 max-w-[384px] mx-auto"
      >
        <DsfrRadioRichGroup
          v-model="form.type_missions"
          name="type_missions"
          :options="$labels.profile_type_missions"
          option-class="w-full"
        />
      </DsfrFormControl>
    </div>
  </div>
</template>
