<template>
  <div
    :class="[
      'relative border-2 p-6 cursor-pointer hover:border-jva-blue-500 focus:ring-2 ring-offset-2 ring-[#0A76F6]',
      { 'border-2 border-jva-blue-500 bg-[#F5F5FE]': isSelected },
    ]"
    tabindex="0"
    :aria-label="title"
    @keydown="onKeydown"
    :aria-pressed="isSelected"
  >
    <RiCheckboxCircleFill
      v-if="isSelected"
      class="h-6 text-jva-blue-500 fill-current absolute top-3 right-3 group-hover:text-jva-blue-500"
    />
    <div :class="['font-bold mb-2', isSelected ? ' text-jva-blue-500 ' : 'text-[#161616]']">
      {{ title }}
    </div>
    <div
      v-if="subtitle"
      :class="['text-sm mb-2', isSelected ? ' text-jva-blue-500 ' : 'text-[#161616]']"
    >
      {{ subtitle }}
    </div>
    <div class="text-sm text-[#666666]">
      {{ description }}
    </div>
  </div>
</template>

<script>
import RiCheckboxCircleFill from 'vue-remix-icons/icons/ri-checkbox-circle-fill.vue'

export default defineNuxtComponent({
  components: {
    RiCheckboxCircleFill,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onKeydown(e) {
      const keyValue = e.which // enter key
      if (keyValue === 13 || keyValue === 32) {
        if (this.highlightIndex !== null) {
          this.$emit('click')
          return
        }
      }
    },
  },
})
</script>
