<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        v-scroll-lock="isOpen"
        :is-open="isOpen"
        theme="message"
        :title="`À ${toUser.full_name}`"
        :prevent-click-outside="true"
        @close="$emit('cancel')"
      >
        <div class="space-y-4">
          <BaseFormControl html-for="message" label="Message">
            <BaseTextarea v-model="form.message" name="message" />
          </BaseFormControl>
        </div>

        <template #footer>
          <BaseButton class="mr-3" variant="white" @click.native="$emit('cancel')">
            Annuler
          </BaseButton>
          <BaseButton :loading="loading" @click.native="handleSubmit"> Envoyer </BaseButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'

export default defineNuxtComponent({
  mixins: [FormErrors],
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    toUser: {
      type: Object,
      required: true,
    },
    conversableId: {
      type: Number,
      required: true,
    },
    conversableType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      form: {},
      formSchema: object({
        message: string().nullable().required('Votre message est vide'),
      }),
    }
  },
  methods: {
    async handleSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      await this.formSchema
        .validate(this.form, { abortEarly: false })
        .then(async () => {
          const conversation = await apiFetch('/conversations', {
            method: 'POST',
            body: {
              ...this.form,
              toUser: this.toUser.user_id,
              conversableId: this.conversableId,
              conversableType: this.conversableType,
            },
          })
          console.log(conversation)
          this.$router.push(`/messages/${conversation.id}`)
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
