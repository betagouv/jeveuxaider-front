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
              <div v-for="(menuCategory, key) in menu" :key="key" class="flex flex-col space-y-4 text-sm font-medium">
                <div class="text-lg font-bold text-gray-700">
                  {{ menuCategory.category }}
                </div>
                <nuxt-link v-for="link in menuCategory.components" :key="link.name" :to="link.href" class="hover:text-jva-blue-700 text-gray-500 focus:outline-none focus:underline">
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
      menu: [
        {
          category: 'Theme',
          components: [
            { name: 'Texts', href: '/components/theme/texts' },
            { name: 'Links', href: '/components/theme/links' },
            { name: 'Colors', href: '/components/theme/colors' }
          ]
        },
        {
          category: 'Layouts',
          components: [
            { name: 'Boxs', href: '/components/layout/boxs' },
            { name: 'Containers', href: '/components/layout/containers' }
          ]
        },
        {
          category: 'Forms',
          components: [
            { name: 'Buttons', href: '/components/forms/buttons' },
            { name: 'Inputs', href: '/components/forms/inputs' },
            { name: 'Selects', href: '/components/forms/selects' },
            { name: 'Forms', href: '/components/forms/forms' }
          ]
        },
        {
          category: 'Data display',
          components: [
            { name: 'Badge', href: '/components/data-display/badge' },
            { name: 'Card', href: '/components/data-display/card' },
            { name: 'List', href: '/components/data-display/list' }
          ]
        },
        {
          category: 'Navigation',
          components: [
            { name: 'Breadcrumb', href: '/components/navigation/breadcrumb' },
            { name: 'Pagination', href: '/components/navigation/pagination' },
            { name: 'Tabs', href: '/components/navigation/tabs' },
            { name: 'Steps', href: '/components/navigation/steps' }
          ]
        },
        // {
        //   category: 'Overlay',
        //   components: [
        //     { name: 'Cards', href: '/components/advanced/cards' }
        //   ]
        // },
        {
          category: 'Other',
          components: [
            { name: 'Others', href: '/components/base/others' }
          ]
        }
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
