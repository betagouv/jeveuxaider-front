<template>
  <p class="text-xs text-[#CE0500] mt-2">
    <DsfrErrorIcon
      class="inline fill-current flex-none mr-2 object-contain w-4 h-4 translate-y-[-1px]"
    />
    <slot />
  </p>
</template>

<script>
import DsfrErrorIcon from '@/components/icon/dsfr/Error.vue'

export default defineNuxtComponent({
  components: {
    DsfrErrorIcon,
  },
})
</script>
