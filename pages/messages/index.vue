<template>
  <div class="hidden lg:block">
    <div />
  </div>
</template>

<script>

export default {
  components: {},
  layout: 'messages',
  async asyncData ({ $axios, params, error, store, redirect }) {
    if (!store.state.auth.isImpersonate) {
      const { data: conversation } = await $axios.get('/user/last-read-conversation')
      if (conversation) {
        redirect(`/messages/${conversation.id}`)
      }
    }
  },
  data () {
    return {}
  },
  computed: {}
}
</script>
