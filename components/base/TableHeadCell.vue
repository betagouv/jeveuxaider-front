<template>
  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    <div class="flex items-center gap-2">
      <span
        :class="[
          'text-xs font-medium text-gray-500 uppercase tracking-wider',
          center ? 'text-center' : 'text-left',
        ]"
      >
        <slot />
      </span>
      <span v-if="sortableKey" class="flex flex-col">
        <ChevronUpIcon
          :class="[
            'h-3 w-3 cursor-pointer',
            $route.query.sort === sortableKey
              ? 'text-indigo-700'
              : 'text-gray-400',
          ]"
          @click="$emit('updated', sortableKey)"
        />
        <ChevronDownIcon
          :class="[
            'h-3 w-3 cursor-pointer',
            $route.query.sort === '-' + sortableKey
              ? 'text-indigo-700'
              : 'text-gray-400',
          ]"
          @click="$emit('updated', '-' + sortableKey)"
        />
      </span>
    </div>
  </th>
</template>

<script>
export default {
  props: {
    center: {
      type: Boolean,
      default: false
    },
    sortableKey: {
      type: String,
      default: null
    }
  },
  setup () {}
}
</script>

<style></style>
