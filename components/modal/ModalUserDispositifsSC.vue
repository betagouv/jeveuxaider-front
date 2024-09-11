<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        title="Service Civique"
        :prevent-click-outside="true"
        @close="
          () => {
            errors = {}
            form = { ...this.initialForm }
            $emit('close')
          }
        "
      >
        <DsfrFormControl
          label="Date de début de votre Service Civique"
          html-for="service_civique_completion_date"
          :error="errors.service_civique_completion_date"
          required
        >
          <DsfrInput
            v-model="form.service_civique_completion_date"
            required
            type="date"
            name="service_civique_completion_date"
            @blur="validate('service_civique_completion_date')"
          />
        </DsfrFormControl>
        <template #footer>
          <DsfrButton @click="onContinue"> Continuer </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { object, date } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  emits: ['close', 'continue'],
  components: {},
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    initialForm: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: { ...this.initialForm },
      formSchema: object({
        service_civique_completion_date: date()
          .typeError('La date indiquée est invalide')
          .nullable()
          .transform((curr, orig) => (orig === '' ? null : curr))
          .when('service_civique', {
            is: true,
            then: (schema) => schema.required('La date de début de service civique est incorrecte'),
          }),
      }),
    }
  },
  watch: {
    initialForm(newVal) {
      this.form = { ...newVal }
    },
  },
  methods: {
    async onContinue() {
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          this.$emit('continue', {
            service_civique: true,
            service_civique_completion_date: this.form.service_civique_completion_date,
          })
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
    },
  },
})
</script>
