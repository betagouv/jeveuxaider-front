<template>
  <div
    id="main-error"
    class="flex flex-col items-center justify-center bg-gray-50 px-4 py-8 text-center"
  >
    <template v-if="error.statusCode == 404">
      <BaseHeading as="h1" :level="1" class="jva-blue">
        Oups, cette page est introuvable
      </BaseHeading>

      <p
        v-if="error.message && error.message != 'Request failed with status code 404'"
        class="my-8 text-gray-900"
      >
        {{ error.message }}
      </p>

      <p v-else class="my-8 text-gray-900">
        À priori cette page n'existe plus. <br class="hidden sm:block" />
        Ou pire, elle peut ne jamais avoir existée…
      </p>
    </template>

    <template v-else-if="error.statusCode == 403">
      <BaseHeading as="h1" :level="1"> Oups, ce contenu ne vous est pas destiné… </BaseHeading>

      <p class="my-8 text-gray-900">À priori vous n'êtes pas autorisé à accéder à cette page.</p>
    </template>

    <template v-else>
      <BaseHeading as="h1" :level="1"> Erreur {{ error.statusCode }} </BaseHeading>

      <p class="my-8 text-gray-900">
        {{ error.message }}
      </p>
    </template>

    <div class="flex flex-col items-center">
      <nuxt-link no-prefetch to="/">
        <BaseButton>Revenir en lieu sûr</BaseButton>
      </nuxt-link>

      <BaseLink class="mt-4" to="/"> Page précédente › </BaseLink>
    </div>

    <div id="teleport-body-end"></div>
  </div>
</template>

<script setup>
defineProps({
  error: Object,
})

useHead({
  bodyAttrs: {
    class: 'full-height-layout',
  },
})
</script>
