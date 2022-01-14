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
          { name: "Domaines d'actions", href: '/admin/contenus/domaines-actions' },
          { name: 'Modèles de mission', href: '/admin/contenus/modeles-mission' },
          { name: 'Départements', href: '/admin/contenus/departements' },
          { name: 'Compétences', href: '/admin/contenus/competences' },
          { name: 'Pages', href: '/admin/contenus/pages' },
          { name: 'Releases', href: '/admin/contenus/releases' }
        ]
      },
      {
        name: 'settings',
        label: 'Paramètres',
        links: [
          { name: 'Édito', href: '/admin/settings/edito' },
          { name: 'Messages', href: '/admin/settings/messages' }
        ]
      },
      {
        name: 'scripts',
        label: 'Scripts',
        links: [
          { name: 'Algolia', href: '/admin/scripts/algolia' },
          { name: 'Migrer les missions', href: '/admin/scripts/migrate-organisation-missions' }
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
