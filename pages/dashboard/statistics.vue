<template>
  <div class="max-w-7xl mx-auto">
    <Breadcrumb
      :items="[{ label: 'Tableau de bord', link: '/dashboard' },{ label: 'Plus de chiffres' }]"
    />
    <div class="py-12">
      <div class="flex items-center justify-center text-3xl text-center h-32 my-32 text-gray-300">
        Cette page est en construction
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>

<style>

</style>
