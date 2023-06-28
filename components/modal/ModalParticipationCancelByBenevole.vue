<template>
  <portal to="body-end">
    <Modal
      v-scroll-lock="isOpen"
      :is-open="isOpen"
      theme="warning"
      icon="RiErrorWarningLine"
      title="Annulez votre participation"
      :prevent-click-outside="true"
      @close="$emit('cancel')"
    >
      <div class="space-y-4">
        <div>
          Vous êtes sur le point d'annuler votre participation à la mission <span class="font-semibold">{{ participation.mission.name }}</span>. Le responsable en sera notifié par email.
        </div>

        <FormControl
          html-for="reason"
          label="Raison"
          required
        >
          <RadioGroup v-model="form.reason" :options="$labels.participation_canceled_by_benevole_reasons" />
        </FormControl>

        <FormControl
          html-for="content"
          label="Précisions"
        >
          <Textarea v-model="form.content" name="content" placeholder="Plus d'explications si nécéssaire" />
        </FormControl>
      </div>

      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Retour
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
