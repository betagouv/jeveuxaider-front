<template>
  <div class="h-full">
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
    <client-only>
      <portal-target name="body-end" />
    </client-only>
  </div>
</template>

<script>
export default {
  middleware: 'admin',
  data () {
    return {
      menu: [
        {
          category: 'Theme',
          components: [
            { name: 'Texts', href: '/design-system/theme/texts' },
            { name: 'Links', href: '/design-system/theme/links' },
            { name: 'Colors', href: '/design-system/theme/colors' }
          ]
        },
        {
          category: 'Layouts',
          components: [
            { name: 'Boxs', href: '/design-system/layout/boxs' },
            { name: 'Containers', href: '/design-system/layout/containers' }
          ]
        },
        {
          category: 'Forms',
          components: [
            { name: 'Buttons', href: '/design-system/forms/buttons' },
            { name: 'Inputs', href: '/design-system/forms/inputs' },
            { name: 'Selects', href: '/design-system/forms/selects' },
            { name: 'Radio', href: '/design-system/forms/radio' },
            { name: 'Toggles', href: '/design-system/forms/toggles' },
            { name: 'Textarea', href: '/design-system/forms/textarea' },
            { name: 'Forms', href: '/design-system/forms/forms' }
          ]
        },
        {
          category: 'Data display',
          components: [
            { name: 'Badge', href: '/design-system/data-display/badge' },
            { name: 'Card', href: '/design-system/data-display/card' },
            { name: 'List', href: '/design-system/data-display/list' }
          ]
        },
        {
          category: 'Navigation',
          components: [
            { name: 'Breadcrumb', href: '/design-system/navigation/breadcrumb' },
            { name: 'Pagination', href: '/design-system/navigation/pagination' },
            { name: 'Tabs', href: '/design-system/navigation/tabs' },
            { name: 'Steps', href: '/design-system/navigation/steps' }
          ]
        },
        {
          category: 'Overlay',
          components: [
            { name: 'Modal', href: '/design-system/overlay/modal' },
            { name: 'AlertDialog', href: '/design-system/overlay/alert-dialog' }
          ]
        },
        {
          category: 'Others',
          components: [
            { name: 'Blocks', href: '/design-system/others/blocks' }
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
