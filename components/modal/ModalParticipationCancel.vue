<template>
  <portal to="body-end">
    <Modal
      v-scroll-lock="isOpen"
      :is-open="isOpen"
      theme="warning"
      title="Annuler ma participation"
      :prevent-click-outside="true"
      @close="$emit('cancel')"
    >
      <div class="space-y-4">
        <div>
          Vous êtes sur le point d'annuler votre participation à la mission.
        </div>

        <FormControl
          html-for="reason"
          label="Raison"
          required
        >
          <RadioGroup v-model="form.reason" :options="$labels.participation_canceled_by_benevole_reasons.filter((term) => term.key != 'user_unsubscribed')" />
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
          Confirmer l'annulation
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
