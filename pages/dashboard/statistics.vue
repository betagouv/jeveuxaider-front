<template>
  <div class="max-w-[1313px] mx-auto">
    <Breadcrumb
      :items="[{ label: 'Tableau de bord', link: '/dashboard' },{ label: 'Plus de chiffres' }]"
    />
    <div class="py-12">
      @TODO
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
