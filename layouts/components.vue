<template>
  <div class="">
    <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto py-16 sm:py-24">
        <div class="mt-12">
          <div class="flex space-x-8">
            <div class="w-1/4 space-y-12">
              <div class="">
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
              <div class="flex flex-col space-y-2 text-sm font-medium">
                <nuxt-link to="/components" class="hover:text-jva-blue-600">
                  Texts
                </nuxt-link>
                <nuxt-link to="/components/colors" class="hover:text-jva-blue-600">
                  Colors
                </nuxt-link>
                <nuxt-link to="/components/buttons" class="hover:text-jva-blue-600">
                  Buttons
                </nuxt-link>
                <nuxt-link to="/components/forms" class="hover:text-jva-blue-600">
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
  @apply text-jva-blue-500;
}
</style>
