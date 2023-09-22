<template>
  <div>
    <button class="block m-auto cursor-pointer" @click="handleClickFranceConnect">
      <img
        class="hover:opacity-75 mx-auto w-auto h-16 mb-1 shadow-lg rounded-lg overflow-hidden transform transition"
        :src="
          isDark
            ? '/images/france-connect/franceconnect-blue.svg'
            : '/images/france-connect/franceconnect.svg'
        "
        alt="S'identifier avec FranceConnect"
      />
    </button>
    <DsfrLink
      to="https://franceconnect.gouv.fr/"
      :is-external="true"
      rel="noopener"
      class="text-sm"
      :class="
        isDark ? 'text-[#1e429f]' : 'text-[#c3ddfd] active:!text-jva-blue-500 active:!bg-[#ECECFE]'
      "
    >
      Qu'est-ce que FranceConnect ?
    </DsfrLink>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    isDark: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    if (this.$route.query.state && this.$route.query.code) {
      this.$emit('loading', true)
      const data = await apiFetch('/franceconnect/login-callback', {
        params: {
          state: this.$route.query.state,
          code: this.$route.query.code,
        },
      })

      if (data) {
        let cookieAccessToken = useCookie('access-token', {
          maxAge: 3600 * 24 * 365,
          path: '/',
          secure: document.location.hostname !== 'localhost', // true doesn't work on localhost and safari
        })
        cookieAccessToken.value = data.accessToken

        this.$gtm.trackEvent({ event: 'user-login' })

        await nextTick() // wait for cookie
        await this.$stores.auth.fetchUser()
        navigateTo('/')
      }
    }
  },
  methods: {
    async handleClickFranceConnect() {
      const data = await apiFetch('/franceconnect/login-authorize')
      if (data) {
        navigateTo(data, { external: true })
      }
    },
  },
})
</script>
