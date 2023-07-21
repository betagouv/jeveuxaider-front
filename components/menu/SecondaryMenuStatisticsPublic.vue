<template>
  <div v-if="items">
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
          <template v-if="item">
            <h3 id="projects-headline" class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {{ item.label }}
            </h3>
            <div class="mt-1 space-y-1" :aria-labelledby="item.label">
              <template v-for="link, index in item.childrens">
                <template v-if="link">
                  <nuxt-link v-if="link.to" :key="index" :to="link.to" class="group flex items-center py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900">
                    <span class="truncate">
                      {{ link.label }}
                    </span>
                  </nuxt-link>
                  <a v-else-if="link.href" :key="index" :href="link.href" target="_blank" class="group flex items-center py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900">
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

export default {
  mixins: [MixinSecondaryMenu],
  data () {
    return {
    }
  },
  computed: {
    items () {
      return [
        {
          key: 'statistics',
          label: 'Statistiques',
          childrens: [
            { label: 'Vue d\'ensemble', to: '/stats' },
            { label: 'Mises en relation', to: '/stats/participations' },
            { label: 'Utilisateurs', to: '/stats/utilisateurs' },
            { label: 'Organisations', to: '/stats/organisations' },
            { label: 'Missions', to: '/stats/missions' },
            { label: 'Places', to: '/stats/places' }
            // { label: 'API Engagement', to: '/stats/api-engagement' }
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
