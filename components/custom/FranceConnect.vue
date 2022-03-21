<template>
  <div>
    <button
      class="block m-auto cursor-pointer"
      @click="handleClickFranceConnect"
    >
      <img
        class="hover:opacity-75 mx-auto w-auto h-16 mb-1 shadow-lg rounded-lg overflow-hidden transform transition"
        :src="
          isDark
            ? '/images/france-connect/franceconnect-blue.svg'
            : '/images/france-connect/franceconnect.svg'
        "
        alt="Soumettre"
      >
    </button>
    <a
      href="https://franceconnect.gouv.fr/"
      target="_blank"
      rel="noopener"
      class="text-sm"
      :class="
        isDark
          ? 'text-[#1e429f] hover:text-[#070191]'
          : 'text-[#c3ddfd] hover:text-white'
      "
    >Qu'est-ce que FranceConnect ?</a>
  </div>
</template>

<script>
export default {
  props: {
    isDark: {
      type: Boolean,
      default: false
    }
  },
  async created () {
    if (this.$route.query.state && this.$route.query.code) {
      this.$emit('loading', true)
      const response = await this.$axios.get('/franceconnect/login-callback', {
        state: this.$route.query.state,
        code: this.$route.query.code
      })
      if (response.data) {
        this.$cookies.set('access-token', response.data.accessToken, {
          maxAge: 3600 * 24 * 365,
          path: '/',
          secure: true
        })
        this.$store.commit('auth/setAccessToken', response.data.accessToken)
        this.$store.dispatch('auth/fetchUser').then(() => {
          if (this.$store.getters.noRole === false) {
            this.$router.push('/dashboard')
          } else {
            this.$router.push('/missions-benevolat')
          }
        })
      }
    }
  },
  methods: {
    async handleClickFranceConnect () {
      const response = await this.$axios.get('/franceconnect/login-authorize')
      if (response.data) {
        console.log('handleClickFranceConnect', response.data)
        window.location.href = response.data
      }
    }
  }
}
</script>
