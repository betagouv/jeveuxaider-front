<template>
  <div class="space-y-12">
    <div v-for="item,i in items" :key="i">
      <h3 id="projects-headline" class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {{ item.label }}
      </h3>
      <div class="mt-1 space-y-1" :aria-labelledby="item.name">
        <nuxt-link v-for="link, index in item.links" :key="index" :to="link.href" class="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
          <span class="truncate">
            {{ link.name }}
          </span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [{
        name: 'contenus',
        label: 'Contenus',
        links: [
          { name: 'Témoignages', href: '/admin/contenus/testimonials' },
          { name: 'Ressources', href: '/admin/ressources' }
        ]
      }
      ]
    }
  }
}
</script>

<style scoped>
a.nuxt-link-exact-active {
  @apply text-jva-blue-500;
}
</style>
