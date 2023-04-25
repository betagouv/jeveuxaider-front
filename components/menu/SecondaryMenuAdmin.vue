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
            <template v-for="link, index in item.childrens">
              <div :key="index">
                <nuxt-link v-if="link.to" :to="link.to" class="group inline-flex items-center py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                  <span class="truncate">
                    {{ link.label }}
                  </span>
                </nuxt-link>
                <a v-else-if="link.href" :href="link.href" target="_blank" class="group inline-flex items-center py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                  <span class="truncate">
                    {{ link.label }}
                  </span>
                </a>
              </div>
            </template>
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
          label: 'Tags',
          childrens: [
            { label: 'Missions', to: '/admin/taxonomies/missions' },
            { label: 'Compétences', to: '/admin/taxonomies/skills' },
            { label: 'Utilisateurs', to: '/admin/taxonomies/profiles' }
          ]
        },
        {
          key: 'settings',
          label: 'Paramètres',
          childrens: [
            { label: 'Général', to: '/admin/settings/general' },
            { label: 'Règles', to: '/admin/settings/rules' },
            { label: 'Emails', to: '/admin/settings/emails' },
            { label: 'Messages', to: '/admin/settings/messages' }
          ]
        },
        {
          key: 'other',
          label: 'Autre',
          childrens: [
            { label: 'Statistiques', to: '/admin/statistics' },
            { label: 'Indicateurs clés', to: '/admin/statistics/indicateurs-cles' },
            { label: 'Invitations', to: '/admin/other/invitations' },
            { label: 'Logs', to: '/admin/other/logs' },
            { label: 'Strapi', href: 'https://jeveuxaider-strapi.osc-secnum-fr1.scalingo.io/admin/auth/login' }
          ]
        },
        {
          key: 'scripts',
          label: 'Scripts',
          childrens: [
            { label: 'Transfert de missions', to: '/admin/scripts/migrate-organisation-missions' },
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
