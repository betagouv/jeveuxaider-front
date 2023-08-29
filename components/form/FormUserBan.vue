<template>
  <form id="form-user-ban" class="space-y-4" @submit.prevent="handleSubmit">
    <FormControl
      html-for="reason"
      label="Raison"
      required
    >
      <RadioGroup v-model="form.reason" :options="$labels.user_ban_reasons" />
    </FormControl>

    <div
      v-if="['not_regular_resident', 'younger_than_16', 'inappropriate_behavior'].includes(form.reason)"
    >
      <RiInformationFill width="18" height="18" class="inline-flex mr-1 text-jva-blue-500 fill-current" />
      <span v-if="['not_regular_resident'].includes(form.reason)" class="text-sm text-gray-600">
        Toutes les participations du bénévole seront annulées avec comme motif "Utilisateur ne résidant pas sur le territoire français". Le bénévole sera notifié par email.
      </span>
      <span v-if="['younger_than_16'].includes(form.reason)" class="text-sm text-gray-600">
        Toutes les participations du bénévole seront annulées avec comme motif "Utilisateur ayant moins de 16 ans". Le bénévole sera notifié par email.
      </span>
      <span v-if="['inappropriate_behavior'].includes(form.reason)" class="text-sm text-gray-600">
        Toutes les participations en cours du bénévole seront annulées avec comme motif "Utilisateur ayant un comportement inadapté". Le bénévole sera notifié par email.
      </span>
    </div>
  </form>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  props: {},
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
