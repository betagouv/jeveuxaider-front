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
            <nuxt-link
              no-prefetch
              v-for="(link, index) in item.childrens"
              :key="index"
              :to="link.to"
              class="group flex items-center py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900"
            >
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

export default defineNuxtComponent({
  mixins: [MixinSecondaryMenu],
  data() {
    return {
      items: [
        {
          key: 'contenus',
          label: 'Contenus',
          childrens: [
            { label: 'Témoignages', to: '/admin/contenus/testimonials' },
            { label: 'Ressources', to: '/admin/ressources' },
          ],
        },
      ],
    }
  },
})
</script>

<style lang="postcss" scoped>
a.nuxt-link-exact-active {
  @apply text-jva-blue-500;
}
</style>
