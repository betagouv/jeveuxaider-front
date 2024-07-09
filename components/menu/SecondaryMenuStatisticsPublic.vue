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
    return {
      items: [],
    }
  },
  mounted() {
    this.recomputeMenuItems()
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        this.recomputeMenuItems()
      },
    },
  },
  methods: {
    recomputeMenuItems() {
      const queryString = window.location.search
      this.items = [
        {
          key: 'statistics',
          label: 'Statistiques',
          childrens: [
            { label: "Vue d'ensemble", to: '/stats' },
            { label: 'Mises en relation', to: `/stats/participations${queryString}` },
            { label: 'Utilisateurs', to: `/stats/utilisateurs${queryString}` },
            { label: 'Organisations', to: `/stats/organisations${queryString}` },
            { label: 'Missions', to: `/stats/missions${queryString}` },
            { label: 'Places', to: `/stats/places${queryString}` },
            // { label: 'API Engagement', to: '/stats/api-engagement' }
          ],
        },
      ]
    },
  },
})
</script>

<style lang="postcss" scoped>
a.router-link-active {
  @apply text-jva-blue-500;
}
</style>
