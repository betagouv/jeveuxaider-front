<template>
  <div>
    <TabsFacetFilter
      filter-name="type"
      class="w-full"
      :tabs="[
        {
          icon: 'LocationMarkerIcon',
          filterValue: 'Mission en présentiel',
          current: !$route.query['type'],
          label: 'Près de chez moi'
        },
        {
          icon: 'DesktopComputerIcon',
          filterValue: 'Mission à distance',
          label: 'Depuis chez moi'
        }
      ]"
    />
  </div>
</template>

<script>
import TabsFacetFilter from '@/components/section/search/TabsFacetFilter.vue'

export default {
  components: {
    TabsFacetFilter
  }
}
</script>
