<template>
  <div class="text-gray-500 text-sm text-right">
    <template v-if="loading">
      Chargement ...
    </template>
    <template v-else>
      <template v-if="total > 0">
        <span class="font-semibold">{{ from }}</span> - <span class="font-semibold">{{ to }}</span> sur <span class="font-semibold">{{ total }}</span> résultats
      </template>
      <template v-else>
        Aucun résultat
      </template>
    </template>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    from: {
      default: '-',
      type: [Number, String]
    },
    to: {
      default: '-',
      type: [Number, String]
    },
    loading: {
      default: true,
      type: Boolean
    },
    total: {
      default: '-',
      type: [Number, String]
    }
  }
}
</script>

<style>

</style>
