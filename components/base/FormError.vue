<template>
  <div class="text-xs text-[#CE0500] mt-4">
    <IconFormError class="inline fill-current flex-none mr-1 object-contain w-4 h-4 translate-y-[-1px]" />
    <slot />
  </div>
</template>

<script>
import IconFormError from '@/static/images/icons/dsfr/form/error.svg?inline'

export default {
  components: {
    IconFormError
  }
}
</script>
