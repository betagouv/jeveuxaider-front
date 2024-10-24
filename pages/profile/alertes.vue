<template>
  <div class="container">
    <DsfrBreadcrumb :links="[{ text: 'Mon espace', to: '/profile' }, { text: 'Mes alertes' }]" />

    <div class="space-y-8 mb-12">
      <BaseSectionHeading
        title="Mes alertes"
        secondary-title-bottom="Pour chaque alerte active, vous recevrez un email par semaine avec les nouvelles missions disponibles."
      >
        <template #action>
          <DsfrButton to="/profile/alertes" icon="RiNotification2Line" @click="onCreateClick">
            Créer une alerte
          </DsfrButton>
        </template>
      </BaseSectionHeading>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <template v-if="alerts.length > 0">
            <div class="grid grid-cols-1 gap-6">
              <CardAlert v-for="alert in alerts" :key="alert.id" :alert="alert">
                {{ alert.id }}
              </CardAlert>
            </div>
          </template>
          <template v-else>
            <div>@TODO EMPTY STATE</div>
          </template>
        </div>
        <div class="flex flex-col gap-8">
          <BoxUserFavoris />
          <HelpCenter />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelpCenter from '@/components/section/dashboard/HelpCenter.vue'
import CardMission from '@/components/card/CardMission.vue'
import BoxUserFavoris from '@/components/section/profile/BoxUserFavoris.vue'
import CardAlert from '@/components/card/CardAlert.vue'

export default defineNuxtComponent({
  components: {
    HelpCenter,
    CardMission,
    CardAlert,
    BoxUserFavoris,
  },
  setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    alerts() {
      return this.$stores.auth.user?.alerts ?? []
    },
  },
  methods: {
    onCreateClick() {
      this.$stores.userAlert.resetOverlay()
      this.$stores.userAlert.showOverlay = true
    },
  },
})
</script>
