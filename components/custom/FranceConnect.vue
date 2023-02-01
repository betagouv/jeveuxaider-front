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
        alt="S'identifier avec FranceConnect"
      >
    </button>
    <Link
      to="https://franceconnect.gouv.fr/"
      :is-external="true"
      rel="noopener"
      class="text-sm"
      :class="
        isDark
          ? 'text-[#1e429f]'
          : 'text-[#c3ddfd] active:!text-jva-blue-500 active:!bg-[#ECECFE]'
      "
    >
      Qu'est-ce que FranceConnect ?
    </Link>
  </div>
</template>

<script>
import Link from '@/components/dsfr/Link.vue'

export default {
  components: {
    Link
  },
  props: {
    isDark: {
      type: Boolean,
      default: false
    }
  },
  async mounted () {
    if (this.$route.query.state && this.$route.query.code) {
      this.$emit('loading', true)
      const response = await this.$axios.get('/franceconnect/login-callback', {
        params: {
          state: this.$route.query.state,
          code: this.$route.query.code
        }
      })
      if (response.data) {
        this.$cookies.set('access-token', response.data.accessToken, {
          maxAge: 3600 * 24 * 365,
          path: '/',
          // secure true does not work on http://localhost and safari
          secure: document?.domain !== 'localhost'
        })
        await this.$gtm.push({ event: 'user-login' })
        this.$store.dispatch('auth/fetchUser').then(() => {
          if (this.$store.getters.noRole === false) {
            this.$router.push('/dashboard')
          } else {
            this.$router.push('/profile')
          }
        })
      }
    }
  },
  methods: {
    async handleClickFranceConnect () {
      const response = await this.$axios.get('/franceconnect/login-authorize')
      if (response.data) {
        window.location.href = response.data
      }
    }
  }
}
</script>
