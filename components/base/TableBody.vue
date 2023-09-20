<template>
  <tbody class="bg-white divide-y divide-gray-100">
    <template v-if="loading">
      <tr>
        <td :colspan="colspan" class="text-center py-12">
          <LoadingIndicator> {{ loadingText }}</LoadingIndicator>
        </td>
      </tr>
    </template>
    <template v-else>
      <slot />
    </template>
  </tbody>
</template>

<script>
import LoadingIndicator from '@/components/custom/LoadingIndicator'

export default defineNuxtComponent({
  components: {
    LoadingIndicator,
  },
  props: {
    loading: { type: Boolean, default: false },
    loadingText: { type: String, default: 'Chargement en cours' },
    colspan: { type: Number, default: 1 },
  },
})
</script>
