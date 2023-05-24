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
          key: 'referents',
          label: 'Référents',
          childrens: [
            { label: 'Actions en attente', to: '/support/referents/waiting-actions' },
            { label: 'Logs des activités', to: '/support/referents/activity-logs' }
          ]
        },
        {
          key: 'responsables',
          label: 'Responsables',
          childrens: [
            { label: 'Participations à modérer', to: '/support/responsables/participations-to-be-treated' },
            { label: 'Missions périmées', to: '/support/responsables/missions-outdated' }
          ]
        },
        {
          key: 'scripts',
          label: 'Scripts',
          childrens: [
            { label: 'Réinitialisation mot de passe', to: '/support/scripts/migrate-organisation-missions' },
            { label: 'Transfert de missions', to: '/support/scripts/migrate-organisation-missions' },
            { label: 'Réinitialisation d\'un utilisateur', to: '/support/scripts/user-reset-context-role' }
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
