<template>
  <div>
    <div class="sm:hidden">
      <label for="menu" class="sr-only">Menu</label>
      <SelectAdvanced
        id="menu"
        v-model="selectedItem"
        name="menu"
        attribute-key="to"
        :options="mobileItems"
        @changed="handleChangeItem($event)"
      />
    </div>
    <div class="hidden sm:block">
      <div class="space-y-12">
        <div v-for="item,i in items" :key="i">
          <h3 id="projects-headline" class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {{ item.label }}
          </h3>
          <div class="mt-1 space-y-1" :aria-labelledby="item.label">
            <nuxt-link v-for="link, index in item.childrens" :key="index" :to="link.to" class="group flex items-center py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
              <span class="truncate">
                {{ link.label }}
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinSecondaryMenu from '@/mixins/secondary-menu'

export default {
  mixins: [MixinSecondaryMenu],
  data () {
    return {
      items: [
        {
          key: 'contenus',
          label: 'Contenus',
          childrens: [
            { label: 'Missions prioritaires', to: '/admin/contenus/missions-prioritaires' },
            { label: "Domaines d'action", to: '/admin/contenus/domaines' },
            { label: 'Activités', to: '/admin/contenus/activites' },
            { label: 'Modèles de mission', to: '/admin/contenus/modeles-mission' },
            { label: 'Territoires', to: '/admin/contenus/territoires' },
            { label: 'Reseaux', to: '/admin/contenus/reseaux' },
            { label: 'Témoignages', to: '/admin/contenus/testimonials' },
            { label: 'Ressources', to: '/admin/contenus/ressources' }
          ]
        },
        {
          key: 'taxonomies',
          label: 'Taxonomies',
          childrens: [
            { label: 'Compétences', to: '/admin/taxonomies/skills' },
            { label: 'Tags', to: '/admin/taxonomies/tags' }
          ]
        },
        {
          key: 'settings',
          label: 'Paramètres',
          childrens: [
            { label: 'Général', to: '/admin/settings/general' },
            { label: 'Emails', to: '/admin/settings/emails' },
            { label: 'Messages', to: '/admin/settings/messages' }
          ]
        },
        {
          key: 'other',
          label: 'Autre',
          childrens: [
            { label: 'Invitations', to: '/admin/other/invitations' }
          ]
        },
        {
          key: 'scripts',
          label: 'Scripts',
          childrens: [
            { label: 'Transfert de missions', to: '/admin/scripts/migrate-organisation-missions' },
            { label: 'Activités des missions libres', to: '/admin/scripts/activites-missions-libres' },
            { label: 'Réinitialisation d\'un utilisateur', to: '/admin/scripts/user-reset-context-role' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
a.nuxt-link-active {
  @apply text-jva-blue-500;
}
</style>
