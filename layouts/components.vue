<template>
  <div class="">
    <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto py-16 sm:py-24">
        <div class="text-center">
          <p class="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
            JeVeuxAider.gouv.fr
          </p>
          <h1 class="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Components
          </h1>
          <p class="mt-2 text-lg text-gray-500">
            Refonte design
          </p>
        </div>
        <div class="mt-12">
          <div class="flex space-x-8">
            <div class="w-1/4">
              <div class="flex flex-col space-y-2">
                <nuxt-link to="/components" class="hover:text-indigo-400">
                  Heading
                </nuxt-link>
                <nuxt-link to="/components/buttons" class="hover:text-indigo-400">
                  Buttons
                </nuxt-link>
                <nuxt-link to="/components/forms" class="hover:text-indigo-400">
                  Forms
                </nuxt-link>
              </div>
            </div>
            <main class="w-3/4">
              <Nuxt />
            </main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.nuxt-link-exact-active {
  @apply text-indigo-500;
}
</style>
