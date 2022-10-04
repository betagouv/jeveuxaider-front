<template>
  <div class="text-xs text-[#18753C] mt-4">
    <IconFormSuccess class="inline fill-current flex-none mr-1 object-contain w-4 h-4 translate-y-[-1px]" />
    <slot />
  </div>
</template>

<script>
import IconFormSuccess from '@/static/images/icons/dsfr/form/success.svg?inline'

export default {
  components: {
    IconFormSuccess
  }
}
</script>
