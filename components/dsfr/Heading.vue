<template>
  <component
    :is="as"
    :class="[
      {'font-bold': bold},

      {'text-lg leading-6 lg:text-xl lg:leading-7': size === 'xs'}, // H6
      {'text-xl leading-7 lg:text-[22px] lg:leading-7': size === 'sm'}, // H5
      {'text-[22px] leading-7 lg:text-2xl lg:leading-8': size === 'md'}, // H4
      {'text-2xl lg:text-[28px] lg:leading-9': size === 'lg'}, // H3
      {'text-[28px] leading-9 lg:text-[32px] lg:leading-10': size === 'xl'}, // H2
      {'text-[32px] leading-10 lg:text-[40px] lg:leading-[48px]': size === '2xl'}, // H1

      {'text-4xl xxs:text-[40px] xxs:leading-[48px] lg:text-5xl lg:leading-[56px]': size === 'alt-xs'},
      {'text-4xl xxs:text-[40px] xxs:leading-[48px] lg:text-[56px] lg:leading-[64px]': size === 'alt-sm'},
      {'text-4xl xxs:text-[40px] xxs:leading-[48px] lg:text-[64px] lg:leading-[72px]': size === 'alt-md'},
      {'text-[40px] leading-[48px] xxs:text-[48px] xxs:leading-[56px] lg:text-[72px] lg:leading-[82px]': size === 'alt-lg'},
      {'text-5xl leading-[52px] xxs:text-[64px] xxs:leading-[64px] lg:text-[80px] lg:leading-[80px] xl:text-[150px] xl:leading-[150px] xl:tracking-tight': size === 'alt-xl'},

      color ?? ($store.state.settings.theme === 'light' ? lightColor : darkColor)
    ]"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    as: {
      type: String,
      default: 'h2'
    },
    size: {
      type: String,
      default: 'xl',
      validator: s => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'alt-xs', 'alt-sm', 'alt-md', 'alt-lg', 'alt-xl'].includes(s)
    },
    bold: {
      type: Boolean,
      default: true
    },
    lightColor: {
      type: String,
      default: 'text-[#161616]'
    },
    darkColor: {
      type: String,
      default: 'text-white'
    },
    color: {
      type: String,
      default: null
    }
  }
}
</script>
