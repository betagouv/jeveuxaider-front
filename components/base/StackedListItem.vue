<template>
  <div
    class="group flex py-2 space-x-4 lg:py-4 lg:space-x-8 items-center"
    :class="[{ 'cursor-pointer': link || href }]"
    @click="handleClick"
  >
    <div
      v-if="icon"
      class="text-xl h-[40px] w-[40px] lg:text-3xl lg:h-[56px] lg:w-[56px] flex items-center justify-center transition group-hover:scale-105"
      :class="[
        { 'bg-[#FFE5D2] border border-[#EAD7A1]': iconVariant === 'warning' },
        { 'bg-[#FA9D96] border border-[#E88D96]': iconVariant === 'danger' },
        { 'bg-[#E1E8EE] border border-[#B6E1EE]': iconVariant === 'info' },
        { 'bg-[#5B5198] border border-[#32257F]': iconVariant === 'snu' },
      ]"
    >
      <template v-if="icon === 'snu'">
        <img src="@/assets/images/snu-logo.png" alt="SNU" title="SNU" class="h-8" data-not-lazy />
      </template>
      <template v-else>
        <div :class="iconClass">
          {{ icon }}
        </div>
      </template>
    </div>
    <div class="flex-1">
      <slot />
    </div>
    <RiArrowRightLine v-if="link || href || arrow" class="h-5 transition group-hover:scale-125" />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    icon: {
      type: [String, Number],
      default: null,
    },
    iconVariant: {
      type: String,
      default: null,
    },
    iconClass: {
      type: [String, Array],
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      if (this.href) {
        window.open(this.href, '_blank').focus()
        return
      }
      if (this.link) {
        this.$router.push(this.link)
      }
    },
  },
})
</script>
