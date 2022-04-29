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
          key: 'global',
          label: 'Global',
          childrens: [
            { label: 'Plus de chiffres', to: '/admin/numbers' }
          ]
        },
        {
          key: 'organisations',
          label: 'Organisations',
          childrens: [
            { label: 'Vue d\'ensemble', to: '/admin/numbers/organisations' },
            { label: 'Actions en attente', to: '/admin/numbers/organisations/waiting-actions' }
          ]
        },
        {
          key: 'services',
          label: 'Services tiers',
          childrens: [
            { label: 'Plausible', href: 'https://plausible.io/jeveuxaider.gouv.fr' },
            { label: 'API Engagement', href: 'https://api-engagement.beta.gouv.fr/' }
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
