<template>
  <div class="">
    <div class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto py-16 sm:py-24">
        <div class="sm:mt-8">
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-12">
            <div class="space-y-12">
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
              <div class="flex flex-col space-y-4 text-sm font-medium">
                <div class="text-lg font-bold text-gray-700">
                  Base components
                </div>
                <nuxt-link v-for="link in baseLinks" :key="link.name" :to="link.href" class="hover:text-jva-blue-700 text-gray-500 focus:outline-none focus:underline">
                  {{ link.name }}
                </nuxt-link>
              </div>
              <div class="flex flex-col space-y-4 text-sm font-medium">
                <div class="text-lg font-bold text-gray-700">
                  Advanced
                </div>
                <nuxt-link v-for="link in advancedLinks" :key="link.name" :to="link.href" class="hover:text-jva-blue-700 text-gray-500 focus:outline-none focus:underline">
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
      baseLinks: [
        { name: 'Texts', href: '/components/base/texts' },
        { name: 'Boxs', href: '/components/base/boxs' },
        { name: 'Buttons', href: '/components/base/buttons' },
        { name: 'Colors', href: '/components/base/colors' },
        { name: 'Inputs', href: '/components/base/inputs' },
        { name: 'Selects', href: '/components/base/selects' },
        { name: 'Tabs', href: '/components/base/tabs' },
        { name: 'Others', href: '/components/base/others' }
      ],
      advancedLinks: [
        { name: 'Forms', href: '/components/advanced/forms' },
        { name: 'Cards', href: '/components/advanced/cards' }
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
