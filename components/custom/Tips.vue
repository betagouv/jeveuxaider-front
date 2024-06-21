<template>
  <div
    :class="[
      'border p-4 lg:p-6 rounded max-w-[600px] mx-auto',
      {
        'border-[#B9CEFF] bg-[#F5F7FF]': variant === 'infos',
        'border-yellow-200 bg-yellow-50': variant === 'warning',
      },
    ]"
  >
    <div class="flex flex-col lg:flex-row lg:items-center gap-4">
      <div class="px-2">
        <RiLightbulbLine
          v-if="variant === 'infos'"
          class="h-8 w-8 text-[#5698FF] fill-current"
          aria-hidden="true"
        />
        <RiErrorWarningLine
          v-if="variant === 'warning'"
          class="h-8 w-8 text-yellow-500 fill-current"
          aria-hidden="true"
        />
      </div>

      <div class="pl-4">
        <div v-if="$slots.title" class="text-[#161616] text-sm font-bold mb-[2px]">
          <slot name="title"></slot>
        </div>
        <div class="text-[#161616] text-sm"><slot></slot></div>
      </div>
    </div>
  </div>
</template>

<script>
import RiLightbulbLine from 'vue-remix-icons/icons/ri-lightbulb-line.vue'
import RiErrorWarningLine from 'vue-remix-icons/icons/ri-error-warning-line.vue'

export default defineNuxtComponent({
  components: {
    RiLightbulbLine,
    RiErrorWarningLine,
  },
  props: {
    variant: {
      type: String,
      default: 'infos',
      validator: (s) => ['infos', 'warning'].includes(s),
    },
  },
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {},
})
</script>
