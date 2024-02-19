<template>
  <ClientOnly>
    <Teleport to="#teleport-body-end">
      <BaseModal
        :is-open="isOpen"
        icon="RiMessage3Line"
        :title="`À ${toUser.full_name}`"
        :prevent-click-outside="true"
        @close="handleCancel()"
      >
        <div class="space-y-4">
          <template v-if="canUseMessageTemplate">
            <BaseFormControl html-for="message-template" label="Modèle de message">
              <SelectAdvancedMessageTemplate
                :recipient-user="toUser"
                :conversable-type="conversableType"
                :conversable="conversable"
                @selected="handleMessageTemplateSelected"
                @clear="form.message = ''"
              />
              <BaseFormHelperText class="mt-1">
                Gérez vos modèles de message depuis
                <DsfrLink to="/messages/modeles">votre espace dédié</DsfrLink>
              </BaseFormHelperText>
            </BaseFormControl>
          </template>
          <BaseFormControl html-for="message" label="Message">
            <BaseTextarea v-model="form.message" name="message" />
          </BaseFormControl>
        </div>

        <template #footer>
          <DsfrButton type="secondary" @click="handleCancel"> Annuler </DsfrButton>
          <DsfrButton :loading="loading" @click="handleSubmit"> Envoyer </DsfrButton>
        </template>
      </BaseModal>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { string, object } from 'yup'
import FormErrors from '@/mixins/form/errors'
import SelectAdvancedMessageTemplate from '@/components/custom/SelectAdvancedMessageTemplate.vue'

export default defineNuxtComponent({
  mixins: [FormErrors],
  components: {
    SelectAdvancedMessageTemplate,
  },
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
    conversable: {
      type: Object,
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
  created() {
    this.$stores.messaging.fetchMessageTemplates()
  },
  computed: {
    canUseMessageTemplate() {
      return ['referent', 'admin'].includes(this.$stores.auth.contextRole)
    },
  },
  methods: {
    handleMessageTemplateSelected(payload) {
      this.form.message = payload
    },
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
          // console.log(conversation)
          this.$router.push(`/messages/${conversation.id}`)
        })
        .catch((errors) => {
          this.setErrors(errors)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleCancel() {
      this.form.message = ''
      this.$emit('cancel')
    },
  },
})
</script>
