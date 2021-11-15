<template>
  <div class="componant--accordion">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="border-t"
      :class="[{ 'border-b': index === data.length - 1 }]"
    >
      <div
        class="flex items-center justify-start group cursor-pointer py-6"
        @click="item.isOpen = !item.isOpen"
      >
        <div
          class="w-12 h-12 flex items-center justify-center bg-jva-grayLight rounded-lg mr-4"
        >
          {{ item.icon }}
        </div>

        <h3 class="font-bold text-lg mr-4 group-hover:underline">
          {{ item.title }}
        </h3>

        <img
          src="/images/icons/accordeon_chevron_gris.svg"
          alt="Chevron"
          class="transform transition ml-auto"
          :class="[{ 'rotate-90': item.isOpen }]"
          data-not-lazy
          width="6"
          height="10"
        >
      </div>

      <transition name="fade">
        <div v-if="item.isOpen" class="pb-6" v-html="item.content" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      data: this.items.map(item => ({ ...item, isOpen: false }))
    }
  }
}
</script>

<style lang="postcss" scoped></style>
