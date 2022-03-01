<template>
  <div
    class="group flex py-2 space-x-4 lg:py-4 lg:space-x-8 items-center"
    :class="[
      { 'cursor-pointer': link }
    ]"
    @click="handleClick"
  >
    <div
      v-if="icon"
      class="text-xl h-[40px] w-[40px] rounded-xl lg:text-3xl lg:h-[56px] lg:w-[56px] lg:rounded-2xl flex items-center justify-center transition group-hover:scale-105"
      :class="[
        { 'bg-[#FFE5D2] border border-[#EAD7A1]' : iconVariant === 'warning'},
        { 'bg-[#FA9D96] border border-[#E88D96]' : iconVariant === 'danger'},
        { 'bg-[#E1E8EE] border border-[#B6E1EE]' : iconVariant === 'info' }
      ]"
    >
      {{ icon }}
    </div>
    <div class="flex-1">
      <slot />
    </div>
    <ChevronRightIcon v-if="link || arrow" class="h-5 transition group-hover:scale-125" />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    iconVariant: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    },
    arrow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      if (this.link) {
        this.$router.push(this.link)
      }
    }
  }
}
</script>

<style>

</style>
