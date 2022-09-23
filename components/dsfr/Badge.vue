<template>
  <span
    :class="[
      'inline-flex items-center justify-center max-w-full truncate uppercase rounded font-bold',

      {'px-[6px] text-xs': size == 'sm'},
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
        'fill-current flex-none mr-1',

        {'w-3 h-3': size === 'sm'},
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
import iconSuccess from '@/static/images/icons/dsfr/badge/success.svg?inline'
import iconError from '@/static/images/icons/dsfr/badge/error.svg?inline'
import iconWarning from '@/static/images/icons/dsfr/badge/warning.svg?inline'
import iconNew from '@/static/images/icons/dsfr/badge/new.svg?inline'
import iconInfo from '@/static/images/icons/dsfr/badge/info.svg?inline'

export default {
  components: {
    iconSuccess,
    iconError,
    iconWarning,
    iconNew,
    iconInfo
  },
  props: {
    size: {
      type: String,
      default: 'md',
      validator: s => ['sm', 'md'].includes(s)
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
      switch (this.type) {
        case 'success':
          return iconSuccess
        case 'error':
          return iconError
        case 'info':
          return iconInfo
        case 'warning':
          return iconWarning
        case 'new':
          return iconNew
        default:
          return null
      }
    }
  }
}
</script>
