<template>
  <span
    :class="[
      'text-xs',
      {
        'text-red-500': value < 0,
        'text-green-500': value > 0,
      },
    ]"
  >
    <template v-if="value > 0">+{{ $numeral(value) }}%</template>
    <template v-else>{{ $numeral(value) }}%</template>
  </span>
</template>

<script>
export default defineNuxtComponent({
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
})
</script>
