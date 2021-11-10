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
                <nuxt-link v-for="link in links" :key="link.name" :to="link.href" class="hover:text-jva-blue-600 focus:outline-none focus:underline">
                  {{ link.name }}
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

<script>
export default {
  data () {
    return {
      links: [
        { name: 'Texts', href: '/components' },
        { name: 'Colors', href: '/components/colors' },
        { name: 'Buttons', href: '/components/buttons' },
        { name: 'Badges', href: '/components/badges' },
        { name: 'Forms', href: '/components/forms' },
        { name: 'Boxs', href: '/components/boxs' },
        { name: 'Advanced', href: '/components/advanced' }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.nuxt-link-exact-active {
  @apply text-jva-blue-500;
}
</style>
