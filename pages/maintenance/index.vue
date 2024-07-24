<template>
  <div class="py-12 flex flex-col bg-white h-screen">
    <main
      class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div class="py-16">
        <div class="text-center">
          <p class="text-sm font-semibold text-jva-blue-600 uppercase tracking-wide">Maintenance</p>
          <BaseHeading as="h1" :level="1"> Le plateforme est en maintenance </BaseHeading>
          <p class="mt-2 text-base text-gray-500">
            Nous procédons à quelques ajustements. Merci de revenir dans quelques instants...
          </p>
          <div v-if="!$stores.auth.isLogged" class="mt-6">
            <nuxt-link no-prefetch to="/maintenance/admin">
              Accès administrateurs<span aria-hidden="true"> &rarr;</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      layout: 'empty',
    })
  },
}
</script>

<style></style>
