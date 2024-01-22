<template>
  <component
    :is="as"
    :class="[
      'inline-flex items-center justify-center max-w-full truncate uppercase rounded font-bold',

      { 'px-[6px] text-[11px]': size == 'xs' },
      { 'px-[6px] text-xs': size == 'sm' },
      { 'px-2 text-sm': size == 'md' },

      { 'text-[#18753C] bg-[#B8FEC9]': type === 'success' },
      { 'text-[#CE0500] bg-[#FFE9E9]': type === 'error' },
      { 'text-[#0063CB] bg-[#E8EDFF]': type === 'info' },
      { 'text-[#B34000] bg-[#FFE9E6]': type === 'warning' },
      { 'text-[#695240] bg-[#FEEBD0]': type === 'new' },
      { 'text-[#6E445A] bg-[#FEE7FC]': type === 'default' },
      { 'text-[#3A3A3A] bg-[#EEEEEE]': type === 'gray' },
    ]"
  >
    <component
      :is="icon"
      v-if="icon"
      :class="[
        'fill-current flex-none mr-1 object-contain',

        { 'w-3 h-3': ['xs', 'sm'].includes(size) },
        { 'w-4 h-4': size === 'md' },

        { 'ml-[-2px]': size === 'sm' },
        { '-ml-1': size === 'md' },
      ]"
    />
    <span class="truncate">
      <slot />
    </span>
  </component>
</template>

<script>
import DsfrSuccessIcon from '@/components/icon/dsfr/Success.vue'
import DsfrErrorIcon from '@/components/icon/dsfr/Error.vue'
import DsfrWarningIcon from '@/components/icon/dsfr/Warning.vue'
import DsfrNewIcon from '@/components/icon/dsfr/New.vue'
import DsfrInfoIcon from '@/components/icon/dsfr/Info.vue'

export default defineNuxtComponent({
  components: {
    DsfrSuccessIcon,
    DsfrErrorIcon,
    DsfrWarningIcon,
    DsfrNewIcon,
    DsfrInfoIcon,
  },
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (s) => ['xs', 'sm', 'md'].includes(s),
    },
    type: {
      type: String,
      default: 'default',
      validator: (t) =>
        ['success', 'error', 'info', 'warning', 'new', 'default', 'gray'].includes(t),
    },
    noIcon: {
      type: Boolean,
      default: false,
    },
    as: {
      type: String,
      default: 'span',
    },
  },
  computed: {
    icon() {
      if (this.noIcon) {
        return null
      }
      switch (this.type) {
        case 'success':
          return DsfrSuccessIcon
        case 'error':
          return DsfrErrorIcon
        case 'info':
          return DsfrInfoIcon
        case 'warning':
          return DsfrWarningIcon
        case 'new':
          return DsfrNewIcon
        default:
          return null
      }
    },
  },
})
</script>
