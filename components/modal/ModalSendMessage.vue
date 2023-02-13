<template>
  <portal to="body-end">
    <Modal
      v-scroll-lock="isOpen"
      :is-open="isOpen"
      theme="message"
      :title="`À ${toUser.full_name}`"
      :prevent-click-outside="true"
      @close="$emit('cancel')"
    >
      <div class="space-y-4">
        <FormControl
          html-for="message"
          label="Message"
        >
          <Textarea v-model="form.message" name="message" />
        </FormControl>
      </div>

      <template #footer>
        <Button class="mr-3" variant="white" @click.native="$emit('cancel')">
          Annuler
        </Button>
        <Button :loading="loading" @click.native="handleSubmit">
          Envoyer
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
    toUser: {
      type: Object,
      required: true
    },
    conversableId: {
      type: Number,
      required: true
    },
    conversableType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      form: {},
      formSchema: object({
        message: string().nullable().required('Votre message est vide')
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
        .then(async () => {
          const { data: conversation } = await this.$axios.post('/conversations',
            {
              ...this.form,
              toUser: this.toUser.user_id,
              conversableId: this.conversableId,
              conversableType: this.conversableType
            }
          )
          console.log(conversation)
          this.$router.push(`/messages-old/${conversation.id}`)
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
