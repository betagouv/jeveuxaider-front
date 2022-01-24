<template>
  <div id="main-error" class="flex flex-col items-center justify-center bg-gray-50 px-4 py-8 text-center">
    <template v-if="error.statusCode == 404">
      <Heading as="h1" :level="1" class="jva-blue">
        Oups, cette page est introuvable
      </Heading>

      <p class="my-8 text-gray-900">
        À priori cette page n'existe plus. <br class="hidden sm:block">
        Ou pire, elle peut ne jamais avoir existée…
      </p>
    </template>

    <template v-else-if="error.statusCode == 403">
      <Heading as="h1" :level="1">
        Oups, ce contenu ne vous est pas destiné…
      </Heading>

      <p class="my-8 text-gray-900">
        À priori vous n'êtes pas autorisé à accéder à cette page.
      </p>
    </template>

    <template v-else>
      <Heading as="h1" :level="1">
        Erreur {{ error.statusCode }}
      </Heading>

      <p class="my-8 text-gray-900">
        {{ error.message }}
      </p>
    </template>

    <div class="flex flex-col items-center">
      <nuxt-link to="/">
        <Button>Revenir en lieu sûr</Button>
      </nuxt-link>

      <Link class="mt-4" @click.native="back()">
        Page précédente ›
      </Link>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },

  methods: {
    back () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  #main-error {
    min-height: 700px
  }
</style>
