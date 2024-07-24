<template>
  <div>
    <div class="cursor-pointer" @click="isOpen = !isOpen">
      <slot name="button" :isOpen="isOpen"> Button </slot>
    </div>
    <!-- <transition
      enter-active-class="transition duration-3000"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition duration-75"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    > -->
    <div v-show="isOpen">
      <slot />
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    defaultOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: this.defaultOpen,
    }
  },
})
</script>
