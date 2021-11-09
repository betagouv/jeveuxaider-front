<template>
  <div class="">
    <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto py-16 sm:py-24">
        <div class="sm:mt-8">
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-12">
            <div class="">
              <div class="mb-12">
                <p class="text-xs font-semibold text-jva-blue-500 uppercase tracking-wide">
                  JeVeuxAider.gouv.fr
                </p>
                <h1 class="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
                  Design System
                </h1>
                <p class="mt-2 text-xs text-gray-500">
                  Nuxjs 2 + Vue2 + TailwindCSS
                </p>
              </div>
              <div class="flex flex-col space-y-4 text-sm font-medium">
                <nuxt-link to="/components" class="hover:text-jva-blue-600 focus:outline-none focus:underline">
                  Texts
                </nuxt-link>
                <nuxt-link to="/components/colors" class="hover:text-jva-blue-600 focus:outline-none focus:underline">
                  Colors
                </nuxt-link>
                <nuxt-link to="/components/buttons" class="hover:text-jva-blue-600 focus:outline-none focus:underline">
                  Buttons
                </nuxt-link>
                <nuxt-link to="/components/forms" class="hover:text-jva-blue-600 focus:outline-none focus:underline">
                  Forms
                </nuxt-link>
                <nuxt-link to="/components/forms-advanced" class="hover:text-jva-blue-600 focus:outline-none focus:underline">
                  Forms advanced
                </nuxt-link>
              </div>
            </div>
            <main class="sm:col-span-3">
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
  @apply text-jva-blue-500;
}
</style>
