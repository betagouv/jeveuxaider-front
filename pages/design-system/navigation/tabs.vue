<template>
  <div class="space-y-12">
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Tabs with underline
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Tabs
          :tabs="[
            { name: 'Informations', to: '#', current: false },
            { name: 'Participations', to: '#', current: false },
            { name: 'Historique', to: '#', current: true }
          ]"
        />
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="text-lg font-medium text-gray-900">
        Tabs with underline and icons
      </div>
      <div class="flex flex-wrap gap-2 items-end">
        <Tabs
          :tabs="[
            { name: 'Informations', to: '#', icon: 'InformationCircleIcon', current: false },
            { name: 'Participations', to: '#', icon: 'UsersIcon', current: false },
            { name: 'Historique', to: '#', icon: 'ClockIcon', current: true }
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'design-system',
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
