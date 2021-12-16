<template>
  <div class="space-y-12">
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Circles with text
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Steps
          :steps="[
            {
              name: 'Rejoignez le mouvement',
              status: 'complete',
              href: '/inscription/benevole/step/profile'
            },
            {
              name: 'Votre profil',
              status: 'current'
            },
            {
              name: 'Vos préférences',
              status: 'upcoming'
            },
            {
              name: 'Vos compétences',
              status: 'upcoming'
            }
          ]"
        />
      </div>
    </div>
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
