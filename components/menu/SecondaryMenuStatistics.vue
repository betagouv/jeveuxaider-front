<template>
  <div v-if="items">
    <div class="sm:hidden">
      <label for="menu" class="sr-only">Menu</label>
      <BaseSelectAdvanced
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
        <div v-for="(item, i) in items" :key="i">
          <template v-if="item">
            <h3
              id="projects-headline"
              class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              {{ item.label }}
            </h3>
            <div class="mt-1 space-y-1" :aria-labelledby="item.label">
              <template v-for="(link, index) in item.childrens" :key="index">
                <template v-if="link">
                  <nuxt-link
                    no-prefetch
                    v-if="link.to"
                    :to="link.to"
                    class="group flex items-center py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900"
                  >
                    <span class="truncate">
                      {{ link.label }}
                    </span>
                  </nuxt-link>
                  <a
                    v-else-if="link.href"
                    :href="link.href"
                    target="_blank"
                    class="group flex items-center py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900"
                  >
                    <span class="truncate">
                      {{ link.label }}
                    </span>
                  </a>
                </template>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinSecondaryMenu from '@/mixins/secondary-menu'

export default defineNuxtComponent({
  mixins: [MixinSecondaryMenu],
  data() {
    return {}
  },
  computed: {
    items() {
      const runtimeConfig = useRuntimeConfig()

      if (this.$stores.auth.contextRole === 'admin') {
        return [
          {
            key: 'statistics',
            label: 'Statistiques',
            childrens: [
              { label: "Vue d'ensemble", to: '/admin/statistics' },
              {
                label: 'Indicateurs clés',
                to: '/admin/statistics/indicateurs-cles',
              },
              {
                label: 'Participations',
                to: '/admin/statistics/participations',
              },
              { label: 'Utilisateurs', to: '/admin/statistics/utilisateurs' },
              { label: 'Organisations', to: '/admin/statistics/organisations' },
              { label: 'Missions', to: '/admin/statistics/missions' },
              { label: 'Places', to: '/admin/statistics/places' },
            ],
          },
          {
            key: 'api',
            label: 'API Engagement',
            childrens: [
              {
                label: 'Trafic entrant',
                to: '/admin/statistics/api-engagement/trafic-entrant',
              },
              {
                label: 'Trafic sortant',
                to: '/admin/statistics/api-engagement/trafic-sortant',
              },
            ],
          },
          {
            key: 'actions',
            label: 'Actions en attente',
            childrens: [
              {
                label: 'Organisations',
                to: '/admin/statistics/organisations/participations-a-valider',
              },
              {
                label: 'Départements',
                to: '/admin/statistics/departements/organisations-a-valider',
              },
            ],
          },
          {
            key: 'services',
            label: 'Services tiers',
            childrens: [
              {
                label: 'Metabase',
                href: 'https://reserve-civique-metabase.osc-secnum-fr1.scalingo.io/',
              },
              {
                label: 'Plausible',
                href: runtimeConfig.public.plausible.shared_link,
              },
            ],
          },
        ]
      } else if (this.$stores.auth.contextRole === 'referent') {
        return [
          {
            key: 'statistics',
            label: 'Statistiques',
            childrens: [
              { label: "Vue d'ensemble", to: '/admin/statistics' },
              {
                label: 'Indicateurs clés',
                to: '/admin/statistics/indicateurs-cles',
              },
              {
                label: 'Participations',
                to: '/admin/statistics/participations',
              },
              { label: 'Utilisateurs', to: '/admin/statistics/utilisateurs' },
              { label: 'Organisations', to: '/admin/statistics/organisations' },
              { label: 'Missions', to: '/admin/statistics/missions' },
              { label: 'Places', to: '/admin/statistics/places' },
            ],
          },
          {
            key: 'actions',
            label: 'Actions en attente',
            childrens: [
              {
                label: 'Organisations',
                to: '/admin/statistics/organisations/participations-a-valider',
              },
            ],
          },
        ]
      }

      return null
    },
  },
})
</script>

<style lang="postcss" scoped>
a.nuxt-link-exact-active {
  @apply text-jva-blue-500;
}
</style>
