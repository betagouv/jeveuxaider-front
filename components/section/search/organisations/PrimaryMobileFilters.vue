<template>
  <div>
    <div class="bg-white p-6 shadow-xl rounded-xl">
      <div class="group flex justify-between items-end cursor-pointer">
        <SearchFilter placeholder="Recherche par mots clés" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchFilter from '@/components/search/SearchFilter.vue'

export default {
  components: {
    SearchFilter
  }
}
</script>
