<template>
  <div
    :class="[
      'relative cursor-pointer overflow-hidden transition ease-linear hover:bg-jva-blue-500',
      { 'bg-[#DDDDDD]': !isSelected },
      { 'bg-jva-blue-500': isSelected },
      { 'border-is-recommended delay-75': isRecommended && !isSelected },
    ]"
    tabindex="0"
    :aria-label="title"
    @keydown="onKeydown"
    :aria-pressed="isSelected"
  >
    <div class="relative bg-white m-0.5 h-[calc(100%_-_4px)]">
      <div
        :class="[
          'p-6 h-full transition',
          { 'bg-white': !isSelected },
          { 'bg-[#F5F5FE]': isSelected },
        ]"
      >
        <RiCheckboxCircleFill
          v-if="isSelected"
          class="h-6 text-jva-blue-500 fill-current absolute top-3 right-3 group-hover:text-jva-blue-500"
        />
        <div
          :class="[
            'font-bold mb-2 flex flex-wrap gap-x-2 gap-y-1 items-center',
            isSelected ? ' text-jva-blue-500' : 'text-[#161616]',
          ]"
        >
          {{ title }}
          <transition name="fade">
            <DsfrBadge
              v-if="isRecommended"
              size="xs"
              type="recommendation"
              :class="[
                'translate-y-px border',
                isSelected ? 'border-[#e6e4e4]' : 'border-transparent',
              ]"
              >Recommandé</DsfrBadge
            >
          </transition>
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
    title: { type: String, required: true },
    subtitle: { type: String, default: null },
    description: { type: String, required: true },
    isSelected: { type: Boolean, default: false },
    isRecommended: { type: Boolean, default: false },
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

<style lang="postcss" scoped>
.border-is-recommended {
  @apply relative;

  &::before {
    @apply block absolute inset-1/2 w-full h-full opacity-100 transition duration-75;
    content: '';
    z-index: 0;
    padding-bottom: 100%;
    transform: translate(-50%, -50%) rotate(-135deg) scale(1.5);
    background: linear-gradient(
      to right,
      #dddddd 20%,
      #dddddd 40%,
      #0063cb 50%,
      #dddddd 60%,
      #dddddd 100%
    );
    background-size: 200% auto;
    animation: shine 2s linear infinite;
  }

  &:hover::before {
    opacity: 0;
  }
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
