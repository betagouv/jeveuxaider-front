<template>
  <div
    :class="[
      'relative p-6 shadow border-2 hover:shadow-lg transition-shadow duration-300',
      { ' border-[#6A6AF4] bg-[#F5F5FE] ': isCurrent },
      { 'border-white bg-white': !isCurrent },
      { '': isCompleted },
      { 'cursor- cursor-not-allowed  opacity-70': isDisabled },
      { 'cursor-pointer': !isDisabled },
    ]"
    @click="onClick"
  >
    <RiErrorWarningLine
      v-if="isWarning"
      class="h-6 text-yellow-500 fill-current absolute top-3 right-3 group-hover:text-jva-blue-500"
    />
    <RiCheckLine
      v-else-if="isCompleted"
      class="h-6 text-jva-blue-500 fill-current absolute top-3 right-3 group-hover:text-jva-blue-500"
    />
    <div v-if="title" :class="['font-bold mb-2 text-[#161616]']">
      {{ title }}
    </div>

    <div class="text-[#161616]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import RiCheckLine from 'vue-remix-icons/icons/ri-check-line.vue'
import RiErrorWarningLine from 'vue-remix-icons/icons/ri-error-warning-line.vue'

export default defineNuxtComponent({
  components: {
    RiCheckLine,
    RiErrorWarningLine,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isWarning: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      if (!this.isDisabled) {
        this.$emit('next')
      }
    },
  },
})
</script>
