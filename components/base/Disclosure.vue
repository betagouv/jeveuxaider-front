<template>
  <div>
    <div class="cursor-pointer" @click="isOpen = !isOpen">
      <slot name="button" :isOpen="isOpen">
        Button
      </slot>
    </div>
    <transition
      enter-active-class="transition duration-3000"
      enter-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition duration-75"
      leave-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div v-if="isOpen">
        <slot>
          Panel
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  }
}
</script>
