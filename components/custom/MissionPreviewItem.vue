<template>
  <div
    :class="[
      'relative p-6 cursor-pointer shadow border-2  hover:shadow-lg transition-shadow duration-300',
      { ' border-[#6A6AF4] bg-[#F5F5FE] ': isCurrent },
      { 'border-white bg-white': !isCurrent },
      { '': isCompleted },
    ]"
  >
    <RiCheckLine
      v-if="isCompleted"
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

export default defineNuxtComponent({
  components: {
    RiCheckLine,
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
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
