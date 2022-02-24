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
          { name: 'Missions prioritaires', href: '/admin/contenus/missions-prioritaires' },
          { name: 'Thématiques', href: '/admin/contenus/thematiques' },
          { name: "Domaines d'action", href: '/admin/contenus/domaines' },
          { name: 'Modèles de mission', href: '/admin/contenus/modeles-mission' },
          { name: 'Territoires', href: '/admin/contenus/territoires' },
          { name: 'Reseaux', href: '/admin/contenus/reseaux' },
          { name: 'Témoignages', href: '/admin/contenus/testimonials' },
          { name: 'Ressources', href: '/admin/contenus/ressources' }
        ]
      },
      {
        name: 'taxonomies',
        label: 'Taxonomies',
        links: [
          { name: 'Compétences', href: '/admin/taxonomies/skills' },
          { name: 'Tags', href: '/admin/taxonomies/tags' }
        ]
      },
      {
        name: 'settings',
        label: 'Paramètres',
        links: [
          { name: 'Général', href: '/admin/settings/general' },
          { name: 'Emails', href: '/admin/settings/emails' },
          { name: 'Messages', href: '/admin/settings/messages' }
        ]
      },
      {
        name: 'other',
        label: 'Autre',
        links: [
          { name: 'Invitations', href: '/admin/other/invitations' }
        ]
      }
      // {
      //   name: 'scripts',
      //   label: 'Scripts',
      //   links: [
      //     { name: 'Migrer les missions', href: '/admin/scripts/migrate-organisation-missions' }
      //   ]
      // }
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
