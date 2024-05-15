<template>
  <div class="border border-[#0063CB] border-t-[5px] p-4 rounded-t">
    <div class="flex space-x-4">
      <div class="pl-4">
        <RiLightbulbLine
          v-if="variant === 'infos'"
          class="h-8 w-8 text-[#0063CB] fill-current mt-[2px]"
          aria-hidden="true"
        />
      </div>

      <div class="text-[#3A3A3A] text-sm"><slot></slot></div>
    </div>
  </div>
</template>

<script>
import RiLightbulbLine from 'vue-remix-icons/icons/ri-lightbulb-line.vue'

export default defineNuxtComponent({
  components: {
    RiLightbulbLine,
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
