<template>
  <div class="space-y-12">
    <Heading as="h2" :level="3" class="mb-8">
      Breadcrumb
    </Heading>
    <Breadcrumb
      :items="[{ label: 'Tableau de bord' }, { label: 'Organisations' }, { label: 'Pro Bono Lab' }]"
    />
  </div>
</template>

<script>
export default {
  layout: 'components',
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
