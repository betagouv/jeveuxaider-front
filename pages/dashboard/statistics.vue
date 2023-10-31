<template>
  <div class="max-w-7xl mx-auto">
    <Breadcrumb
      :links="[{ text: 'Tableau de bord', to: '/dashboard' }, { text: 'Plus de chiffres' }]"
    />
    <div class="py-12">
      <div class="flex items-center justify-center text-3xl text-center h-32 my-32 text-gray-300">
        À venir prochainement
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/dsfr/Breadcrumb.vue'

export default defineNuxtComponent({
  components: {
    Breadcrumb,
  },
  setup() {
    definePageMeta({
      middleware: ['authenticated'],
    })
  },
  asyncData({ store, error }) {
    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau'].includes(
        stores.auth.contextRole
      )
    ) {
      return showError({ statusCode: 403 })
    }
  },
})
</script>

<style></style>
