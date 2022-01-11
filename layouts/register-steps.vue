<template>
  <div class="w-full lg:min-h-screen flex flex-col lg:flex-row">
    <div class="bg-white lg:w-1/3">
      <div class="p-6 lg:p-12 border-b border-cool-gray-100">
        <nuxt-link to="/">
          <img
            src="@/assets/images/jeveuxaider-logo.svg"
            alt="Bénévolat je veux aider"
            title="Bénévolat association"
            class="mx-auto"
            width="243px"
            height="39px"
          >
        </nuxt-link>
      </div>
      <div class="p-6 lg:p-12">
        <client-only>
          <portal-target name="sidebar" />
        </client-only>
      </div>
    </div>
    <div
      id="step-container"
      class="lg:w-2/3 relative bg-[#081992]"
    >
      <img
        class="z-1 object-cover absolute h-screen lg:h-auto w-full max-h-full object-top"
        alt="JeVeuxAider"
        srcset="/images/bg-jva.webp, /images/bg-jva@2x.webp 2x, /images/bg-jva.jpg"
        data-not-lazy
      >

      <div class="p-6 lg:p-12">
        <Nuxt class="" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RegisterStepsLayout',
  middleware: 'authenticated',
  head: {
    bodyAttrs: {
      class: 'full-height-layout'
    }
  },
  methods: {
    handleLogout () {
      this.$router.push('/')
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style lang="postcss" scoped>
.aside {
  @screen lg {
    position: fixed;
    max-width: 390px;
    min-height: 100vh;
  }
}

.main-content {
  @screen lg {
    margin-left: 390px;
  }
}

.logo {
  width: 150px;
  @screen lg {
    max-width: 230px;
  }
}
</style>
