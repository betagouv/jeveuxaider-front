<template>
  <portal to="body-end">
    <Modal
      v-scroll-lock="isOpen"
      :is-open="isOpen"
      theme="warning"
      title="Décliner la participation"
      :prevent-click-outside="true"
      @close="$emit('cancel')"
    >
      <div class="space-y-4">
        <div>
          Vous êtes sur le point de décliner la participation de {{ participation.profile.full_name }}.
        </div>

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
          <InformationCircleIcon width="16" height="16" class="mb-1 inline mr-1 text-jva-blue-500" />
          <span class="text-sm text-gray-600">
            En validant ce choix, le statut de la mission sera automatiquement
            mis à jour. Le recrutement de nouveaux bénévoles sera clos.
          </span>
        </div>

        <FormControl
          html-for="content"
          label="Précisions"
        >
          <Textarea v-model="form.content" name="content" placeholder="Vous pouvez compléter par un commentaire si vous le souhaitez. À noter : celui-ci pourra être consulté par le bénévole" />
        </FormControl>
      </div>

      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Annuler
        </Button>
        <Button @click.native="handleSubmit">
          Confirmer
        </Button>
      </template>
    </Modal>
  </portal>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default {
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    participation: {
      type: Object,
      required: true
    }
  },
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
