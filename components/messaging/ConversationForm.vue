<template>
  <div class="py-1 px-1 lg:px-6 lg:py-4 border-t">
    <form
      id="form-message"
      novalidate
      class="flex gap-2 lg:gap-4 items-end justify-center"
      @submit.prevent="handleSubmitt"
    >
      <BaseTextareaAutosize
        v-model="message"
        placeholder="Écrivez un message"
        rows="1"
        :max-height="120"
        class="m-auto w-full !outline-none leading-tight border-0 custom-scrollbar"
      />

      <DsfrButton
        class="flex-none hidden lg:inline-flex"
        icon="RiSendPlaneFill"
        :loading="loading"
        @click.native="handleSubmit"
      >
        Envoyer
      </DsfrButton>

      <DsfrButton
        class="flex-none lg:hidden"
        icon="RiSendPlaneFill"
        icon-only
        :loading="loading"
        @click.native="handleSubmit"
      />

      <ButtonSelectMessageTemplate
        v-if="canUseMessageTemplate"
        @selected="handleMessageTemplateSelected"
      />
    </form>
  </div>
</template>

<script>
import ButtonSelectMessageTemplate from '@/components/custom/ButtonSelectMessageTemplate.vue'

export default defineNuxtComponent({
  emits: ['submit'],
  components: {
    ButtonSelectMessageTemplate,
  },
  data() {
    return {
      loading: false,
      message: '',
    }
  },
  computed: {
    canUseMessageTemplate() {
      if (this.$stores.auth.contextRole === 'volontaire') {
        return false
      }
      return this.conversation.conversable_type == 'App\\Models\\Participation'
    },
    conversation() {
      return this.$stores.messaging.activeConversation
    },
  },
  methods: {
    reset() {
      this.message = ''
    },
    handleMessageTemplateSelected(payload) {
      this.message = payload
    },
    handleSubmitt() {
      console.log('formulaire soumis')
    },
    handleSubmit() {
      if (this.loading) {
        return
      }
      if (this.message.trim().length) {
        this.loading = true
        useApiFetch(`/conversations/${this.conversation.id}/messages`, {
          method: 'POST',
          body: {
            content: this.message,
          },
        })
          .then((response) => {
            this.$emit('submit', response.data)
            this.reset()
          })
          .catch(() => {})
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
})
</script>
