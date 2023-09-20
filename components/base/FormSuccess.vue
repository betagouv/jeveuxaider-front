<template>
  <div class="text-xs text-[#18753C] mt-2">
    <DsfrSuccessIcon
      class="inline fill-current flex-none mr-2 object-contain w-4 h-4 translate-y-[-1px]"
    />
    <slot />
  </div>
</template>

<script>
import DsfrSuccessIcon from '@/components/icon/dsfr/Success.vue'

export default defineNuxtComponent({
  components: {
    DsfrSuccessIcon,
  },
})
</script>
