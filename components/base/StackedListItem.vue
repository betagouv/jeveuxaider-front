<template>
  <div class="group cursor-pointer flex py-4 space-x-8 items-center" @click="handleClick">
    <div
      v-if="icon"
      class="text-3xl rounded-2xl h-[56px] w-[56px] flex items-center justify-center transition group-hover:scale-105"
      :class="[
        { 'bg-[#FFE5D2] border border-[#EAD7A1]' : iconBgVariant === 'warning'},
        { 'bg-[#FA9D96] border border-[#E88D96]' : iconBgVariant === 'danger'},
        { 'bg-[#E1E8EE] border border-[#B6E1EE]' : iconBgVariant === 'info' }
      ]"
    >
      {{ icon }}
    </div>
    <div class="flex-1">
      <slot />
    </div>
    <ChevronRightIcon class="h-5 transition group-hover:scale-125" />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    iconBgVariant: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
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
