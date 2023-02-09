<template>
  <div
    class="p-6 md:p-8 xl:p-12 custom-gradient relative min-h-[120px]"
  >
    <img
      class="absolute right-0 bottom-0 p-6 pointer-events-none"
      src="/images/icons/quote.svg"
      alt=""
    >
    <component :is="as" class="citation relative z-10 text-lg">
      <div v-if="htmlEncoded" class="formatted-text" v-html="htmlEncoded" />
      <div v-else class="formatted-text">
        <slot />
      </div>
    </component>
  </div>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: 'div'
    },
    htmlEncoded: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style lang="postcss" scoped>
/* .citation {
  display: flex;
  &::before {
    content: '“\00A0';
  }
  &::after {
    content: '\00A0”';
  }
} */

.custom-gradient {
    background: linear-gradient(to right, #000091 5px, #ECECFE 5px);
  }
</style>
