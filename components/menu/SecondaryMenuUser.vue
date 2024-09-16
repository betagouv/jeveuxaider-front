<template>
  <div>
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
          <h3
            id="projects-headline"
            class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            {{ item.label }}
          </h3>
          <div class="mt-1 space-y-1" :aria-labelledby="item.label">
            <template v-for="(link, index) in item.childrens" :key="index">
              <div>
                <nuxt-link
                  no-prefetch
                  v-if="link.to"
                  :to="link.to"
                  class="group inline-flex items-center py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <span class="truncate">
                    {{ link.label }}
                  </span>
                </nuxt-link>
                <a
                  v-else-if="link.href"
                  :href="link.href"
                  target="_blank"
                  class="group inline-flex items-center py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
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

export default defineNuxtComponent({
  mixins: [MixinSecondaryMenu],
  data() {
    return {
      items: [
        {
          key: 'missions',
          label: 'Missions',
          childrens: [
            {
              label: 'Mes missions',
              to: '/profile/missions',
            },
            {
              label: "Ma liste d'attente",
              to: '/profile/missions/liste-attente',
            },
            {
              label: 'Mes favoris',
              to: '/profile/missions/favoris',
            },
            {
              label: 'Mes alertes',
              to: '/profile/missions/alertes',
            },
          ],
        },
        {
          key: 'account',
          label: 'Mon compte',
          childrens: [
            {
              label: 'Mon profil',
              to: '/profile/edit',
            },
            {
              label: 'Mes préférences',
              to: '/profile/preferences',
            },
            {
              label: 'Mes notifications',
              to: '/profile/notifications',
            },
            {
              label: 'Mes paramètres',
              to: '/profile/parameters',
            },
          ],
        },
      ],
    }
  },
})
</script>

<style lang="postcss" scoped>
a.router-link-active {
  @apply text-jva-blue-500;
}
</style>
