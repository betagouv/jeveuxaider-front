<template>
  <p class="text-xs text-[#0063CB] mt-2">
    <DsfrInfoIcon
      class="inline fill-current flex-none mr-2 object-contain w-4 h-4 translate-y-[-1px]"
    />
    <slot />
  </p>
</template>

<script>
import DsfrInfoIcon from '@/components/icon/dsfr/Info.vue'

export default defineNuxtComponent({
  components: {
    DsfrInfoIcon,
  },
})
</script>
