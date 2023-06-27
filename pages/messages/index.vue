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
    const { data: conversation } = await $axios.get('/user/last-read-conversation')
    if (conversation) {
      redirect(`/messages/${conversation.id}`)
    }
    return conversation
  },
  data () {
    return {}
  },
  computed: {}
}
</script>
