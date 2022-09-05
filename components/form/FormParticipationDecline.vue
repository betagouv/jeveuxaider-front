<template>
  <form id="form-participation-decline" class="space-y-4" @submit.prevent="handleSubmit">
    <FormControl
      html-for="reason"
      label="Raison"
      required
    >
      <RadioGroup v-model="form.reason" :options="$labels.participation_declined_reasons" />
    </FormControl>

    <div
      v-if="form.reason == 'mission_terminated'"
    >
      <InformationCircleSolidIcon width="16" height="16" class="mb-1 inline mr-1 text-jva-blue-500" />
      <span class="text-sm text-gray-600">
        Nous vous invitons dans un second temps à passer la ou les missions concernées en "Terminée" afin de clore le recrutement de nouveaux bénévoles.
      </span>
    </div>

    <FormControl
      html-for="content"
      label="Précisions"
    >
      <Textarea v-model="form.content" name="content" placeholder="Vous pouvez compléter par un commentaire si vous le souhaitez. À noter : celui-ci pourra être consulté par le bénévole" />
    </FormControl>
  </form>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  data () {
    return {
      loading: false,
      form: {},
      formSchema: object({
        reason: string().nullable().required('La raison est requise')
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
        .then(() => {
          this.$emit('confirm', this.form)
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
