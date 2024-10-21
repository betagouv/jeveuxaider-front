<template>
  <button
    class="group/item text-[#161616] flex justify-between items-center gap-3 cursor-pointer w-full text-left hover:bg-[#F5F5FE] hover:text-jva-blue-500"
    :class="[
      {
        'p-4': size == 'md',
        'p-2': size == 'sm',
      },
    ]"
    role="menuitem"
  >
    <div class="flex flex-1 justify-start items-center gap-3 w-full">
      <component
        :is="icon"
        v-if="hasLeftIcon"
        :class="[
          'fill-current flex-none text-[#666666] group-hover/item:text-[#6A6AF4]',
          { 'h-[14px] w-auto': size === 'sm' },
          { 'h-4 w-auto': size === 'md' },
          iconClass,
        ]"
      />
      <div class="flex flex-col flex-1 w-full">
        <div v-if="label" class="text-[#666666] uppercase text-xs">
          {{ label }}
        </div>
        <div
          :class="[
            'font-medium line-clamp-1',
            { 'text-sm': size === 'sm' },
            { 'text-base': size === 'md' },
          ]"
        >
          <slot />
        </div>
      </div>
    </div>
    <div class="" v-if="showArrow">
      <RiArrowRightSLine
        class="hidden group-hover/item:block h-4 flex-none fill-current"
        :class="[iconClass]"
      />
    </div>
  </button>
</template>

<script>
export default defineNuxtComponent({
  props: {
    label: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'md',
    },
    icon: {
      type: String,
      default: null,
    },
    iconClass: {
      type: String,
      default: null,
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
    showArrow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasLeftIcon() {
      return this.icon && this.iconPosition === 'left'
    },
    hasRightIcon() {
      return this.icon && this.iconPosition === 'right'
    },
  },
  methods: {},
})
</script>
