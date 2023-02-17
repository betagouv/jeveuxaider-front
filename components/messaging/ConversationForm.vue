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
        const response = await this.$axios.post(`/conversations/${this.conversation.id}/messages`, {
          content: this.message
        }).catch(() => {})
        this.$emit('submitted', response.data)
      }
    }
  }
}
</script>

<style>

</style>
