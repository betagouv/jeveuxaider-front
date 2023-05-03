<template>
  <div
    class="p-4"
    :class="[
      {
        'bg-jva-blue-50': variant === 'infos',
        'bg-yellow-50': variant === 'warning',
      }
    ]"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <RiInformationFill v-if="variant === 'infos'" class="h-5 w-5 text-jva-blue-500 fill-current mt-[2px]" aria-hidden="true" />
        <RiAlertFill v-if="variant === 'warning'" class="h-5 w-5 text-yellow-600 fill-current mt-[2px]" aria-hidden="true" />
      </div>
      <div class="ml-3 flex-1 md:flex md:justify-between">
        <p
          class="text-sm "
          :class="[
            {
              'text-jva-blue-500': variant === 'infos',
              'text-yellow-600': variant === 'warning',
            }
          ]"
        >
          <slot />
        </p>
        <p class="mt-3 text-sm md:mt-0 md:ml-6">
          <slot name="action" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'infos',
      validator: s => ['infos', 'warning'].includes(s)
    }
  }
}
</script>

<style>

</style>
