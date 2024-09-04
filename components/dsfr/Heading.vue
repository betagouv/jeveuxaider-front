<template>
  <component
    :is="as"
    :class="[
      'initial:text-pretty',

      { 'font-bold': bold },

      { 'text-lg leading-6 lg:text-xl lg:leading-7': size === 'xs' }, // H6
      { 'text-xl leading-7 lg:text-[22px] lg:leading-7': size === 'sm' }, // H5
      { 'text-[22px] leading-7 lg:text-2xl lg:leading-8': size === 'md' }, // H4
      { 'text-2xl lg:text-[28px] lg:leading-9': size === 'lg' }, // H3
      { 'text-[28px] leading-9 lg:text-[32px] lg:leading-10': size === 'xl' }, // H2
      {
        'text-[32px] leading-10 lg:text-[40px] lg:leading-[48px]': size === '2xl',
      }, // H1

      {
        'text-4xl xxs:text-[40px] xxs:leading-[48px] xl:text-[46px] xl:leading-[54px]':
          size === 'alt-sm',
      },
      {
        'text-4xl xxs:text-[40px] xxs:leading-[48px] xl:text-[54px] xl:leading-[62px]':
          size === 'alt-md',
      },
      {
        'text-[40px] leading-[48px] xxs:text-[48px] xxs:leading-[56px] xl:text-[62px] xl:leading-[72px]':
          size === 'alt-lg',
      },
      {
        'text-5xl leading-[52px] xxs:text-[64px] xxs:leading-[64px] lg:text-[80px] lg:leading-[80px]':
          size === 'alt-xl',
      },
      {
        'text-5xl leading-[52px] xxs:text-[64px] xxs:leading-[64px] lg:text-[80px] lg:leading-[80px] xl:text-[120px] xl:leading-[120px] xl:tracking-tight':
          size === 'alt-2xl',
      },

      color,

      { 'with-line flex': withLine },
    ]"
  >
    <slot />
  </component>
</template>

<script>
export default defineNuxtComponent({
  props: {
    as: {
      type: String,
      default: 'h2',
    },
    size: {
      type: String,
      default: 'xl',
      validator: (s) =>
        [
          'xs',
          'sm',
          'md',
          'lg',
          'xl',
          '2xl',
          'alt-xs',
          'alt-sm',
          'alt-md',
          'alt-lg',
          'alt-xl',
          'alt-2xl',
        ].includes(s),
    },
    bold: {
      type: Boolean,
      default: true,
    },
    lightColor: {
      type: String,
      default: 'text-[#161616]',
    },
    darkColor: {
      type: String,
      default: 'text-white',
    },
    color: {
      type: String,
      default: null,
    },
    withLine: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="postcss" scoped>
.with-line {
  &::after {
    content: '';
    flex: 1 1;
    border-bottom: 1px solid #e5e5e5;
    @apply my-auto ml-4 relative top-[2px];
  }
}
</style>
