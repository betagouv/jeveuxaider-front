<template>
  <form id="form-message" novalidate class="bg-green-200" @submit.prevent="handleSubmit">
    <input v-model="message" type="text" placeholder="Écrivez votre message ici">
    <button type="submit" form-id="form-message">
      Envoyer
    </button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  computed: {
    conversation () {
      return this.$store.getters['messaging2/activeConversation']
    }
  },
  methods: {
    async handleSubmit () {
      if (this.message.trim().length) {
        await this.$axios.post(`/conversationsv2/${this.conversation.id}/messages`, {
          content: this.message
        }).catch(() => {})

        await this.$store.dispatch('messaging2/refreshConversationInConversations', this.conversation.id)
      }
    }
  }
}
</script>

<style>

</style>
