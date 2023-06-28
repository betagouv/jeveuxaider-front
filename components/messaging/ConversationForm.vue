<template>
  <div class="px-4 py-2 lg:px-6 lg:py-4">
    <form id="form-message" novalidate class="flex gap-4 items-end justify-center">
      <client-only>
        <TextareaAutosize
          v-model="message"
          placeholder="Écrivez un message"
          rows="1"
          :max-height="120"
          class="m-auto w-full !outline-none leading-tight border-0 custom-scrollbar truncate"
        />
      </client-only>
      <Button class="flex-none hidden lg:inline-flex" icon="RiSendPlaneFill" :loading="loading" @click.native="handleSubmit">
        Envoyer
      </Button>

      <Button class="flex-none lg:hidden" icon="RiSendPlaneFill" icon-only :loading="loading" @click.native="handleSubmit" />
    </form>
  </div>
</template>

<script>
import Button from '@/components/dsfr/Button.vue'

export default {
  components: {
    Button
  },
  data () {
    return {
      loading: false,
      message: ''
    }
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging/activeConversation']
    }
  },
  methods: {
    reset () {
      this.message = ''
    },
    handleSubmit () {
      if (this.loading) {
        return
      }
      if (this.message.trim().length) {
        this.loading = true
        this.$axios.post(`/conversations/${this.conversation.id}/messages`, {
          content: this.message
        }).then((response) => {
          this.$emit('submit', response.data)
          this.reset()
        }).catch(() => {}).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style>

</style>
