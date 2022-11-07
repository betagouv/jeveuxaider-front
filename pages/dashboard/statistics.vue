<template>
  <div class="max-w-7xl mx-auto">
    <Breadcrumb
      :items="[{ label: 'Tableau de bord', link: '/dashboard' },{ label: 'Plus de chiffres' }]"
    />
    <div class="py-12">
      <div class="flex items-center justify-center text-3xl text-center h-32 my-32 text-gray-300">
        À venir prochainement
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  asyncData ({ store, error }) {
    if (
      !['admin', 'referent', 'referent_regional', 'tete_de_reseau'].includes(
        store.getters.contextRole
      )
    ) {
      return error({ statusCode: 403 })
    }
  }
}
</script>

<style>

</style>
