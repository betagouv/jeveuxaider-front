<template>
  <span
    :class="[
      'inline-flex items-center justify-center max-w-full truncate uppercase rounded font-bold',

      {'px-2 text-[11px]': size == 'xs'},
      {'px-2 text-xs': size == 'sm'},
      {'px-2 text-sm': size == 'md'},

      {'text-[#18753C] bg-[#B8FEC9]': type === 'success'},
      {'text-[#CE0500] bg-[#FFE9E9]': type === 'error'},
      {'text-[#0063CB] bg-[#E8EDFF]': type === 'info'},
      {'text-[#B34000] bg-[#FFE9E6]': type === 'warning'},
      {'text-[#695240] bg-[#FEEBD0]': type === 'new'},
      {'text-[#6E445A] bg-[#FEE7FC]': type === 'default'},
    ]"
  >
    <component
      :is="icon"
      v-if="icon"
      :class="[
        'fill-current flex-none mr-1 object-contain',

        {'w-3 h-3': ['xs', 'sm'].includes(size)},
        {'w-4 h-4': size === 'md'},

        {'ml-[-2px]': size === 'sm'},
        {'-ml-1': size === 'md'},
      ]"
    />
    <span class="truncate">
      <slot />
    </span>
  </span>
</template>

<script>
import IconSuccess from '@/static/images/icons/dsfr/badge/success.svg?inline'
import IconError from '@/static/images/icons/dsfr/badge/error.svg?inline'
import IconWarning from '@/static/images/icons/dsfr/badge/warning.svg?inline'
import IconNew from '@/static/images/icons/dsfr/badge/new.svg?inline'
import IconInfo from '@/static/images/icons/dsfr/badge/info.svg?inline'

export default {
  components: {
    IconSuccess,
    IconError,
    IconWarning,
    IconNew,
    IconInfo
  },
  props: {
    size: {
      type: String,
      default: 'md',
      validator: s => ['xs', 'sm', 'md'].includes(s)
    },
    type: {
      type: String,
      default: 'default',
      validator: t => ['success', 'error', 'info', 'warning', 'new', 'default'].includes(t)
    },
    noIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon () {
      if (this.noIcon) {
        return null
      }
      switch (this.type) {
        case 'success':
          return IconSuccess
        case 'error':
          return IconError
        case 'info':
          return IconInfo
        case 'warning':
          return IconWarning
        case 'new':
          return IconNew
        default:
          return null
      }
    }
  }
}
</script>
