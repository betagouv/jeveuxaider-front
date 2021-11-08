<template>
  <div class="flex flex-col items-center justify-center bg-blue-50 h-full px-4 py-8 text-center">
    <template v-if="error.statusCode == 404">
      <Heading as="h1" :level="1" class="text-jva-blue-primary">
        Oups, cette page est introuvable
      </Heading>

      <p class="my-8 text-jva-black-primary">
        À priori cette page n'existe plus. <br class="hidden sm:block">
        Ou pire, elle peut ne jamais avoir existée…
      </p>
    </template>

    <template v-else-if="error.statusCode == 403">
      <Heading as="h1" :level="1" class="text-jva-blue-primary">
        Oups, ce contenu ne vous est pas destiné…
      </Heading>

      <p class="my-8 text-jva-black-primary">
        À priori vous n'êtes pas autorisé à accéder à cette page.
      </p>
    </template>

    <template v-else>
      <Heading as="h1" :level="1" class="text-jva-blue-primary">
        Erreur {{ error.statusCode }}
      </Heading>

      <p class="my-8 text-jva-black-primary">
        {{ error.message }}
      </p>
    </template>

    <div class="flex flex-col items-center">
      <nuxt-link to="/">
        <Button>Revenir en lieu sûr</Button>
      </nuxt-link>

      <a
        class="mt-4 text-jva-blue-light cursor-pointer underline hover:text-jva-blue-primary"
        @click.prevent="back()"
      >Page précédente</a>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error',
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
