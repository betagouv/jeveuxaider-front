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
              <nuxt-link v-if="link.to" :key="index" :to="link.to" class="group flex items-center py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                <span class="truncate">
                  {{ link.label }}
                </span>
              </nuxt-link>
              <a v-else-if="link.href" :key="index" :href="link.href" target="_blank" class="group flex items-center py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                <span class="truncate">
                  {{ link.label }}
                </span>
              </a>
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
          key: 'statistics',
          label: 'Statistiques',
          childrens: [
            { label: 'Vue d\'ensemble', to: '/admin/statistics' },
            { label: 'Évolutions', to: '/admin/statistics/evolutions' },
            { label: 'Organisations', to: '/admin/statistics/organisations' },
            { label: 'Missions', to: '/admin/statistics/missions' },
            { label: 'Participations', to: '/admin/statistics/participations' },
            { label: 'Utilisateurs', to: '/admin/statistics/utilisateurs' },
            { label: 'Places', to: '/admin/statistics/places' }
          ]
        },
        {
          key: 'api',
          label: 'API Engagement',
          childrens: [
            { label: 'Missions', to: '/admin/statistics/api-engagement/missions' }
          ]
        },
        {
          key: 'actions',
          label: 'Actions en attente',
          childrens: [
            { label: 'Organisations', to: '/admin/statistics/organisations/participations-a-valider' },
            { label: 'Départements', to: '/admin/statistics/departements/organisations-a-valider' }
          ]
        },
        {
          key: 'services',
          label: 'Services tiers',
          childrens: [
            { label: 'Metabase', href: 'https://reserve-civique-metabase.osc-secnum-fr1.scalingo.io/' },
            { label: 'Plausible', href: 'https://plausible.io/share/jeveuxaider.gouv.fr?auth=A12tLW-fKeo1v_e2SheBy' },
            { label: 'API Engagement', href: 'https://api-engagement.beta.gouv.fr/' }
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
