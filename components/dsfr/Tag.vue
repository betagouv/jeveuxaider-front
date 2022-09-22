<template>
  <span
    class="inline-flex items-center rounded-full max-w-full"
    :class="[
      {'px-2 py-0.5 text-xs': size == 'sm'},
      {'px-3 py-1 text-sm': size == 'md'},
      {'text-[#161616] bg-[#EEEEEE]': $store.state.settings.theme === 'light'},
      {'text-white bg-[#242424]': $store.state.settings.theme === 'dark'},
    ]"
  >
    <span class="truncate">
      <slot />
    </span>
  </span>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'sm',
      validator: s => ['sm', 'md'].includes(s)
    }
  }
}
</script>
